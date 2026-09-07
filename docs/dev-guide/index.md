# Dev Guide

This guide collects local development notes for the Trails workspace.
The project-local `README.md` files remain the source of truth for project-specific commands and constraints.
These pages add the cross-project context that is useful before starting development.

## Projects

| Project | Purpose | Guide |
| --- | --- | --- |
| `trails-service` | Spring Boot backend, API, persistence, security, Selenium orchestration. | [Trails Service](trails-service/) |
| `trails-frontend` | Angular frontend for modeling, execution, results, metrics, and administration workflows. | [Trails Frontend](trails-frontend/) |
| `trails-scout` | Browser extension for locator discovery on applications under test. | [Trails Scout](trails-scout/) |
| `trails-docs` | VitePress documentation site containing ARC42 chapters, ADRs, and diagrams. | [Trails Docs](trails-docs/) |

## Workspace Assumptions

- Each code project has its own repository and README.
- Runtime settings are intentionally externalized into environment files.
- Docker Compose is the preferred way to run supporting infrastructure.
- URLs differ depending on who uses them: the host browser, a backend container, and a Selenium browser node do not share the same `localhost`.
- Generated files should be recreated from their source contracts rather than edited manually.

## Common Local Ports

| Service | Default Host Port |
| --- | --- |
| Trails Service | `8080` |
| Trails Frontend | `4200` |
| Trails Docs | `8811` |
| Keycloak | `8081` |
| MySQL | `3309` |

These are defaults from the current compose files and environment templates.
They can be changed through the corresponding environment variables or compose files.

## Before Starting Work

1. Read the local `README.md` of the project you are changing.
2. Check whether the change affects generated API contracts, database migrations, Docker configuration, or documentation.
3. Keep runtime configuration in env files or templates, not in code.
4. Update ADRs or ARC42 chapters when a change affects architecture, deployment, persistence, security, browser execution, or generated artifacts.
5. Run the focused tests for the project you touched before committing.
