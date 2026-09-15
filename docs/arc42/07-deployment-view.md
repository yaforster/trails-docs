# 7. Deployment View

<script setup>
import backendStartupDependencies from '../diagrams/backend-startup-dependencies.mmd?raw'
import browserAutomationSequence from '../diagrams/browser-automation-sequence.mmd?raw'
import containerNetworking from '../diagrams/container-networking.mmd?raw'
import deploymentContext from '../diagrams/deployment-context.mmd?raw'
import localComposeDeployment from '../diagrams/local-compose-deployment.mmd?raw'
import persistenceVolumes from '../diagrams/persistence-volumes.mmd?raw'
</script>

This section describes Trails container deployment and its private local-development orchestration.
The public service repository publishes a source-built container image; a separate private repository owns local Docker
Compose support and secrets guidance.

The current deployment view focuses on local development and small-scale operation.
Production-grade deployment, high availability, backup automation, external monitoring, and secret management are not yet primary architectural drivers.

## Current Deployment Model

Trails is deployed as several containerized parts:

- Trails Service and its supporting backend infrastructure.
- Trails Frontend as a separately built web application container.
- Trails Docs as a VitePress documentation container.
- Trails Scout as a browser extension installed into a user's browser rather than as a server-side container.

The backend infrastructure currently includes MySQL, optional Keycloak, Selenium Grid, and browser nodes for Chrome, Firefox, and Edge.

<MermaidDiagram :code="deploymentContext" />

## Containers and Runtime Nodes

| Runtime Node | Technology | Responsibility | Persistence |
| --- | --- | --- | --- |
| `trails-service` | Spring Boot container built from `trails-service/Dockerfile` | Backend API, domain behavior, persistence integration, security integration, and Selenium orchestration. | Stateless except for configured artifact handling. |
| `trails-mysql` | `mysql:latest` | Relational database for Trails data. | Docker volume `trails-mysql-data`. |
| `trails-keycloak` | `quay.io/keycloak/keycloak:26.6.1` | Optional local OAuth2/JWT identity provider. | Docker volume `trails-keycloak-data`. |
| `trails-selenium-hub` | `selenium/hub:4.43.0` | Selenium Grid coordination. | Stateless. |
| Selenium Chrome node | `selenium/node-chrome:4.43.0` | Remote Chrome browser sessions. | Stateless; managed downloads are retrieved through Selenium. |
| Selenium Firefox node | `selenium/node-firefox:4.43.0` | Remote Firefox browser sessions. | Stateless; managed downloads are retrieved through Selenium. |
| Selenium Edge node | `selenium/node-edge:4.43.0` | Remote Edge browser sessions. | Stateless; managed downloads are retrieved through Selenium. |
| `trails-frontend` | Container built from `trails-frontend/Dockerfile` | Serves the Angular frontend as static web assets. | Stateless. |
| `trails-docs` | `node:22-alpine` with VitePress | Serves the documentation website. | Source files are mounted from the workspace. |
| Trails Scout | Browser extension | Helps identify UI element locators in the browser. | Installed in the user's browser, not deployed as a backend service. |

## Local Docker Compose Deployment

The current compose files are split by project:

| Compose File | Purpose | Typical Host Port |
| --- | --- | --- |
| `trails-dev-local/compose.yaml` (private) | Backend service, MySQL, Keycloak, Selenium Grid, and browser nodes. | `8080` for Trails Service, `3309` for MySQL, `8081` for Keycloak. |
| `trails-frontend/docker-compose.yml` | Frontend web application. | `4200` by default. |
| `trails-docs/docker-compose.yaml` | Documentation website. | `8811` for the host, mapped to container port `5173`. |

<MermaidDiagram :code="localComposeDeployment" />

## Backend Infrastructure

The private backend compose setup starts MySQL before Trails Service and waits for the MySQL health check.
Keycloak and Selenium Hub are started before Trails Service, but they are not currently guarded by deep readiness checks.

<MermaidDiagram :code="backendStartupDependencies" />

Important backend deployment properties:

- MySQL state is stored in the `trails-mysql-data` Docker volume.
- Keycloak state is stored in the `trails-keycloak-data` Docker volume.
- Trails Service receives runtime configuration through externally supplied environment variables and selected container environment variables.
- Selenium browser nodes use `shm_size: 2gb` to reduce browser instability in containers.
- Selenium managed downloads are enabled on browser nodes.
- Browser concurrency is controlled through `SELENIUM_NODE_MAX_SESSIONS`.

