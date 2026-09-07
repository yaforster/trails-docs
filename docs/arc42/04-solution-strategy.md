# 4. Solution Strategy

This section summarizes the fundamental architectural approach for Trails.
It explains the major decisions that shape the system before the following chapters describe the building blocks, runtime behavior, and deployment view in more detail.

## Architectural Approach

Trails is organized as a container-capable, local-first system made of focused components:

- a Spring Boot backend service for domain behavior, persistence, API exposure, security integration, and browser automation orchestration
- an Angular frontend for human interaction
- a browser extension for capturing UI element locator information
- supporting infrastructure such as MySQL, Selenium Grid, browser nodes, and optional Keycloak
- a separate VitePress documentation site for architecture documentation and ADRs

The architecture favors established technologies, explicit boundaries, and pragmatic operational simplicity.
This matches the current single-maintainer context while still leaving room for later growth.

## Key Strategies

| Strategy | Description | Supports |
| --- | --- | --- |
| Use established technology stacks | Trails uses mainstream frameworks such as Spring Boot, Angular, Selenium, MySQL, Docker Compose, and VitePress. | Maintainability, deployability, lower technology risk |
| Keep domain logic independent | Core domain and application behavior should remain independent of REST, database, Selenium, and security adapter details. | Maintainability, testability |
| Isolate external dependencies | Important third-party APIs should be accessed through Trails-owned services, interfaces, or adapters. | Maintainability, replaceability, controlled coupling |
| Treat browser automation as unreliable I/O | Selenium execution is handled as an external, failure-prone integration rather than as simple in-process code. | Reliability, observability |
| Make generated artifacts traceable | Screenshots, downloads, and diagnostic files are treated as part of the execution result model. | Reliability, observability, usability |
| Prefer containerized local operation | Components should be runnable through Docker or Docker Compose without hidden host dependencies. | Deployability, reproducibility |
| Document decisions close to the code | ARC42 documentation and ADRs live in the workspace and evolve with the implementation. | Maintainability, architectural continuity |

## Backend Strategy

The backend service is the central authority for Trails data and behavior.
It exposes the Trails API, executes use cases, persists state, and coordinates browser execution.

The backend follows a layered/hexagonal direction:

- domain model and core execution concepts are kept independent
- application services define use cases and ports
- adapters implement REST, database, Selenium/WebDriver, security, and other infrastructure concerns
- dependencies should flow inward, from adapters toward application and core behavior

This strategy keeps framework and infrastructure code from spreading through the domain model.
It also makes core behavior easier to test without starting a browser, database, or web server.

## Frontend Strategy

The frontend is responsible for making Trails usable from a browser.
It should provide workflows for modeling applications, stages, UI elements, test plans, executions, and result inspection.

The frontend communicates with the backend through the published API contract.
It should not duplicate backend rules as independent business logic where the backend is the source of truth.
Frontend-specific behavior should focus on interaction, validation feedback, navigation, and presentation.

## Browser Automation Strategy

Browser automation is executed through Selenium Grid and remote browser nodes.
The backend does not assume a local, in-process browser.

This has several architectural consequences:

- browser sessions are external resources and may be unavailable
- browser actions can fail for environmental reasons outside Trails' control
- retries must be used carefully because many browser actions are not safely repeatable
- downloaded files should be retrieved through controlled mechanisms such as Selenium managed downloads
- failures should leave useful diagnostic information

Browser automation code should remain isolated behind Trails-owned abstractions so that Selenium-specific details do not spread through the application.

## Persistence Strategy

Trails persists its core data in a relational database.
Database schema evolution is handled through migrations.

Persistence details are adapter concerns.
The domain model should not depend directly on database entities, migration tooling, or SQL-specific behavior.

Generated artifacts such as screenshots and downloads are treated separately from ordinary relational data.
Their storage location, naming, lifecycle, and relation to test executions must remain explicit.

## API Strategy

The backend API is described through an OpenAPI contract.
Generated interfaces and DTOs help keep implementation and contract aligned.

The API should remain the stable integration surface for:

- the Angular frontend
- automation clients
- possible CI/CD integrations
- future tools around Trails

API changes should therefore be intentional and documented when they affect external consumers.

## Security Strategy

Trails supports an optional OAuth2/JWT security mode.
For local and internal development, security can be disabled to reduce operational overhead.
When enabled, the backend validates bearer tokens and maps configured roles to Trails permissions.

This keeps the initial system practical for development while preserving a path toward authenticated operation.
Identity provider internals, such as Keycloak configuration details, remain outside the core Trails domain.

## Documentation Strategy

Architecture documentation is maintained in a separate VitePress site.
ARC42 chapters describe the stable architecture view, while ADRs capture individual decisions and their context.

The documentation is not a separate afterthought.
It is part of the architecture work and should be updated when important design decisions change.

## Initial Tradeoffs

| Tradeoff | Rationale |
| --- | --- |
| Prefer clear boundaries over minimal code | Trails is a long-running single-maintainer project, so understandable structure is more important than the smallest possible implementation. |
| Prefer Docker Compose over heavier orchestration | The current deployment target is local or small-scale operation, not Kubernetes-level infrastructure. |
| Prefer explicit adapters over direct dependency use | Wrapping important dependencies reduces long-term coupling and makes replacement or testing easier. |
| Defer high availability and horizontal scaling | These are not current quality drivers and would add unnecessary complexity at this stage. |
| Avoid blind retries for browser actions | Browser actions may have side effects, so retries are limited to operations where repetition is safe. |
