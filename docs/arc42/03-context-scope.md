# 3. Context and Scope

This section describes Trails as a whole from the outside.
It defines what belongs to the system, which neighboring systems it interacts with, and where the system boundary is drawn.

## Business Context

Trails supports the modeling and execution of browser-driven test workflows.
It allows applications, stages, UI elements, test plans, browser actions, executions, and test results to be described and inspected.

The system is currently developed as a single-maintainer project.
Its primary users are people who design, run, inspect, and evolve browser-based test workflows.

| External Actor or System | Relationship to Trails |
| --- | --- |
| Test designer | Defines applications, stages, UI elements, test plans, and browser actions. |
| Test executor | Starts browser-driven test executions and inspects their results. |
| Administrator | Configures runtime behavior, security settings, and supporting services. |
| CI/CD pipeline | May report deployments or trigger test-related workflows through the backend API. |
| Application under test | The target web application opened and operated by browser automation. |
| Browser extension user | Uses Trails Scout to identify page elements and locators for later use in Trails. |

## System Responsibilities

Trails is responsible for:

- Modeling applications, stages, UI elements, test plans, browser actions, and test execution results.
- Exposing a backend API for creating, reading, updating, deleting, and executing these models.
- Providing a user interface for working with test definitions and execution results.
- Driving remote browsers through Selenium Grid.
- Persisting the modeled data and relevant execution results.
- Managing generated artifacts such as screenshots, downloaded files, document checks, and diagnostic evidence.
- Supporting optional security integration through OAuth2/JWT.
- Providing documentation for architecture, decisions, and operation.

Trails is not responsible for:

- Hosting or implementing the applications under test.
- Guaranteeing availability of third-party websites or external test targets.
- Replacing a full CI/CD platform.
- Replacing a general-purpose test framework for non-browser tests.
- Managing production-grade identity infrastructure.
- Providing high availability or horizontal scalability in the initial architecture.

## Technical Context

Trails consists of several components and supporting systems.

| Component or System | Role |
| --- | --- |
| Trails Service | Spring Boot backend service. Provides REST/HATEOAS endpoints, implements domain behavior, integrates persistence, security, and Selenium/WebDriver execution. |
| Trails Frontend | Angular application used to interact with Trails from the browser. |
| Trails Scout | Browser extension for identifying UI element locators on target web pages. |
| MySQL | Relational database used by the backend service for persisted Trails data. |
| Selenium Grid | Remote browser execution infrastructure used by Trails Service. |
| Browser nodes | Chrome, Firefox, and Edge nodes attached to Selenium Grid. |
| Keycloak | Optional local identity provider for OAuth2/JWT-based security scenarios. |
| Documentation site | VitePress site containing ARC42 architecture documentation and ADRs. |
| Application under test | External web application opened by Selenium-controlled browsers. |
| Generated artifacts storage | Storage location for screenshots, downloads, and other execution artifacts. |

## System Boundary

The Trails system boundary includes:

- Trails Service
- Trails Frontend
- Trails Scout
- database schema and migrations owned by Trails
- Trails-specific Docker Compose configuration
- Trails documentation
- Trails-owned wrappers around important external APIs and dependencies

The system boundary excludes:

- Selenium Grid implementation internals
- browser implementations
- MySQL implementation internals
- Keycloak implementation internals
- target applications under test
- Docker Desktop or the host operating system
- external CI/CD systems

## External Interfaces

| Interface | Direction | Description |
| --- | --- | --- |
| REST/HATEOAS API | Inbound | Main API exposed by Trails Service for frontend, automation clients, and possible CI/CD integrations. |
| OpenAPI contract | Inbound/Outbound | Describes the REST API shape and is used for generated backend interfaces and DTOs. |
| Browser UI | Inbound | Human interaction with Trails through the Angular frontend. |
| Browser extension APIs | Inbound/Outbound | Used by Trails Scout to inspect web pages and capture locator information. |
| JDBC/MySQL | Outbound | Used by Trails Service to persist and read Trails data. |
| Selenium WebDriver | Outbound | Used by Trails Service to create browser sessions and execute browser actions. |
| Managed browser downloads | Outbound | Used through Selenium to retrieve files downloaded during browser execution. |
| OAuth2/JWT validation | Inbound/Outbound | Optional security integration for validating bearer tokens. |
| Filesystem or mounted storage | Outbound | Used for generated artifacts where applicable. |

## Important Context Assumptions

- Trails is local-first during current development, but components should remain container-capable.
- Browser automation may run in containers where `localhost` does not mean the same host as the backend service.
- Generated artifacts are part of the observable system behavior and must remain traceable to their originating execution.
- OAuth2/JWT security is optional and can be disabled for local or internal operation.
- Selenium browser sessions are remote sessions; the backend should not assume an in-process browser.
- Documentation is part of the system and should evolve together with implementation decisions.