## Manual Deployment And Network Contract

Use this contract when infrastructure is provisioned by an enterprise platform, separate hosts, or a Kubernetes-like
environment instead of the private local Compose setup. Compose image references describe the current development
topology, not a production support or patch policy: pin, scan, and approve concrete releases. Trails has no defined
host-OS support matrix. Its container runtime is `eclipse-temurin:25-jre-noble`; a manual JVM deployment needs Java 25.
Linux amd64 is the practical baseline when Chrome, Firefox, and Edge nodes are all needed because the Selenium Edge
Linux image is amd64-only.

| Component | Required | Enterprise equivalent |
| --- | --- | --- |
| Trails Service | Yes | Image built from `trails-service/Dockerfile` or Java 25 process, normally behind TLS ingress/reverse proxy. Internal HTTP defaults to `8080`. |
| MySQL | Yes | Persistent managed MySQL or a pinned, vetted MySQL deployment with backups and a least-privilege Trails account. Liquibase owns schema changes; Hibernate validates them. |
| Selenium Grid Router/Hub | For browser execution | A reachable Grid endpoint. Local reference: `selenium/hub:4.43.0`. |
| Chrome, Firefox, Edge Grid nodes | For each required browser | Sized, pinned node pools. Local references: `selenium/node-{chrome,firefox,edge}:4.43.0`; browser containers need at least `2g` shared memory and deliberate session limits. |
| OIDC/JWT provider | Only with OAuth2 enabled | Any compatible provider with issuer/JWK endpoints and Trails role claims. Local Keycloak `26.6.1` is an example, not a requirement. Persist provider state. |

Frontend, documentation, and Scout are clients, not backend dependencies. MySQL must be available before Trails starts.
Grid and nodes must be available before browser tests are accepted. The identity provider must be available before
OAuth2/JWT validation is enabled.

### Firewall Rules

| Source | Destination | Port / protocol | Purpose |
| --- | --- | --- | --- |
| Client or ingress | Trails Service | Public TLS; normally HTTP `8080` behind proxy | API access and health endpoints. |
| Trails Service | MySQL | TCP `3306` | Data access and Liquibase. |
| Trails Service | Grid Router | TCP `4444` | Remote WebDriver sessions. |
| Selenium node | Grid Hub event bus | TCP `4442`, `4443` | Remote node registration and events. |
| Grid Hub/Distributor | Selenium node endpoint | TCP `5555` by default | Commands to the node's advertised endpoint. |
| Selenium node/browser | Application under test | TCP `80`, `443`, or stage-specific | Browser navigation. |
| Selenium node/browser | Browser base URL | Applicable HTTP(S) port | Rewritten loopback-stage navigation. |
| Trails Service | OIDC issuer/JWK endpoint | TCP `443` or provider-specific | JWT discovery and keys, when enabled. |
| User browser/frontend | OIDC issuer | Public TLS | Interactive login, when used. |

Grid event-bus and node ports may remain private for one-host deployments. They need explicit routes for cross-host Grid
nodes. Do not expose MySQL, Grid control ports, or node endpoints publicly. CORS handling is not a firewall or
authorization boundary.

### Configuration And Verification

1. Set `SPRING_DATASOURCE_URL`, `SPRING_DATASOURCE_USERNAME`, `SPRING_DATASOURCE_PASSWORD`, and optionally the driver
   class through the platform secret store.
2. Set `SERVICE_WEBDRIVERS_GENERAL_GRIDURL` to the Router address reachable from Trails.
3. Set `SERVICE_WEBDRIVERS_GENERAL_BROWSERBASEURL` when a stage uses `localhost`, `127.0.0.1`, or `::1`. Browser nodes
   resolve URLs from their own network. Trails preserves the stage path/query/fragment and replaces only scheme and
   authority, so this value must be reachable from the nodes, not merely from an operator workstation.
4. Match Trails execution limits with node capacity: `SERVICE_TEST_EXECUTION_MAXIMUM_CONCURRENT_RUNS`,
   `SERVICE_TEST_EXECUTION_RUN_QUEUE_CAPACITY`, and `SERVICE_TEST_EXECUTION_MAXIMUM_CONCURRENT_TEST_SETS` default to
   16, 64, and 16 respectively.
