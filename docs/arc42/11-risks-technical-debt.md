# 11. Risks and Technical Debt

This section records known risks and technical debt in Trails.
It is intentionally critical.
The goal is to keep architectural weaknesses visible, make future work easier to prioritize, and provide a way to check whether the system is improving over time.

## Risk Register

| ID | Risk | Impact | Likelihood | Current Mitigation | Status |
| --- | --- | --- | --- | --- | --- |
| R1 | Browser automation is inherently brittle. | Test execution can fail because of timing, browser behavior, page changes, network conditions, or Selenium Grid issues rather than Trails logic. | High | Selenium Grid is documented as a deliberate architecture choice in ADR 0011. Session creation is isolated and protected with retry, circuit breaker, and browser-specific bulkheads. Browser actions are not blindly retried. | Active |
| R2 | Browser action failures may be hard to diagnose. | Failed runs may require manual reproduction if logs and artifacts do not contain enough context. | Medium | Quality requirements and crosscutting concepts require explicit failed states, logs, and diagnostic artifacts. | Active |
| R3 | Generated artifacts may grow without clear lifecycle management. | Screenshots, downloads, and rendered documents can consume disk space and may contain sensitive data. | High | Artifacts are documented as managed execution artifacts, but retention and cleanup rules still need to mature. | Active |
| R4 | Artifact traceability can degrade over time. | Files may become difficult to associate with the execution, workflow, or action that produced them. | Medium | ADR 0002 establishes artifacts as managed and traceable. | Active |
| R5 | Container networking can cause confusing failures. | Browser nodes, backend service, host machine, and target applications may disagree about what `localhost` means. | High | Configuration distinguishes browser-facing base URLs from service-local URLs. | Active |
| R6 | Optional OAuth2/JWT security adds configuration complexity. | Secure mode may fail because of issuer/JWK URL confusion, role mapping mistakes, or token claim differences. | Medium | Security can be disabled locally; Keycloak provides a local integration environment. | Active |
| R7 | Security-disabled local mode may hide security regressions. | Features may work locally but fail when OAuth2/JWT validation is enabled. | Medium | Security mode is documented and should be covered by integration tests where important. | Active |
| R8 | OpenAPI contract, generated DTOs, and implementation can drift in intent. | The API may be technically generated but still inconsistent with frontend or domain expectations. | Medium | API changes start in OpenAPI, and generated code reduces mechanical drift. | Active |
| R9 | Adding new action types is structurally expensive. | Each action may require domain code, REST DTOs, mappers, persistence entities, migrations, copy behavior, validation, and tests. | High | The README documents a variant-based extension checklist and discourages central switch growth. | Active |
| R10 | Mapping layers can become repetitive and error-prone. | REST, persistence, promotion, and domain mappings may diverge or miss fields. | Medium | Variant mappers keep changes localized, but test coverage must stay strong. | Active |
| R11 | The backend depends on new platform versions. | Java 25 and Spring Boot 4 may have ecosystem, tooling, plugin, or compatibility rough edges. | Medium | Use established frameworks, but track dependency health and upgrade issues deliberately. | Active |
| R12 | Dependency freshness creates upgrade pressure. | Selenium, Angular, Spring Boot, Keycloak, MySQL, and browser images evolve quickly and can break integrations. | High | ADRs and dependency constraints require active lifecycle awareness. | Active |
| R13 | Single-maintainer knowledge concentration. | Design reasoning, operational knowledge, and failure handling may exist only in the maintainer's memory. | High | ARC42 and ADRs are maintained close to the code. | Active |
| R14 | Documentation may become stale. | The documentation site can create false confidence if it stops matching implementation. | Medium | Documentation is treated as part of architecture work. | Active |
| R15 | Local-first architecture may postpone production concerns too long. | Deployment, backup, security hardening, artifact retention, and monitoring may require larger changes later. | Medium | High availability and horizontal scaling are explicit non-goals, but operational assumptions should be revisited regularly. | Active |
| R16 | Test coverage may cluster around easy code. | Critical browser, persistence, security, and artifact paths may remain under-tested because they are harder to automate. | Medium | Architecture and quality requirements call for focused tests around risky boundaries. | Active |
| R17 | Browser extension integration can become underspecified. | Trails Scout may evolve separately from backend/frontend expectations and create manual transfer or compatibility problems. | Medium | ADR 0008 records the browser extension decision; integration contracts still need to mature. | Active |
| R18 | Demo resources can blur production behavior. | Local demo pages and helpers may accidentally influence assumptions about real deployments. | Low | Demo resources are disabled unless explicitly enabled. | Active |

## Historical Risks Already Identified and Addressed

The following risks were identified during earlier Trails development and already led to architectural or implementation measures.
They are kept here because they explain why some parts of the system are shaped the way they are.

