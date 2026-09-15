# 5. Building Block View

<script setup>
import buildingBlockLevel1 from '../diagrams/building-block-level-1.mmd?raw'
import trailsFrontendBuildingBlocks from '../diagrams/trails-frontend-building-blocks.mmd?raw'
import trailsScoutBuildingBlocks from '../diagrams/trails-scout-building-blocks.mmd?raw'
import trailsServiceBuildingBlocks from '../diagrams/trails-service-building-blocks.mmd?raw'
</script>

This section describes the static structure of Trails.
It starts with the whole system and then opens the most important internal building blocks.

The most detailed view is currently the backend service, because it contains the central domain model, use cases, persistence integration, browser automation, API exposure, and security integration.

## Level 1: Trails System

At the highest level, Trails consists of the backend service, frontend, browser extension, documentation site, and supporting infrastructure.

<MermaidDiagram :code="buildingBlockLevel1" />

| Building Block | Responsibility |
| --- | --- |
| Trails Service | Central backend for Trails data, use cases, REST/HATEOAS API, persistence, browser automation orchestration, security integration, and execution results. |
| Trails Frontend | Angular web application for human interaction with Trails. |
| Trails Scout | Browser extension for identifying locators and page elements in the application under test. |
| Trails Docs | VitePress documentation site containing ARC42 documentation and ADRs. |
| MySQL | Relational persistence for structured Trails data. |
| Selenium Grid and browser nodes | Remote browser execution infrastructure. |
| Keycloak | Optional local OAuth2/JWT identity provider for secured scenarios. |
| Application Under Test | External web application operated by Selenium-controlled browsers and inspected by Trails Scout. |

## Level 2: Trails Service

Trails Service follows a layered architecture with a hexagonal direction.
The architecture tests enforce important dependency rules:

- bootstrap code is not accessed by other layers
- core code may be accessed by application and adapter code
- application code may be accessed by adapter code
- adapter code is not accessed by other layers
- generated API DTOs must not leak outside the API adapter
- database adapter internals must not leak to other packages
- non-API adapters must not depend on the API adapter

<MermaidDiagram :code="trailsServiceBuildingBlocks" />

| Building Block | Package Area | Responsibility |
| --- | --- | --- |
| Bootstrap | `io.github.yaforster.trails` | Starts the Spring Boot application and wires the runtime. |
| Core | `core` | Contains domain concepts, test execution model, action types, result models, validation concepts, deletion concepts, user concepts, and shared value classes. |
| Application | `app.services` | Defines use case services and service contracts used by adapters. |
| API Adapter | `adapter.api` | Exposes REST/HATEOAS and AsyncAPI-related interfaces, handles security integration, request validation, API DTO mapping, and link generation. |
| Database Adapter | `adapter.db` | Implements feature-owned persistence for applications, stages, test data, test plans, users, artifacts, elements, and results. |
| Browser/Test Adapters | `adapter.test`, `adapter.runtime`, `adapter.testdata` | Isolates execution coordination, Selenium/WebDriver access, runtime time access, and test-data integration. |
| Capability Adapter | `adapter.capability` | Reports runtime capabilities and restrictions to clients. |
| Print Adapter | `adapter.print` | Handles print/PDF-related adapter concerns. |

### Core Domain Areas

| Area | Responsibility |
| --- | --- |
| `core.definition` | Definitions such as applications, stages, elements, locators, and related modeling concepts. |
| `core.test` | Test plans, test paths, test sets, execution concepts, actions, and results. |
| `core.test.action` | Browser action model, grouped by feature areas such as browser, document, download, element, value, and viewport behavior. |
| `core.test.result` | Success and failure result models produced by execution. |
| `core.data` | Reusable test data concepts. |
| `core.persisted` | Concepts related to persisted resources and identity. |
| `core.deletion` | Retire, restore, or deletion-related domain concepts. |
| `core.user` | User/profile-related domain concepts. |
| `core.print` | Domain-facing print concepts. |

### Adapter Areas

