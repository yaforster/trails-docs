# Repositories

The Trails workspace is split into separate Codeberg repositories.
Each project keeps its own project-local `README.md`; those README files remain the source of truth for project-specific setup and commands.

<div class="repository-grid" markdown>

<section class="repository-card" markdown>
## Trails Service

<div class="repository-badges" markdown>
![Codeberg](https://img.shields.io/badge/Codeberg-yaforster%2Ftrails--service-2185d0?logo=codeberg&logoColor=white)
![Version](https://img.shields.io/badge/version-0.0.5-teal)
</div>

<div class="repository-stack">
  <span class="repository-stack-item"><img src="/assets/stack/Java.png" alt="" aria-hidden="true"><span>Java 25</span></span>
  <span class="repository-stack-item"><img src="/assets/stack/Spring.png" alt="" aria-hidden="true"><span>Spring Boot 4</span></span>
  <span class="repository-stack-item"><img src="/assets/stack/openapi.png" alt="" aria-hidden="true"><span>OpenAPI</span></span>
  <span class="repository-stack-item"><img src="/assets/stack/asyncapi.png" alt="" aria-hidden="true"><span>AsyncAPI</span></span>
  <span class="repository-stack-item"><img src="/assets/stack/MySQL.png" alt="" aria-hidden="true"><span>MySQL 9</span></span>
  <span class="repository-stack-item"><img src="/assets/stack/Selenium.png" alt="" aria-hidden="true"><span>Selenium Grid</span></span>
  <span class="repository-stack-item"><img src="/assets/stack/Docker.png" alt="" aria-hidden="true"><span>Docker</span></span>
  <span class="repository-stack-item"><img src="/assets/stack/Keycloak.png" alt="" aria-hidden="true"><span>Keycloak</span></span>
</div>

Spring Boot backend for API, persistence, security integration, Selenium orchestration, and persisted test results.

[Open repository](https://codeberg.org/yaforster/trails-service){ .repository-link }
</section>

<section class="repository-card" markdown>
## Trails Frontend

<div class="repository-badges" markdown>
![Codeberg](https://img.shields.io/badge/Codeberg-yaforster%2Ftrails--frontend-2185d0?logo=codeberg&logoColor=white)
![Version](https://img.shields.io/badge/version-0.0.0-teal)
</div>

<div class="repository-stack">
  <span class="repository-stack-item"><img src="/assets/stack/Angular.png" alt="" aria-hidden="true"><span>Angular 21</span></span>
  <span class="repository-stack-item"><img src="/assets/stack/primeng.png" alt="" aria-hidden="true"><span>PrimeNG</span></span>
  <span class="repository-stack-item"><img src="/assets/stack/Docker.png" alt="" aria-hidden="true"><span>Docker</span></span>
</div>

Angular frontend for modeling, execution, result inspection, metrics, and administration workflows.

[Open repository](https://codeberg.org/yaforster/trails-frontend){ .repository-link }
</section>

<section class="repository-card" markdown>
## Trails Scout

<div class="repository-badges" markdown>
![Codeberg](https://img.shields.io/badge/Codeberg-yaforster%2Ftrails--scout-2185d0?logo=codeberg&logoColor=white)
![Version](https://img.shields.io/badge/version-1.0.0-teal)
</div>

<div class="repository-stack">
  <span class="repository-stack-item"><img src="/assets/stack/chrome.png" alt="" aria-hidden="true"><span>Chrome</span></span>
  <span class="repository-stack-item"><img src="/assets/stack/edge.png" alt="" aria-hidden="true"><span>Edge</span></span>
  <span class="repository-stack-item"><img src="/assets/stack/firefox.png" alt="" aria-hidden="true"><span>Firefox</span></span>
</div>

Browser extension for inspecting applications under test and identifying locator candidates.

[Open repository](https://codeberg.org/yaforster/trails-scout){ .repository-link }
</section>

<section class="repository-card" markdown>
## Trails Docs

<div class="repository-badges" markdown>
![Codeberg](https://img.shields.io/badge/Codeberg-yaforster%2Ftrails--docs-2185d0?logo=codeberg&logoColor=white)
![Type](https://img.shields.io/badge/type-documentation-teal)
</div>

<div class="repository-stack">
  <span class="repository-stack-item"><img src="/assets/stack/Docker.png" alt="" aria-hidden="true"><span>Docker</span></span>
</div>

Architecture documentation, ADRs, Mermaid diagram sources, and local documentation site configuration.

[Open repository](https://codeberg.org/yaforster/trails-docs){ .repository-link }
</section>

</div>

## Repository Responsibilities

| Repository | Responsibility |
| --- | --- |
| [`trails-service`](https://codeberg.org/yaforster/trails-service) | Backend API, domain behavior, persistence, security, Selenium execution, and test results. |
| [`trails-frontend`](https://codeberg.org/yaforster/trails-frontend) | Browser UI, generated API clients, workflow screens, authentication-aware frontend behavior. |
| [`trails-scout`](https://codeberg.org/yaforster/trails-scout) | Browser extension for locator discovery on applications under test. |
| [`trails-docs`](https://codeberg.org/yaforster/trails-docs) | Interactive documentation site, ARC42 chapters, ADRs, and diagrams. |

## Related Guides

- [Dev Guide](dev-guide/index.md)
- [Architecture Decisions](arc42/09-architecture-decisions.md)
- [Building Block View](arc42/05-building-block-view.md)