| ID | Historical Risk | Measure Taken | Remaining Watchpoint | Status |
| --- | --- | --- | --- | --- |
| H1 | Local WebDriver executables made browser execution depend on host-machine setup. | Browser execution was moved to Selenium Grid with remote browser nodes. | The original local-executable dependency is gone as long as local WebDriver execution is not reintroduced. | Eliminated |
| H2 | Browser download handling through shared filesystem polling was unreliable with Selenium Grid and browser containers. | Download handling moved toward Selenium managed downloads, and download access was wrapped behind a driver abstraction. | Continue testing download-heavy actions across supported browsers. | Mitigated |
| H3 | Chrome download behavior required workarounds in Grid execution. | A Grid-compatible workaround and later managed-download handling were introduced. | Browser image and Selenium upgrades can invalidate download behavior. | Mitigated |
| H4 | Parallel execution could cause multiple test runs to instruct the same Grid node about file handling. | Parallel streaming was removed for the affected path, and session creation received Resilience4j protection. | Bulkhead sizing must stay aligned with Selenium Grid capacity. | Mitigated |
| H5 | Selenium session creation could overload or repeatedly hit unavailable browsers. | Retry, circuit breaker, and browser-specific bulkheads were introduced for remote session creation. | Do not extend retries blindly to browser actions with side effects. | Mitigated |
| H6 | Hard deletion could break inspection of historic test runs. | Deletion behavior was redesigned toward retiring entities and allowing restoration. | The original hard-delete failure mode is gone for covered entities; retention and cleanup rules remain separate concerns. | Eliminated |
| H7 | Missing validation allowed duplicate labels, URLs, locators, and other important values. | Controller validation and duplicate checks were introduced. | Validation must evolve with new domain concepts and action types. | Mitigated |
| H8 | Looking up promoted entities only by labels or locators could return duplicates or the wrong entity. | Queries were tightened to include stage and application identifiers where needed. | Promotion and reference resolution need regression tests whenever entity identity rules change. | Mitigated |
| H9 | Test plan actions were stored without the test plan ID in one creation path. | The persistence bug was fixed so actions are associated with the owning test plan. | The specific bug is gone; similar ownership bugs remain possible in new mapping code. | Eliminated |
| H10 | HATEOAS links could be missing, hard-coded, or inconsistent with the requesting user's permissions. | Link handling was reworked; links include HTTP methods and account for permissions. Frontend usage moved away from hard-coded URLs. | Link generation needs tests for both secured and unsecured modes. | Mitigated |
| H11 | CORS disabling did not disable every relevant CORS facet. | CORS handling was fixed so the disabled mode is consistent. | The known inconsistent disabled mode is gone; future security changes still need regression checks. | Eliminated |
| H12 | REST error handling and validation were scattered. | API wrappers centralized request validation, exception handling, and client-facing error messages. | Keep new controllers and endpoints inside the standardized error-handling path. | Mitigated |
| H13 | DTO classes were at risk of leaking outside the API adapter boundary. | Usage of DTO classes was reduced outside the API package, and link creation was refactored. | The known leakage was removed; new API work can still reintroduce the pattern. | Eliminated |
| H14 | Central switch statements and large mappers made action extension brittle. | Action mapping was split into action-specific mapper variants; central dispatchers now delegate by registered variant. | The specific central-mapper structure was removed; new action types must not rebuild it elsewhere. | Eliminated |
| H15 | Mapper lookup through collections was less explicit and easier to misuse. | Mapper lookup moved from mapper collections to maps keyed by supported type. | The collection-scanning lookup risk is gone for the refactored mappers. | Eliminated |
| H16 | Large backend services had too many responsibilities. | Database and result services were split into smaller classes with clearer scopes. | Watch for service classes that again combine persistence, mapping, validation, and orchestration. | Mitigated |
| H17 | Large frontend components made UI behavior hard to maintain. | Oversized frontend components, including the test plan modeller, were split into smaller parts. | Continue splitting by workflow responsibility instead of by incidental template fragments. | Mitigated |
| H18 | Frontend data fetching and modeller state transitions were fragile. | Modeller data fetching, edge recreation, and transition behavior were made more robust. | Complex canvas/model state needs regression tests or focused component tests. | Mitigated |
| H19 | The frontend could show layout gaps when permission-controlled cards were hidden. | The deployments card layout was fixed to avoid reserving vertical space when hidden. | The known layout defect is gone; similar permission-aware layout issues remain possible elsewhere. | Eliminated |
| H20 | Browser-extension build artifacts were committed accidentally. | Committed `dist` files were removed from Trails Scout history. | The committed artifacts are gone; keep generated artifacts ignored to prevent recurrence. | Eliminated |
| H21 | Terminology around selectors and locators was inconsistent. | Selectors were renamed to locators across API, frontend, and Trails Scout. | The known terminology split was removed; new UI/API text should consistently use "locator". | Eliminated |
| H22 | Logging implementation choices could create coupling or inconsistency. | Logging was refactored to use SLF4J. | Keep logging facade-based and avoid logging sensitive execution data. | Mitigated |
| H23 | Direct or deprecated browser storage APIs created maintenance risk after Selenium updates. | Local and session storage actions moved to JavaScript execution where needed. | Browser storage behavior should be checked after Selenium/browser upgrades. | Mitigated |
| H24 | Formatting drift made reviews and long-running maintenance noisier. | Spring Java Format and Prettier were introduced and code was reformatted. | The previous formatting drift was removed; checks must continue to prevent new drift. | Eliminated |