| Area | Responsibility |
| --- | --- |
| `adapter.api.rest` | REST controllers, generated DTO mapping, validation, HATEOAS links, and resource-specific API adapters. |
| `adapter.api.asyncapi` | AsyncAPI/event-related API model and execution event concerns. |
| `adapter.api.security` | OAuth2/JWT, role extraction, and security adapter behavior. |
| `adapter.db.<feature>` | Feature-owned persistence packages, including entities, repositories, and mappings for the resource they persist. |
| `adapter.test.execution` | Test execution coordination and execution-facing adapter behavior. |
| `adapter.test.webdriver` | Selenium/WebDriver integration, managed downloads, and driver abstractions. |
| `adapter.runtime.time` | Runtime clock access at the infrastructure boundary. |
| `adapter.testdata` | Test-data integration at the infrastructure boundary. |
| `adapter.capability` | Runtime capability and restriction reporting for clients. |

## Level 2: Trails Frontend

Trails Frontend is an Angular application organized around application shell, shared services, generated API clients, and feature areas.

<MermaidDiagram :code="trailsFrontendBuildingBlocks" />

| Building Block | Package Area | Responsibility |
| --- | --- | --- |
| Application Shell | `app`, `layout` | Top-level routing and Taiga UI-based page shell. |
| Auth | `auth` | Login flow, route guards, token handling, and current user profile access. |
| Workspace Context | `context` | Tracks selected application/stage context used by multiple workflows. |
| Core Services | `core` | API configuration, capabilities, HATEOAS link helpers, and shared frontend services. |
| Generated API Clients | `generated` | Generated OpenAPI/AsyncAPI client code and types. |
| Data Management | `features/data-management` | CRUD and administration workflows for Trails resources. |
| Test Plan Modeller | `features/test-plan-modeller` | Interactive graph modelling, local structural feedback, import/export, grouping, and persistence requests for test plans. |
| Test Results | `features/test-results` | Display and inspection of saved test execution results and artifacts. |
| Metrics | `features/metrics` | Test run metrics, summaries, timelines, and calendar-related views. |
| Test Execution Events | `test-execution` | Frontend handling for execution event streams and execution status. |

Frontend business rules should remain aligned with the backend API and domain behavior.
The frontend may handle interaction state, client-side presentation, and user feedback, but the backend remains the source of truth for persisted Trails data and must validate submitted definitions independently.

## Level 2: Trails Scout

Trails Scout is a browser extension for identifying locators and page elements in the application under test.
It is separate from the Angular frontend because locator discovery needs direct access to the inspected page context.

<MermaidDiagram :code="trailsScoutBuildingBlocks" />

| Building Block | Package Area | Responsibility |
| --- | --- | --- |
| Popup UI | `src/popup` | User-facing extension popup, settings, tabs, auth/token panel, and element/resource controls. |
| Content Script | `src/content` and `content-inspector.ts` | Runs in the browser page context boundary and coordinates inspection behavior. |
| Injected Inspector | `injected-inspector.ts` | Performs page-level inspection behavior for element selection. |
| Locator Logic | `locator-selectors.ts`, `popup/locator.ts` | Creates or formats locator candidates for selected elements. |
| Background Script | `src/background` | Browser extension runtime coordination. |
| Trails API Integration | `popup/api.ts` | Communication from the extension popup toward Trails API capabilities where needed. |

## Level 2: Documentation Site

Trails Docs is a separate VitePress site.
It contains the ARC42 architecture documentation, ADRs, and diagram sources.

| Building Block | Responsibility |
| --- | --- |
| `docs/arc42` | Stable architecture documentation structured by ARC42 chapters. |
| `docs/adr` | Architecture decision records for point-in-time decisions. |
| `docs/diagrams` | Mermaid source files for diagrams referenced from documentation pages. |
| `docs/.vitepress/config.ts` | Site configuration, navigation, theme, and route rewrites. |
| `docker-compose.yaml` | Local containerized documentation server. |

## Dependency Rules

The most important building-block rules are:

- Domain and application behavior must not depend on REST, database, Selenium, or security adapter implementation details.
- Generated API DTOs belong to API adapters and must not become domain types.
- Database entities, repositories, and database mappers belong to the database adapter.
- Non-API adapters should not depend on API adapters.
- Selenium/WebDriver details should stay inside browser/test adapters.
- Frontend code should use generated API contracts and HATEOAS links instead of hard-coded backend URL assumptions.
- Documentation diagrams should live in `docs/diagrams` and be imported from Markdown pages.

## Open Points

The following building-block details should be refined as Trails evolves:

- the final abstraction and storage model for generated artifacts
- the long-term integration contract between Trails Scout and Trails Service
- the exact boundary between frontend interaction state and backend-owned workflow state
- whether execution events become a larger asynchronous subsystem
- whether documentation PDF export becomes a separate build component
