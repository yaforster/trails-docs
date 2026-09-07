# 8. Crosscutting Concepts

This section describes concepts that apply across multiple Trails components.
These concepts are not limited to a single building block and should be handled consistently throughout the system.

## Architectural Boundaries

Trails follows a layered/hexagonal direction in the backend.
The domain and application behavior should stay independent of framework and infrastructure details.

| Area | Concept |
| --- | --- |
| Core/domain | Contains Trails concepts such as applications, stages, UI elements, test plans, actions, executions, and result models. |
| Application layer | Defines use cases and service contracts used by adapters. |
| Adapters | Integrate REST, persistence, Selenium/WebDriver, security, file handling, and other external technologies. |
| External systems | MySQL, Selenium Grid, browser nodes, Keycloak, Docker, and applications under test. |

Dependencies should point inward.
Adapters may depend on application and domain code, but domain code should not depend on adapter implementations.

## External Dependency Encapsulation

Important external APIs should be wrapped behind Trails-owned abstractions.
This prevents dependency-specific concepts from spreading through the codebase.

Examples:

- Selenium/WebDriver details should stay in browser automation adapters.
- Database entities and repositories should stay in persistence adapters.
- OAuth2/JWT details should stay in security adapters.
- Filesystem or object-storage details for generated artifacts should stay behind artifact-related services.

Base technologies and small utility libraries may be used directly when wrapping them would add no architectural value.
Examples include broadly accepted utility libraries such as Apache Commons.

## API Contract

The backend API is defined through OpenAPI.
Generated interfaces and DTOs help align implementation and contract.

The API is the stable integration surface for:

- Trails Frontend
- automation clients
- CI/CD integrations
- future tooling around Trails

API changes should start from the contract and should be treated as compatibility-relevant.
When an API change affects consumers or long-term direction, it should be documented in an ADR.

## Configuration

Environment-specific values must be externalized.
Code should not hard-code local paths, ports, credentials, browser settings, database locations, or service URLs.

Configuration should be supplied through:

- environment variables
- `.env` files for local Docker Compose usage
- Spring Boot configuration
- container port mappings
- mounted volumes where persistent or generated files are needed

Container networking must be considered explicitly.
For example, `localhost` can mean different things to the host, backend container, Selenium browser node, and application under test.

## Browser Automation

Browser automation is treated as external, failure-prone I/O.
Selenium Grid and the browser nodes are outside the Trails core and may be unavailable, overloaded, misconfigured, or affected by target-page behavior.

Important rules:

- The backend should not assume a local browser.
- Browser sessions are remote resources.
- Session creation may be retried where this is safe.
- Browser actions should not be blindly retried because clicks, submissions, uploads, and downloads may have side effects.
- Browser-specific failures should be represented in Trails result models rather than hidden in logs only.
- Execution diagnostics should be preserved when useful.

Browser automation code should remain isolated so that Selenium concepts do not become part of the domain model.

## Generated Artifacts

Screenshots, downloads, document renderings, and diagnostic files are part of Trails execution behavior.
They should be treated as managed artifacts, not incidental files.

Artifact handling must answer:

- which execution, workflow, or action produced the artifact
- where the artifact is stored
- how it can be retrieved
- how long it should be retained
- whether it may contain sensitive information
- how failures during artifact creation or retrieval are reported

Artifacts may be stored differently from ordinary relational data, but their relationship to test results must remain explicit.

## Persistence and Schema Evolution

Trails uses relational persistence for structured data.
Schema changes are managed through migrations.

Persistence concepts should follow these rules:

- database entities are adapter details
- domain objects should not depend on database-specific types
- schema changes should be versioned and reviewed with the feature that requires them
- migration files should be deterministic and repeatable
- generated artifacts should not be forced into relational tables unless there is a clear reason

## Error Handling

Errors should be explicit and diagnosable.
This is especially important for browser automation, downloads, document checks, and external integrations.

Error handling should distinguish between:

- validation errors caused by invalid user input
- missing or inconsistent Trails data
- unavailable external systems
- failed browser sessions
- failed browser actions
- artifact storage or retrieval failures
- unexpected internal errors

The UI should show meaningful failed states for user-triggered workflows.
Logs should contain enough context to identify the affected execution, workflow, action, browser, and external dependency where applicable.

## Observability

Trails should make important workflows inspectable.
This is a core quality concern because many failures happen in external systems or remote browsers.

Useful context includes:

- execution identifiers
- application and stage identifiers
- action identifiers or action descriptions
- selected browser
- Selenium Grid endpoint
- artifact identifiers
- user or token context when security is enabled

Logs should avoid sensitive values such as credentials, bearer tokens, and sensitive page contents.

## Security

Trails supports optional OAuth2/JWT-based security.
When security is disabled, local and internal development remains simple.
When security is enabled, the backend validates bearer tokens and maps configured roles to Trails permissions.

Security-related concepts should remain outside the core domain where possible.
The domain should express permissions and ownership only where they are genuine business concepts.
Token parsing, claim extraction, identity-provider URLs, and role mapping are adapter or configuration concerns.

Generated artifacts may contain sensitive data.
Access, logging, retention, and exposure of these artifacts must be handled carefully if Trails is exposed beyond a trusted local environment.

## Testing

Testing should reflect the architectural boundaries.

| Test Area | Focus |
| --- | --- |
| Domain tests | Core rules, action behavior, result models, validation, and value handling without infrastructure. |
| Application tests | Use case behavior and interactions with ports. |
| Adapter tests | REST mapping, persistence mapping, Selenium behavior, security integration, and artifact handling. |
| Architecture tests | Dependency direction and package/layer boundaries. |
| Frontend tests | User interaction, rendering, API integration boundaries, and state handling. |
| Extension tests | Locator discovery behavior and browser-extension-specific logic. |

Tests should avoid requiring a real browser unless the behavior under test genuinely depends on browser execution.
Browser-dependent tests should be explicit because they are slower and more environment-sensitive.

## Documentation and Decision Records

Architecture documentation is part of the system.
ARC42 chapters describe stable architecture views.
ADRs document important decisions and their consequences.

Documentation should be updated when:

- a new architectural dependency is introduced
- an external system becomes part of the runtime model
- deployment assumptions change
- persistence, security, browser execution, or artifact handling changes
- a decision is likely to be questioned later

The decision overview in [9. Architecture Decisions](../09-architecture-decisions/) should remain the entry point for technology and architecture decisions.
