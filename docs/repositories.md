# Repositories

The Trails workspace is split into separate Codeberg repositories.
Each project keeps its own project-local `README.md`; those README files remain the source of truth for project-specific setup and commands.

The stack markers identify the primary technologies at each boundary. They are orientation aids, not a complete dependency inventory.

<div class="repository-grid">
  <section class="repository-card">
    <h2>Trails Service</h2>
    <div class="repository-badges">
      <img src="https://img.shields.io/badge/Codeberg-yaforster%2Ftrails--service-2185d0?logo=codeberg&amp;logoColor=white" alt="Codeberg: yaforster/trails-service">
      <img src="https://img.shields.io/badge/version-0.0.5-teal" alt="Version 0.0.5">
    </div>
    <p class="repository-stack-label">Core stack</p>
    <div class="repository-stack">
      <span class="repository-stack-item"><img src="/assets/stack/Java.png" alt=""><span>Java 25</span></span>
      <span class="repository-stack-item"><img src="/assets/stack/Spring.png" alt=""><span>Spring Boot 4</span></span>
      <span class="repository-stack-item"><img src="/assets/stack/openapi.png" alt=""><span>OpenAPI</span></span>
      <span class="repository-stack-item"><img src="/assets/stack/asyncapi.png" alt=""><span>AsyncAPI</span></span>
      <span class="repository-stack-item"><img src="/assets/stack/MySQL.png" alt=""><span>MySQL 9</span></span>
      <span class="repository-stack-item"><img src="/assets/stack/Selenium.png" alt=""><span>Selenium Grid</span></span>
      <span class="repository-stack-item"><img src="/assets/stack/Docker.png" alt=""><span>Docker</span></span>
      <span class="repository-stack-item"><img src="/assets/stack/Keycloak.png" alt=""><span>Keycloak</span></span>
    </div>
    <p>Spring Boot backend for API, persistence, security integration, Selenium orchestration, and persisted test results.</p>
    <a class="repository-link" href="https://codeberg.org/yaforster/trails-service">Open repository</a>
  </section>

  <section class="repository-card">
    <h2>Trails Frontend</h2>
    <div class="repository-badges">
      <img src="https://img.shields.io/badge/Codeberg-yaforster%2Ftrails--frontend-2185d0?logo=codeberg&amp;logoColor=white" alt="Codeberg: yaforster/trails-frontend">
      <img src="https://img.shields.io/badge/version-0.0.0-teal" alt="Version 0.0.0">
    </div>
    <p class="repository-stack-label">Core stack</p>
    <div class="repository-stack">
      <span class="repository-stack-item"><img src="/assets/stack/Angular.png" alt=""><span>Angular 21</span></span>
      <span class="repository-stack-item"><img src="/assets/stack/taiga.svg" alt=""><span>Taiga UI</span></span>
      <span class="repository-stack-item"><img src="/assets/stack/Docker.png" alt=""><span>Docker</span></span>
    </div>
    <p>Angular frontend for modeling, execution, result inspection, metrics, and administration workflows.</p>
    <a class="repository-link" href="https://codeberg.org/yaforster/trails-frontend">Open repository</a>
  </section>

  <section class="repository-card">
    <h2>Trails Scout</h2>
    <div class="repository-badges">
      <img src="https://img.shields.io/badge/Codeberg-yaforster%2Ftrails--scout-2185d0?logo=codeberg&amp;logoColor=white" alt="Codeberg: yaforster/trails-scout">
      <img src="https://img.shields.io/badge/version-1.0.0-teal" alt="Version 1.0.0">
    </div>
    <p class="repository-stack-label">Supported browsers</p>
    <div class="repository-stack">
      <span class="repository-stack-item"><img src="/assets/stack/chrome.png" alt=""><span>Chrome</span></span>
      <span class="repository-stack-item"><img src="/assets/stack/edge.png" alt=""><span>Edge</span></span>
      <span class="repository-stack-item"><img src="/assets/stack/firefox.png" alt=""><span>Firefox</span></span>
    </div>
    <p>Browser extension for inspecting applications under test and identifying locator candidates.</p>
    <a class="repository-link" href="https://codeberg.org/yaforster/trails-scout">Open repository</a>
  </section>

  <section class="repository-card">
    <h2>Trails Docs</h2>
    <div class="repository-badges">
      <img src="https://img.shields.io/badge/Codeberg-yaforster%2Ftrails--docs-2185d0?logo=codeberg&amp;logoColor=white" alt="Codeberg: yaforster/trails-docs">
      <img src="https://img.shields.io/badge/type-documentation-teal" alt="Documentation">
    </div>
    <p class="repository-stack-label">Delivery</p>
    <div class="repository-stack">
      <span class="repository-stack-item"><img src="/assets/stack/Docker.png" alt=""><span>Docker</span></span>
    </div>
    <p>Architecture documentation, ADRs, Mermaid diagram sources, and local documentation site configuration.</p>
    <a class="repository-link" href="https://codeberg.org/yaforster/trails-docs">Open repository</a>
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

- [Dev Guide](../dev-guide/)
- [Architecture Decisions](../arc42/09-architecture-decisions/)
- [Building Block View](../arc42/05-building-block-view/)
