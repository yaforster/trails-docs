# 6. Runtime View

<script setup>
import runtimeAuthenticatedRequest from '../diagrams/runtime-authenticated-request.mmd?raw'
import runtimeDownloadArtifacts from '../diagrams/runtime-download-artifacts.mmd?raw'
import runtimeModelingWorkflow from '../diagrams/runtime-modeling-workflow.mmd?raw'
import runtimeScoutLocatorDiscovery from '../diagrams/runtime-scout-locator-discovery.mmd?raw'
import runtimeStartup from '../diagrams/runtime-startup.mmd?raw'
import runtimeTestExecution from '../diagrams/runtime-test-execution.mmd?raw'
import runtimeTestExecutionFailure from '../diagrams/runtime-test-execution-failure.mmd?raw'
</script>

This section describes important runtime scenarios in Trails.
It focuses on behavior that crosses building-block boundaries or explains architectural decisions.

## Runtime Scenario Overview

| Scenario | Why It Matters |
| --- | --- |
| Service startup | Shows how database, security, and Selenium infrastructure become available. |
| Authenticated API request | Explains optional OAuth2/JWT behavior and role-aware API access. |
| Modeling workflow | Shows how frontend requests become validated, mapped, persisted Trails resources. |
| Test execution | Central runtime path: asynchronous execution through Selenium Grid with SSE status events. |
| Failed test execution | Shows how runtime failures are reported and surfaced to clients. |
| Download and artifact handling | Explains how browser downloads become managed Trails results. |
| Locator discovery with Trails Scout | Shows why the browser extension exists outside the frontend. |

## Startup

The local runtime is started through Docker Compose.
MySQL has an explicit health check before Trails Service starts.
Keycloak and Selenium Hub are started before the service, but the service still needs to tolerate runtime unavailability or misconfiguration.

<MermaidDiagram :code="runtimeStartup" />

Important runtime points:

- Trails Service reads configuration from environment variables and Spring Boot configuration.
- Liquibase migrations run against MySQL during backend startup.
- OAuth2/JWT behavior depends on `SERVICE_API_SECURITY_OAUTH2_ENABLED`.
- Selenium Grid is used only when browser execution starts.
- Browser-facing URLs must work from the browser node perspective, not only from the host browser.

## Authenticated API Request

Trails can run unsecured or as an OAuth2 resource server.
When OAuth2/JWT is enabled, frontend requests include a bearer token and the backend validates the token before invoking protected operations.

<MermaidDiagram :code="runtimeAuthenticatedRequest" />

Role and permission information affects exposed capabilities and HATEOAS links.
The frontend should follow returned links and capability information instead of assuming that every operation is always available.

## Modeling Workflow

Most ordinary user workflows follow the same pattern:

1. the user creates or changes a Trails resource in the frontend
2. the frontend sends a REST request
3. the API adapter validates request data
4. DTOs are mapped to domain input
5. application/database services perform the use case
6. persistence adapters store or load data
7. the response is returned with HATEOAS links

<MermaidDiagram :code="runtimeModelingWorkflow" />

This runtime flow is intentionally adapter-heavy at the boundary.
Validation, DTO mapping, generated API models, HATEOAS links, and database entities should stay outside the core domain model.

## Test Execution

Test execution is asynchronous.
The API accepts a run request, creates an execution ID, starts execution in a task executor, and returns `202 Accepted`.
The client can subscribe to server-sent events for that execution ID.

<MermaidDiagram :code="runtimeTestExecution" />

The backend execution flow is:

1. `TestExecutionController` receives `POST /api/test`.
2. The request is validated and mapped to a `TestPlanRunDefinition`.
3. A UUID execution ID is created.
4. `TestExecutionFacadeService` starts execution through `TestService`.
5. `TestService` submits the work to a `TaskExecutor`.
6. The API returns `202 Accepted` with links for observing the execution.
7. The frontend subscribes to `GET /api/test/events/{executionId}`.
8. The backend publishes `test.started`, `test.completed`, or `test.failed` events.
9. Test data is loaded, test steps are arranged per browser, browser sessions are created through Selenium Grid, and results are persisted.

The currently used SSE event names are:

| Event | Meaning |
| --- | --- |
| `test.started` | The asynchronous test task has started. |
| `test.completed` | The test run completed and produced a persisted result. |
| `test.failed` | Execution failed before a normal persisted result was produced. |
| `test.terminal` | A terminal event replayed to a subscriber that connects after completion or failure. |

## Failed Test Execution

Failures during asynchronous execution are logged and published as failed terminal events.

<MermaidDiagram :code="runtimeTestExecutionFailure" />

This behavior is important because the original HTTP request has already returned `202 Accepted`.
After acceptance, the client must use the event stream and result links to observe what happened.

The event hub currently stores terminal events in memory by execution ID.
That makes late subscribers more robust during one service process lifetime, but it is not durable across service restarts.

## Download and Artifact Handling

Browser downloads are handled through Selenium managed downloads rather than by assuming a shared filesystem between Trails Service and browser nodes.

<MermaidDiagram :code="runtimeDownloadArtifacts" />

Important runtime rules:

- browser nodes must support Selenium managed downloads
- downloaded-file metadata can appear asynchronously
- temporary browser-specific download names are filtered or normalized
- downloaded files are collected before result persistence
- Selenium session download state is cleared after capture
- artifacts and screenshots are retrieved later through Trails API endpoints

This design keeps remote browser execution viable even when browser nodes run in containers or on other hosts.

## Locator Discovery with Trails Scout

Trails Scout runs in the user's browser and operates close to the application under test.
This is different from Selenium execution, which runs in remote browser nodes controlled by the backend.

<MermaidDiagram :code="runtimeScoutLocatorDiscovery" />

The browser extension exists because locator discovery needs access to the inspected page and user interaction context.
The long-term integration contract between Trails Scout and Trails Service should remain explicit as the extension matures.

## Runtime Characteristics

| Characteristic | Current Behavior |
| --- | --- |
| Test execution request handling | Accepted quickly through `202 Accepted`; actual execution runs asynchronously. |
| Execution observation | Server-sent events keyed by execution ID. |
| Terminal event replay | In-memory replay for late subscribers during the current service process lifetime. |
| Browser execution | Remote Selenium Grid sessions. |
| Browser action retry | Not blindly retried because actions may have side effects. |
| Session creation protection | Retry, circuit breaker, and browser-specific bulkheads. |
| Download handling | Selenium managed downloads. |
| Result persistence | Test run results are persisted after execution. |
| Security mode | Optional OAuth2/JWT validation. |

## Runtime Risks

| Risk | Runtime Consequence | Current Response |
| --- | --- | --- |
| Browser node unavailable | Execution path for that browser may fail or be skipped as unavailable. | Session creation protection and unavailable-browser result model. |
| Client subscribes to events late | Client may miss non-terminal events. | Terminal event replay for completed or failed executions. |
| Service restarts during execution | In-memory execution/event state can be lost. | Accepted as part of the current local-first architecture. |
| Target application unreachable from browser node | Test fails even if the URL works in the host browser. | Browser-facing base URL configuration. |
| Downloads appear slowly or with temporary names | Download actions may miss or misidentify files. | Managed download polling and filename policy. |
| OAuth2 mode differs from unsecured local mode | Runtime behavior may differ between local and secured use. | Capabilities, role-aware links, and security-enabled testing where needed. |