5. When OAuth2 is enabled, configure exactly one issuer URI or JWK-set URI, all Trails role settings, and the required
   role claim paths. An externally visible issuer URL may intentionally differ from Trails' service-side JWK URL.
6. Set `SERVER_FORWARD_HEADERS_STRATEGY=framework` when ingress supplies forwarded headers. Keep all credentials in the
   platform secret store.

Verify DNS, TLS, and every route before startup. Start Trails only after MySQL is available; then check
`/actuator/health` and `/api/capabilities` through ingress. Verify Grid `/status`, create one session per required
browser, validate JWT retrieval and roles when enabled, and execute a test through both ordinary and loopback-rewritten
stage URLs where applicable. Selenium managed downloads retrieve files through Grid, so no shared host download volume
is required. The service repository [README](https://github.com/yaforster/trails-service#manual-deployment) is the
operator-facing source for the complete setting names and checks.

## Browser Automation Deployment

Trails Service does not launch local browser executables.
It creates remote browser sessions through Selenium Grid.

<MermaidDiagram :code="browserAutomationSequence" />

This deployment choice removes host-browser dependencies, but it makes container networking explicit.
When a browser node opens a URL, the URL is resolved from inside the browser node container, not from the user's host browser and not from Trails Service.

## Networking Concepts

The most important deployment risk is confusing which runtime environment resolves a URL.

| Perspective | Example Meaning of `localhost` |
| --- | --- |
| Host browser | The Docker host machine. |
| Trails Service container | The Trails Service container itself. |
| Selenium browser node | The browser node container. |
| Keycloak issuer URL from host | The URL used by the user's browser or frontend. |
| Keycloak JWK URL from service | The URL used by Trails Service inside the Docker network. |

<MermaidDiagram :code="containerNetworking" />

For this reason, Trails distinguishes service-internal URLs from browser-facing base URLs.
Stages that point to a host-local application may need a browser-facing base URL that works from inside Selenium browser containers.

## Configuration and Secrets

Runtime configuration is supplied through environment variables and platform secret stores. The private local-runtime
repository provides an ignored environment file for developer use.

| Configuration Area | Source |
| --- | --- |
| Backend service settings | Spring Boot configuration and externally supplied environment variables. |
| Database settings | Externally supplied `SPRING_DATASOURCE_*` values. |
| Selenium Grid URL | `SERVICE_WEBDRIVERS_GENERAL_GRIDURL`. |
| Browser-facing base URL | `SERVICE_WEBDRIVERS_GENERAL_BROWSERBASEURL`. |
| OAuth2/JWT mode | `SERVICE_API_SECURITY_OAUTH2_ENABLED`. |
| Frontend settings | `trails-frontend.env`. |
| Documentation port | `trails-docs/docker-compose.yaml`. |

Secrets and credentials must not be committed to Git.
Template files should describe required variables without containing real secrets.

## Persistence and Volumes

The current persistent runtime state is held primarily in Docker volumes:

<MermaidDiagram :code="persistenceVolumes" />

Generated execution artifacts such as screenshots, downloads, and diagnostics are part of the Trails runtime model.
Their final deployment storage strategy must remain explicit.
If artifacts are stored on a filesystem, the location should be configured and mounted deliberately.

## Deployment Risks

| Risk | Consequence | Mitigation |
| --- | --- | --- |
| Confusing host and container networking | Browser nodes may fail to reach target applications even though they work in the host browser. | Configure browser-facing base URLs explicitly. |
| Browser node capacity mismatch | Test runs may overload Selenium nodes or fail unpredictably. | Keep Resilience4j bulkheads aligned with Selenium node capacity. |
| Missing or stale runtime configuration | Containers start with wrong database, security, or browser settings. | Document public variables and keep private local templates current. |
| Unmanaged generated artifacts | Disk usage grows or sensitive files are exposed. | Treat artifacts as managed execution data with explicit storage and retention. |
| Optional security mode not exercised | Local unsecured mode works while OAuth2/JWT mode regresses. | Test security-enabled deployment paths regularly. |
| Documentation deployment differs from future PDF generation | Website works, but reproducible PDF export remains unavailable. | Add a dedicated PDF export path when that requirement is implemented. |

## Current Non-Goals

The current deployment view does not yet define:

- Kubernetes deployment
- high availability
- horizontal scaling of Trails Service
- production backup and restore procedures
- centralized secret management
- external observability stack
- production identity-provider administration

These topics should be revisited before Trails is exposed beyond a trusted local or personal environment.
