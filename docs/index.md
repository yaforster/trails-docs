# Trails Documentation

Trails is a system for modeling, executing, and inspecting browser-driven test workflows.
It combines a Spring Boot backend, an Angular frontend, Selenium Grid browser execution, a browser extension for locator discovery, and architecture documentation maintained as code.

This site contains the architecture documentation for Trails.
It is meant to explain what the system is, why it is shaped the way it is, where the risks are, and how future changes should preserve the important boundaries.

## Start Here

| Topic | Start With |
| --- | --- |
| New to Trails | [Introduction and Goals](arc42/01-introduction-goals/) |
| Code repositories | [Repositories](repositories/) |
| System boundary and external systems | [Context and Scope](arc42/03-context-scope/) |
| Main architecture approach | [Solution Strategy](arc42/04-solution-strategy/) |
| Static structure | [Building Block View](arc42/05-building-block-view/) |
| Runtime behavior | [Runtime View](arc42/06-runtime-view/) |
| Docker and deployment shape | [Deployment View](arc42/07-deployment-view/) |
| Repeating architecture concepts | [Crosscutting Concepts](arc42/08-crosscutting-concepts/) |
| Technology decisions | [Architecture Decisions](arc42/09-architecture-decisions/) |
| Local development setup | [Dev Guide](dev-guide/) |
| Risks and technical debt | [Risks and Technical Debt](arc42/11-risks-technical-debt/) |
| Terminology | [Glossary](arc42/12-glossary/) |

## What Trails Contains

| Component | Role |
| --- | --- |
| Trails Service | Spring Boot backend for API, domain behavior, persistence, security integration, and Selenium orchestration. |
| Trails Frontend | Angular web application for modeling, execution, results, metrics, and administration workflows. |
| Trails Scout | Browser extension for identifying locator candidates on pages under test. |
| MySQL | Relational database for structured Trails data. |
| Selenium Grid | Remote browser execution infrastructure. |
| Keycloak | Optional local OAuth2/JWT provider for secured scenarios. |
| Trails Docs | This VitePress documentation site. |

## Repositories

The Trails workspace is split into separate Codeberg repositories.
See [Repositories](repositories/) for badge-style links, versions, and repository responsibilities.

## Architecture Documentation

The architecture documentation follows the ARC42 structure:

- [1. Introduction and Goals](arc42/01-introduction-goals/)
- [2. Constraints](arc42/02-constraints/)
- [3. Context and Scope](arc42/03-context-scope/)
- [4. Solution Strategy](arc42/04-solution-strategy/)
- [5. Building Block View](arc42/05-building-block-view/)
- [6. Runtime View](arc42/06-runtime-view/)
- [7. Deployment View](arc42/07-deployment-view/)
- [8. Crosscutting Concepts](arc42/08-crosscutting-concepts/)
- [9. Architecture Decisions](arc42/09-architecture-decisions/)
- [10. Quality Requirements](arc42/10-quality-requirements/)
- [11. Risks and Technical Debt](arc42/11-risks-technical-debt/)
- [12. Glossary](arc42/12-glossary/)

## Architecture Decisions

ADRs capture point-in-time decisions and their consequences.
The decision overview is in [Architecture Decisions](arc42/09-architecture-decisions/).

Key ADRs include:

- [ADR 0009: Use Spring Boot for the Backend Service](adr/0009-use-spring-boot-for-backend-service/)
- [ADR 0010: Use Angular for the Frontend](adr/0010-use-angular-for-frontend/)
- [ADR 0011: Use Selenium Grid for Browser Automation](adr/0011-use-selenium-grid-for-browser-automation/)
- [ADR 0002: Store Screenshots, Downloads, and Diagnostics as Managed Artifacts](adr/0002-store-screenshots-and-downloads/)
- [ADR 0005: Use Docker Compose for Local Orchestration](adr/0005-use-docker-compose-for-local-orchestration/)

## Development Guides

The [Dev Guide](dev-guide/) collects local setup notes for:

- [Trails Service](dev-guide/trails-service/)
- [Trails Frontend](dev-guide/trails-frontend/)
- [Trails Scout](dev-guide/trails-scout/)
- [Trails Docs](dev-guide/trails-docs/)

## Documentation Conventions

- Architecture views live in `docs/arc42`.
- Architecture decision records live in `docs/adr`.
- Mermaid diagram source files live in `docs/diagrams`.
- Generated site output is written to `site`.

Diagrams are written as text-based Mermaid files so they can be reviewed and versioned like the rest of the documentation.
