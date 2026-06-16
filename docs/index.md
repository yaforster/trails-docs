# Trails Documentation

Trails is a system for modeling, executing, and inspecting browser-driven test workflows.
It combines a Spring Boot backend, an Angular frontend, Selenium Grid browser execution, a browser extension for locator discovery, and architecture documentation maintained as code.

This site contains the architecture documentation for Trails.
It is meant to explain what the system is, why it is shaped the way it is, where the risks are, and how future changes should preserve the important boundaries.

## Start Here

| Topic | Start With |
| --- | --- |
| New to Trails | [Introduction and Goals](arc42/01-introduction-goals.md) |
| Code repositories | [Repositories](repositories.md) |
| System boundary and external systems | [Context and Scope](arc42/03-context-scope.md) |
| Main architecture approach | [Solution Strategy](arc42/04-solution-strategy.md) |
| Static structure | [Building Block View](arc42/05-building-block-view.md) |
| Runtime behavior | [Runtime View](arc42/06-runtime-view.md) |
| Docker and deployment shape | [Deployment View](arc42/07-deployment-view.md) |
| Repeating architecture concepts | [Crosscutting Concepts](arc42/08-crosscutting-concepts.md) |
| Technology decisions | [Architecture Decisions](arc42/09-architecture-decisions.md) |
| Local development setup | [Dev Guide](dev-guide/index.md) |
| Risks and technical debt | [Risks and Technical Debt](arc42/11-risks-technical-debt.md) |
| Terminology | [Glossary](arc42/12-glossary.md) |

## What Trails Contains

| Component | Role |
| --- | --- |
| Trails Service | Spring Boot backend for API, domain behavior, persistence, security integration, and Selenium orchestration. |
| Trails Frontend | Angular web application for modeling, execution, results, metrics, and administration workflows. |
| Trails Scout | Browser extension for identifying locator candidates on pages under test. |
| MySQL | Relational database for structured Trails data. |
| Selenium Grid | Remote browser execution infrastructure. |
| Keycloak | Optional local OAuth2/JWT provider for secured scenarios. |
| Trails Docs | This MkDocs Material documentation site. |

## Repositories

The Trails workspace is split into separate Codeberg repositories.
See [Repositories](repositories.md) for badge-style links, versions, and repository responsibilities.

## Architecture Documentation

The architecture documentation follows the ARC42 structure:

- [1. Introduction and Goals](arc42/01-introduction-goals.md)
- [2. Constraints](arc42/02-constraints.md)
- [3. Context and Scope](arc42/03-context-scope.md)
- [4. Solution Strategy](arc42/04-solution-strategy.md)
- [5. Building Block View](arc42/05-building-block-view.md)
- [6. Runtime View](arc42/06-runtime-view.md)
- [7. Deployment View](arc42/07-deployment-view.md)
- [8. Crosscutting Concepts](arc42/08-crosscutting-concepts.md)
- [9. Architecture Decisions](arc42/09-architecture-decisions.md)
- [10. Quality Requirements](arc42/10-quality-requirements.md)
- [11. Risks and Technical Debt](arc42/11-risks-technical-debt.md)
- [12. Glossary](arc42/12-glossary.md)

## Architecture Decisions

ADRs capture point-in-time decisions and their consequences.
The decision overview is in [Architecture Decisions](arc42/09-architecture-decisions.md).

Key ADRs include:

- [ADR 0009: Use Spring Boot for the Backend Service](adr/0009-use-spring-boot-for-backend-service.md)
- [ADR 0010: Use Angular for the Frontend](adr/0010-use-angular-for-frontend.md)
- [ADR 0011: Use Selenium Grid for Browser Automation](adr/0011-use-selenium-grid-for-browser-automation.md)
- [ADR 0002: Store Screenshots, Downloads, and Diagnostics as Managed Artifacts](adr/0002-store-screenshots-and-downloads.md)
- [ADR 0005: Use Docker Compose for Local Orchestration](adr/0005-use-docker-compose-for-local-orchestration.md)

## Development Guides

The [Dev Guide](dev-guide/index.md) collects local setup notes for:

- [Trails Service](dev-guide/trails-service.md)
- [Trails Frontend](dev-guide/trails-frontend.md)
- [Trails Scout](dev-guide/trails-scout.md)
- [Trails Docs](dev-guide/trails-docs.md)

## Documentation Conventions

- Architecture views live in `docs/arc42`.
- Architecture decision records live in `docs/adr`.
- Mermaid diagram source files live in `docs/diagrams`.
- Generated site output is written to `site`.

Diagrams are written as text-based Mermaid files so they can be reviewed and versioned like the rest of the documentation.
