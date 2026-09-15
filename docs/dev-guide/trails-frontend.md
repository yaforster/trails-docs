# Trails Frontend Development

The primary source of truth for frontend development is `trails-frontend/README.md`.
That README currently contains the standard Angular commands.
This page adds Trails-specific development context.

## Role

`trails-frontend` is the Angular application used by humans to interact with Trails.
It covers workflows such as:

- data management
- application/stage context selection
- test plan modeling
- test execution
- test result inspection
- metrics
- authentication-aware UI behavior

## Local Setup

Install dependencies from `trails-frontend`:

```powershell
npm install
```

Copy the environment template:

```powershell
Copy-Item trails-frontend.env.template trails-frontend.env
```

Start the Angular dev server:

```powershell
npm start
```

The frontend is available at:

```text
http://localhost:4200
```

## Runtime Configuration

The frontend reads configuration from `trails-frontend.env`.
Important values:

| Setting | Meaning |
| --- | --- |
| `TRAILS_API_BASE_URL` | Backend URL as seen by the user's browser. Usually `http://localhost:8080`. |
| `TRAILS_KEYCLOAK_TOKEN_URL` | Token endpoint used by the login form and refresh logic. |
| `TRAILS_FRONTEND_HOST_PORT` | Host port used by the frontend Docker Compose setup. |

The frontend is a static browser application.
Its API URLs must be reachable by the user's browser, not merely by a Docker container.

## Generated API Code

The frontend has generated API code under:

```text
src/app/generated
```

Generation is driven by:

```powershell
npm run generate:api
```

The `prebuild` script runs API generation and runtime config generation automatically:

```powershell
npm run build
```

The source API contracts are copied under:

```text
trails-frontend/api
```

When the backend OpenAPI or AsyncAPI contracts change, update the frontend contract copies and regenerate the client code.

## Test Plan Modelling

The modeller can copy a full JSON definition to the clipboard, download it, paste it, or import it from a JSON file.

The modeller provides local structural feedback for imported and edited definitions. The backend remains authoritative for graph validity, requiring unique action IDs, references to existing actions, no duplicate outgoing edges, exactly one root action, and no cycles. Groups organize actions without changing this graph contract.

Coordinate-click actions use locator-free, non-negative viewport CSS-pixel coordinates from the visible viewport's top-left. Resize-viewport actions require positive width and height values and target exact browser viewport inner dimensions. Keep these controls aligned with the generated API contract; do not infer locator behavior, viewport profiles, or retries in the UI.

## Docker Runtime

The frontend can be served as a container from `trails-frontend/docker-compose.yml`.
That mode serves built static assets on port `80` inside the container and maps it to host port `4200` by default.

For active frontend development, the Angular dev server is usually more convenient than the containerized static build.

## Tests and Formatting

Useful commands:

```powershell
npm test -- --watch=false
npm run lint
npm run format:check
npm run generate:api
npm run build
```

The project uses Vitest through Angular's test command and Prettier for formatting.

## Common Pitfalls

- Hard-coding backend URLs instead of using generated clients, HATEOAS links, or runtime configuration.
- Forgetting that browser URLs differ from Docker-internal service URLs.
- Editing generated API files manually.
- Letting large components grow instead of splitting by workflow responsibility.
- Assuming unsecured local mode behaves the same as OAuth2/JWT-enabled mode.
- Forgetting to regenerate API clients after backend contract changes.
- Treating client-side graph validation as a replacement for backend validation.
