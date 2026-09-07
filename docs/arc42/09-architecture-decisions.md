# 9. Architecture Decisions

This chapter summarizes important architecture decisions for Trails.
Detailed reasoning, alternatives, consequences, and later revisions should be documented in ADRs.

The purpose of this chapter is not to duplicate every ADR.
It provides a readable overview of the current decision landscape and links to the detailed records.

## How Decisions Are Documented

Trails uses two levels of decision documentation:

- This chapter lists the important decisions and gives a short orientation.
- ADRs document individual decisions in detail, including context, alternatives, consequences, and status.

Use an ADR when a decision:

- affects the long-term architecture
- introduces or replaces an important technology
- creates coupling to an external system or framework
- affects deployment, persistence, security, or browser execution
- is likely to be questioned later

Small implementation choices do not need their own ADR unless they become architectural constraints.

## Decision Overview

| Decision | Current Choice | Status | Detailed ADR |
| --- | --- | --- | --- |
| Core technology principle | Established implementation technologies for backend, frontend, and browser automation | Accepted | [ADR 0001](../../adr/0001-use-established-core-implementation-technologies/) |
| Backend framework | Spring Boot | Accepted | [ADR 0009](../../adr/0009-use-spring-boot-for-backend-service/) |
| Frontend framework | Angular | Accepted | [ADR 0010](../../adr/0010-use-angular-for-frontend/) |
| Browser automation | Selenium Grid with remote browser nodes | Accepted | [ADR 0011](../../adr/0011-use-selenium-grid-for-browser-automation/) |
| Backend API contract | OpenAPI-driven REST/HATEOAS API | Accepted | [ADR 0003](../../adr/0003-use-openapi-as-api-contract/) |
| Persistence database | MySQL | Accepted | [ADR 0004](../../adr/0004-use-mysql-and-liquibase/) |
| Database migration tool | Liquibase | Accepted | [ADR 0004](../../adr/0004-use-mysql-and-liquibase/) |
| Browser locator assistant | Trails Scout browser extension | Accepted | [ADR 0008](../../adr/0008-build-trails-scout-as-browser-extension/) |
| Containerized local operation | Docker Compose | Accepted | [ADR 0005](../../adr/0005-use-docker-compose-for-local-orchestration/) |
| Optional identity provider for local security scenarios | Keycloak | Accepted | [ADR 0006](../../adr/0006-use-keycloak-for-local-oauth2-scenarios/) |
| Generated artifacts | Store screenshots, downloads, and diagnostics as traceable execution artifacts | Accepted | [ADR 0002](../../adr/0002-store-screenshots-and-downloads/) |
| Architecture documentation | VitePress with ARC42 and ADRs | Accepted | [ADR 0012](../../adr/0012-use-vitepress-for-documentation/) |

## Technology Decisions

The following technologies are currently part of the Trails architecture.
They are listed here so that the technology landscape is visible in one place.
The detailed justification for significant choices belongs in ADRs.

| Area | Technology | Reason |
| --- | --- | --- |
| Backend implementation | Java and Spring Boot | Established ecosystem, strong web/API support, good integration with persistence and security libraries. |
| Backend build | Maven | Mature Java build tool with broad IDE and CI support. |
| API contract | OpenAPI | Keeps the REST API explicit and supports generated interfaces and DTOs. |
| API style | REST/HATEOAS | Provides navigable API resources and a stable integration surface for frontend and automation clients. |
| Persistence | MySQL | Established relational database suitable for structured Trails data. |
| Schema migration | Liquibase | Versioned database migrations kept with the application code. |
| Browser automation | Selenium Grid | Established standard for remote browser automation across multiple browsers. |
| Browser nodes | Chrome, Firefox, and Edge Selenium node images | Covers the main browser families and keeps execution containerized. |
| Frontend implementation | Angular and TypeScript | Established frontend framework with strong structure for larger applications. |
| Browser extension | TypeScript, Vite, and WebExtension APIs | Suitable stack for building Trails Scout as a browser extension. |
| Local orchestration | Docker Compose | Simple container orchestration for local development and small-scale operation. |
| Optional authentication | OAuth2/JWT with Keycloak for local scenarios | Allows authenticated operation while keeping local development practical. |
| Documentation | VitePress | Provides an interactive documentation site with navigation, search, and Markdown-based content. |

