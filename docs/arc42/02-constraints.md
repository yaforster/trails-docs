# 2. Constraints

This section describes constraints that shape the architecture of Trails.
They are treated as given boundary conditions rather than as design decisions that are freely changeable.

## Technology Constraints

| Constraint | Description | Consequence |
| --- | --- | --- |
| Established languages and frameworks | Every Trails component must be built with established programming languages and frameworks. | Experimental or niche technology choices should be avoided unless there is a strong reason and an explicit architecture decision. |
| Actively maintained dependencies | Dependencies must have a reasonably active lifecycle to be appropriate for Trails. | Dependencies should be checked for maintenance status, ecosystem health, and upgrade path before adoption. |
| Trails-owned integration layer | Core functionality from dependencies should be wrapped behind Trails-owned interfaces or services. | Coupling to third-party APIs should stay localized and should not spread through the codebase. |
| Base technology exceptions | Base technologies such as Splunk and Apache Commons may be used directly where wrapping would add no meaningful architectural value. | Exceptions should remain intentional and limited to broadly accepted infrastructure or utility technologies. |

## Deployment Constraints

| Constraint | Description | Consequence |
| --- | --- | --- |
| Container-capable components | Trails components must be created so they can run inside Docker containers. | Runtime assumptions must be explicit and configurable. Components should not depend on hidden host-machine setup. |
| Generic container images preferred | Components should preferably run in generic, readily available container images. | Custom images are allowed when needed, but the default should be simple, reproducible, and easy to understand. |
| No special host dependencies | Containers should not require special dependencies on the Docker host. | Local setup should remain portable and should not rely on manually installed tools outside Docker, except for Docker itself and development tools. |

## Development Constraints

| Constraint | Description | Consequence |
| --- | --- | --- |
| Single-maintainer development | Trails is currently developed by one person. | The architecture should favor clarity, low operational overhead, and easy recovery after development pauses. |
| Documentation close to the code | Architecture documentation, ADRs, and operational notes should live in the workspace. | Important reasoning should be versioned and reviewable together with implementation changes. |
| Local-first operation | Trails should be easy to run and inspect on a development machine. | Docker Compose and clear configuration should be preferred for local workflows. |

## Runtime and Data Constraints

| Constraint | Description | Consequence |
| --- | --- | --- |
| Browser automation is inherently fragile | Trails relies on browser automation for important workflows. | Automation code should be isolated, observable, and designed for failure diagnostics. |
| Generated artifacts must be manageable | Screenshots, downloads, and other generated artifacts are part of the system behavior. | Storage locations, naming, cleanup, and traceability must be explicit architectural concerns. |
| Environment-specific values must be externalized | Paths, ports, credentials, browser settings, and service endpoints should not be hard-coded. | Configuration should be supplied through files, environment variables, or container configuration. |

## Organizational Constraints

| Constraint | Description | Consequence |
| --- | --- | --- |
| No external customer contract | Trails is not currently built against a fixed customer specification. | Requirements may evolve, but architectural decisions should still be documented when they affect long-term direction. |
| Pragmatic scope control | The project should avoid infrastructure that is disproportionate to its current needs. | Enterprise-scale capabilities should be deferred until there is a concrete need. |
