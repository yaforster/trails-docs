# ADR 0001: Use Established Core Implementation Technologies

## Status

Accepted

## Context

Trails needs a backend service, a browser-based user interface, and browser automation capabilities.
The project is developed by a single maintainer and should use established technologies with active ecosystems.

The backend must expose an API, persist structured data, integrate with security mechanisms, and coordinate browser-driven test execution.
The frontend must support a growing user interface for modeling and inspecting test workflows.
The browser automation layer must operate real browsers and support multiple browser families.

## Decision

Trails uses an established technology stack for its main implementation areas:

- Spring Boot for the backend service.
- Angular with TypeScript for the frontend application.
- Selenium Grid for browser automation with remote browser nodes.

The detailed decisions are documented separately:

- [ADR 0009](../0009-use-spring-boot-for-backend-service/): Spring Boot for the backend service.
- [ADR 0010](../0010-use-angular-for-frontend/): Angular for the frontend.
- [ADR 0011](../0011-use-selenium-grid-for-browser-automation/): Selenium Grid for browser automation.

## Consequences

- Trails uses established and widely documented technology stacks.
- The backend can use the Spring ecosystem for REST APIs, validation, persistence, security, configuration, and testing.
- The frontend has a structured framework for a larger application rather than an ad hoc UI.
- Browser execution can run in remote browser nodes instead of depending on a browser installed on the backend host.
- Selenium-specific code must remain isolated behind Trails-owned abstractions so that coupling does not spread through the domain.

## Alternatives Considered

| Alternative | Reason Not Chosen |
| --- | --- |
| Plain Java backend without Spring Boot | Would require more infrastructure code for APIs, configuration, security, and testing. |
| Lightweight JavaScript frontend without Angular | Lower initial ceremony, but less structure for a growing application. |
| Decide each technology without an overall stack principle | Would make the project easier to fragment across unrelated styles and ecosystems. |