## Decisions Covered By ADRs

The following accepted choices are covered by ADRs.
Where a row in the decision overview names a specific technology or architectural mechanism, the linked ADR should explain that specific decision rather than only mention it as part of a broader stack choice.

- [ADR 0001](../../adr/0001-use-established-core-implementation-technologies/): established core implementation technologies as an umbrella decision.
- [ADR 0002](../../adr/0002-store-screenshots-and-downloads/): screenshots, downloads, and diagnostics as managed execution artifacts.
- [ADR 0003](../../adr/0003-use-openapi-as-api-contract/): OpenAPI as the source of truth for the backend API contract.
- [ADR 0004](../../adr/0004-use-mysql-and-liquibase/): MySQL and Liquibase for persistence and schema evolution.
- [ADR 0005](../../adr/0005-use-docker-compose-for-local-orchestration/): Docker Compose as the local orchestration model.
- [ADR 0006](../../adr/0006-use-keycloak-for-local-oauth2-scenarios/): Keycloak as the local OAuth2/JWT provider for security scenarios.
- [ADR 0007](../../adr/0007-use-mkdocs-material-arc42-and-adrs/): historical MkDocs Material decision, superseded by ADR 0012.
- [ADR 0008](../../adr/0008-build-trails-scout-as-browser-extension/): Trails Scout as a browser extension rather than only a frontend feature.
- [ADR 0009](../../adr/0009-use-spring-boot-for-backend-service/): Spring Boot for the backend service.
- [ADR 0010](../../adr/0010-use-angular-for-frontend/): Angular for the frontend application.
- [ADR 0011](../../adr/0011-use-selenium-grid-for-browser-automation/): Selenium Grid for scalable remote browser automation.
- [ADR 0012](../../adr/0012-use-vitepress-for-documentation/): VitePress for current documentation hosting, local search, and Mermaid rendering.

## Existing ADRs

| ADR | Topic | Status |
| --- | --- | --- |
| [0001](../../adr/0001-use-established-core-implementation-technologies/) | Use established core implementation technologies. | Accepted |
| [0002](../../adr/0002-store-screenshots-and-downloads/) | Store screenshots, downloads, and execution diagnostics as managed Trails artifacts. | Accepted |
| [0003](../../adr/0003-use-openapi-as-api-contract/) | Use OpenAPI as the backend API contract. | Accepted |
| [0004](../../adr/0004-use-mysql-and-liquibase/) | Use MySQL and Liquibase for persistence. | Accepted |
| [0005](../../adr/0005-use-docker-compose-for-local-orchestration/) | Use Docker Compose for local orchestration. | Accepted |
| [0006](../../adr/0006-use-keycloak-for-local-oauth2-scenarios/) | Use Keycloak for local OAuth2/JWT scenarios. | Accepted |
| [0007](../../adr/0007-use-mkdocs-material-arc42-and-adrs/) | Use MkDocs Material, ARC42, and ADRs for documentation. | Superseded |
| [0008](../../adr/0008-build-trails-scout-as-browser-extension/) | Build Trails Scout as a browser extension. | Accepted |
| [0009](../../adr/0009-use-spring-boot-for-backend-service/) | Use Spring Boot for the backend service. | Accepted |
| [0010](../../adr/0010-use-angular-for-frontend/) | Use Angular for the frontend. | Accepted |
| [0011](../../adr/0011-use-selenium-grid-for-browser-automation/) | Use Selenium Grid for browser automation. | Accepted |
| [0012](../../adr/0012-use-vitepress-for-documentation/) | Use VitePress for documentation. | Accepted |

## Decision Guidelines

New technology choices should follow the constraints defined in [2. Constraints](../02-constraints/):

- prefer established languages, frameworks, and tools
- prefer dependencies with an active lifecycle
- wrap important external APIs behind Trails-owned abstractions
- keep components container-capable
- avoid special host-machine dependencies
- avoid infrastructure that is disproportionate to the current project stage

When a technology is used only as a low-level utility, such as Apache Commons, a dedicated ADR is usually not necessary.
When a technology shapes architecture, deployment, persistence, security, or testing strategy, it should be documented as an ADR.
