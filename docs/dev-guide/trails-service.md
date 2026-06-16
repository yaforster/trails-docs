# Trails Service Development

The primary source of truth for backend development is `trails-service/README.md`.
Read that file before changing backend code.

This page summarizes the setup and adds cross-project notes for local development.

## Role

`trails-service` is the Spring Boot backend.
It owns:

- REST/HATEOAS API implementation
- OpenAPI-generated backend interfaces and DTOs
- domain behavior and use case services
- MySQL persistence
- Liquibase schema migrations
- optional OAuth2/JWT security
- Selenium Grid orchestration
- persisted test results and artifacts

## Local Setup

Use `trails-service/trails-service.env.template` as the source of truth for required runtime settings.
Copy it to:

```powershell
trails-service/trails-service.env
```

Then fill in local values.

The service compose file starts:

- MySQL
- Keycloak
- Trails Service
- Selenium Hub
- Chrome, Firefox, and Edge browser nodes

From `trails-service`:

```powershell
docker compose up -d
```

The compose setup expects a packaged service JAR when running the service container.
For IDE development, mirror the same environment variables in the IDE run configuration.

## Important URLs

| Setting | Meaning |
| --- | --- |
| `SPRING_DATASOURCE_*` | Database connection used by the backend. |
| `SERVICE_WEBDRIVERS_GENERAL_GRIDURL` | URL used by Trails Service to reach Selenium Grid. In Docker this is usually `http://selenium-hub:4444`. |
| `SERVICE_WEBDRIVERS_GENERAL_BROWSERBASEURL` | URL used by browser nodes when they open Trails-served or host-local pages. |
| `SPRING_SECURITY_OAUTH2_RESOURCESERVER_JWT_ISSUER_URI` | Token issuer URL. |
| `SPRING_SECURITY_OAUTH2_RESOURCESERVER_JWT_JWK_SET_URI` | JWK endpoint used by the service. In Docker this may use a container hostname such as `keycloak`. |

The browser, backend container, and Selenium browser nodes have different network perspectives.
Do not assume that `localhost` means the same thing in all three places.

## Generated Contracts

The REST API contract lives in:

```text
trails-service/src/main/resources/api/hateoas.yaml
```

The AsyncAPI contract lives with the API resources as well.
Controllers implement generated interfaces and use generated DTOs.
API shape changes should start in the contract files.

When the API changes, check whether `trails-frontend/api` must be updated as well.

## Database Changes

Database schema changes are Liquibase migrations under:

```text
trails-service/src/main/resources/db/changelog
```

Add migrations with the feature that requires them.
Do not rely on manual database changes.

## Architecture Rules

The backend is guarded by `LayeredArchitectureTest`.
The intended dependency direction is:

```text
adapter -> app -> core
adapter -> core
```

Important rules:

- core must not depend on adapters
- generated API DTOs must stay inside the API adapter boundary
- database entities and repositories must stay inside the database adapter
- non-API adapters must not depend on the API adapter
- Selenium/WebDriver details should stay behind Trails-owned abstractions

## Adding Browser Actions

Follow the checklist in `trails-service/README.md`.
A new action usually touches:

- core action model
- OpenAPI DTO/discriminator
- REST mapper variant
- persistence entity and mapper variant
- Liquibase migration if schema changes
- promotion copy behavior
- validation
- focused tests

Do not add central switch branches where the variant mapper pattern already exists.

## Tests and Verification

Useful commands from `trails-service`:

```powershell
.\mvnw test
.\mvnw verify
```

Use focused test runs while developing, but include architecture and mapper tests for changes that touch actions, persistence, or generated API contracts.

## Common Pitfalls

- Forgetting to update `trails-service.env.template` when adding a runtime setting.
- Using host-local URLs where Selenium browser nodes need container-reachable URLs.
- Editing generated DTOs instead of the OpenAPI/AsyncAPI source.
- Adding database fields without Liquibase migrations.
- Retrying browser actions that may have side effects.
- Letting API DTOs or database entities leak into the domain model.
