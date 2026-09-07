# 12. Glossary

This glossary defines important terms used in the Trails architecture documentation.
The definitions focus on how the terms are used inside Trails.

| Term | Meaning |
| --- | --- |
| Action | A single executable step in a Trails test plan, such as opening a page, interacting with an element, checking a value, waiting, scrolling, or validating a downloaded document. |
| Action Result | The result produced by executing one action. It may indicate success, failure, diagnostic information, screenshots, or artifact references. |
| Adapter | A backend implementation area that connects Trails core/application behavior to external technologies such as REST, database persistence, Selenium, security, printing, or capabilities. |
| ADR | Architecture Decision Record. A Markdown document that captures an important architectural decision, its context, alternatives, consequences, and status. |
| Angular | The frontend framework used by Trails Frontend. |
| API Adapter | Backend adapter area that exposes REST/HATEOAS APIs, generated DTOs, validation, security integration, and link generation. |
| Application | In Trails, an application is a modeled system under test. Do not confuse this with the Trails application itself. |
| Application Layer | Backend layer containing use case services and service contracts used by adapters. |
| Application Under Test | The external web application opened by Selenium-controlled browsers or inspected by Trails Scout. |
| ARC42 | The structure used for this architecture documentation. |
| Artifact | A generated file or evidence item produced during test execution, such as a screenshot, downloaded file, rendered document, or diagnostic file. |
| Artifact Storage | The storage location or mechanism used for generated artifacts. This may differ from relational database storage. |
| AsyncAPI | API description format used for asynchronous/event-related contracts where applicable. |
| Browser Action | An action that operates a browser or web page through Selenium/WebDriver. |
| Browser Node | A Selenium Grid node that runs a real browser such as Chrome, Firefox, or Edge. |
| Browser-Facing URL | A URL that must be reachable from inside a Selenium browser node. This may differ from a URL that works in the host browser. |
| Capability | Runtime information exposed by Trails to tell clients what features, restrictions, or configuration-dependent behavior are available. |
| CI/CD Pipeline | External automation system that may report deployments or trigger test-related workflows through the Trails API. |
| Core Layer | Backend layer containing Trails domain concepts, action models, result models, validation concepts, and shared value classes. |
| Database Adapter | Backend adapter area responsible for entities, repositories, database mappers, schema migrations, and persistence behavior. |
| Deployment | In Trails, a recorded deployment of an application or stage that can be used for traceability and reporting. |
| Docker Compose | The local orchestration mechanism used to start Trails components and supporting infrastructure. |
| DTO | Data Transfer Object. In Trails, generated API DTOs belong to the API adapter and must not become domain model types. |
| Element | A modeled UI element in an application/stage, usually identified by one or more locators. |
| Execution | A concrete run of a test plan against selected browsers and runtime data. |
| Execution ID | UUID assigned when Trails accepts an asynchronous test execution request. Used to subscribe to execution events. |
| Generated API Client | Frontend code generated from API contracts, used to call the Trails backend or type API payloads. |
| Generated DTO | Backend API model generated from OpenAPI or AsyncAPI contracts. |
| HATEOAS | REST style where responses contain links that describe available next actions. Trails uses HATEOAS links so clients do not need to hard-code every URL. |
| Keycloak | Optional local identity provider used for OAuth2/JWT security scenarios. |
| Liquibase | Database migration tool used by Trails Service for versioned schema evolution. |
| Locator | A selector-like expression used to find a UI element on a web page. Trails standardizes on the term "locator" rather than "selector". |
| Managed Download | Selenium mechanism for retrieving files downloaded by a remote browser session without relying on a shared filesystem. |
| Mermaid | Text-based diagram syntax used for diagrams in the documentation. Mermaid source files live in `docs/diagrams`. |
| VitePress | Documentation site generator used for the Trails Docs website. |
| MySQL | Relational database used for structured Trails data. |
| OAuth2/JWT Mode | Optional secured backend mode where API requests require valid bearer tokens and role mapping. |
| OpenAPI | Contract format used as the source of truth for the Trails REST API. |
| Persistence Adapter | See Database Adapter. |
| Retire | Trails behavior that removes an entity from normal active use without necessarily destroying historic traceability. |
| Restore | Making a retired entity available again where supported. |
| REST API | HTTP API exposed by Trails Service for frontend, automation clients, and possible CI/CD integrations. |
| Result Indicator | Summary classification of a result, such as success, failure, or partial success. |
| Selenium Grid | Remote browser execution infrastructure used by Trails Service. |
| Server-Sent Events | HTTP event stream mechanism used by Trails to publish asynchronous test execution events to clients. |
| Spring Boot | Backend framework used by Trails Service. |
| Stage | A modeled environment or stage of an application under test. Stages help distinguish targets such as local, test, staging, or production-like environments. |
| Test Data | Reusable data modeled in Trails and used by test plans or actions. |
| Test Designer | User role or activity focused on defining applications, stages, UI elements, test plans, and browser actions. |
| Test Executor | User role or activity focused on starting test executions and inspecting results. |
| Test Execution Event | Runtime event published for an execution, such as `test.started`, `test.completed`, `test.failed`, or `test.terminal`. |
| Test Path | A path through a test plan or execution model. Test path results are part of persisted execution results. |
| Test Plan | A modeled set of browser actions and paths that can be executed by Trails. |
| Test Run | A persisted execution result of a test plan. |
| Test Set | Runtime grouping of test execution work, commonly arranged per selected browser. |
| Trails Docs | The VitePress documentation site containing ARC42 documentation, ADRs, and diagram sources. |
| Trails Frontend | Angular web application used to interact with Trails from a browser. |
| Trails Scout | Browser extension used to inspect pages and identify locator candidates. |
| Trails Service | Spring Boot backend service that owns the core Trails API, persistence integration, Selenium orchestration, execution results, and security integration. |
| Validation | Request or domain input checking that prevents invalid data from entering use cases or persistence. |
| WebDriver | Selenium API used by Trails to operate remote browsers. |
| Workspace Context | Frontend concept for the currently selected application/stage context used across workflows. |

## Terminology Notes

| Prefer | Avoid | Reason |
| --- | --- | --- |
| Locator | Selector | Trails renamed selector terminology to locator to align with browser automation vocabulary. |
| Application under test | Website, target, AUT without definition | The full term is clearer in architecture documentation. |
| Artifact | Random file, output file | Artifacts are managed execution evidence and should remain traceable. |
| Retire | Delete, when historic traceability must remain intact | Trails uses retirement/restoration where hard deletion would break historic inspection. |
| Browser node | Browser, when discussing deployment | A browser node is the container/runtime that owns the browser session. |
| Browser-facing URL | Localhost URL | The URL must work from the Selenium browser node, not merely from the host machine. |