## Technical Debt

| ID | Debt | Consequence | Suggested Next Step | Status |
| --- | --- | --- | --- | --- |
| D1 | Artifact retention and cleanup rules are not yet fully defined. | Disk usage and sensitive artifact exposure can grow over time. | Define retention policy, cleanup command/job, and documentation for artifact storage. | Open |
| D2 | Artifact storage abstraction needs continued hardening. | Future storage changes may be harder if file handling leaks into unrelated code. | Keep artifact operations behind Trails-owned services and add tests around retrieval and failure cases. | Open |
| D3 | Security integration needs regular end-to-end verification. | OAuth2/JWT mode may regress while unsecured local mode continues to work. | Add or maintain integration tests for enabled security mode, role mapping, and token validation failures. | Open |
| D4 | Action type extension requires many coordinated edits. | Feature work can be slow and defects can appear in mappings or persistence. | Continue refining variant registration, test templates, and documentation for new actions. | Open |
| D5 | API compatibility policy is not yet formalized. | Breaking API changes may surprise frontend or future external clients. | Define versioning and compatibility expectations for the REST/HATEOAS API. | Open |
| D6 | Frontend-backend contract verification is not yet described. | Frontend assumptions may diverge from OpenAPI and backend behavior. | Add a documented workflow for generated clients, contract tests, or API compatibility checks. | Open |
| D7 | Browser extension integration contract is immature. | Locator data may require manual handling or become incompatible with backend models. | Define how Trails Scout exports or sends locator information to Trails. | Open |
| D8 | Operational observability is mostly conceptual. | Failures may still require manual log inspection without structured status views or metrics. | Define minimal operational signals, health checks, and execution-level diagnostics. | Open |
| D9 | Dependency update process is informal. | Updates may be delayed until they become large and risky. | Establish a lightweight dependency review cadence and document upgrade checks. | Open |
| D10 | Initial architecture documentation needs review and hardening. | All ARC42 chapters now have first drafts, but some sections may still be too broad, stale, or insufficiently tied to code and ADRs. | Review chapters against implementation changes and add links to commits, ADRs, diagrams, or tests where useful. | Active |
| D11 | PDF export for documentation is not yet implemented. | The documentation site is interactive, but reproducible PDF output is not available. | Decide on a PDF generation approach and add it to the docs container or build workflow. | Open |
| D12 | Deployment model is local-first only. | Moving beyond local/small-scale operation will require new decisions around backups, secrets, monitoring, and exposure. | Keep Docker Compose as the current model, but document production-readiness gaps explicitly before external exposure. | Open |
| D13 | Historical mitigations are not yet linked to exact commits or ADRs. | Future readers can see what happened, but not always the exact implementation context. | Link important historical items to ADRs, commits, or issue references when the documentation process matures. | Open |

## Highest Priority Risks

The following risks deserve regular attention because they can directly affect confidence in Trails results:

1. Browser automation brittleness and diagnostic quality.
2. Artifact storage, traceability, retention, and sensitivity.
3. Security behavior when OAuth2/JWT is enabled.
4. Contract drift between OpenAPI, backend implementation, and frontend usage.
5. Repetition and coordination cost when adding new browser action types.
6. Reintroducing problems that were already mitigated historically, especially around downloads, Grid concurrency, entity identity, HATEOAS links, and action mapping.

## Review Triggers

This document should be reviewed when:

- a new browser action family is added
- artifact storage or download handling changes
- OAuth2/JWT behavior changes
- the OpenAPI contract changes in a breaking or compatibility-relevant way
- Docker Compose, ports, volumes, or container networking assumptions change
- Selenium, Spring Boot, Angular, Java, Keycloak, or MySQL receives a major upgrade
- Trails is exposed beyond a trusted local environment
- a recurring defect points to missing architecture, testing, or operational guidance

## Improvement Tracking

Risks and debt items should not be removed merely because they are inconvenient.
They should be updated when the situation changes.

Use these statuses:

- `Open`: known issue with no sufficient mitigation yet
- `Active`: known risk with partial mitigation
- `Mitigated`: risk remains possible, but the architecture has a deliberate response
- `Eliminated`: the known failure mode has been made impossible by removing its cause or preventing the invalid state structurally
- `Accepted`: risk is understood and intentionally tolerated
- `Closed`: no longer relevant because the architecture or project context changed

When a risk is mitigated, eliminated, or closed, keep enough history in the surrounding documentation or ADRs to explain what changed.
