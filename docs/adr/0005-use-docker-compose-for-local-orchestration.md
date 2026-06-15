# ADR 0005: Use Docker Compose for Local Orchestration

## Status

Accepted

## Context

Trails consists of multiple services and supporting systems: backend, frontend, database, Selenium Grid, browser nodes, optional Keycloak, and documentation.
The project should be easy to run on a development machine without hidden host dependencies.

## Decision

Trails uses Docker Compose for local and small-scale orchestration.
Components should be built so they can run in containers, preferably using generic and readily available images.

## Consequences

- Local setup is reproducible and documented through compose files.
- Supporting infrastructure can be started without manual installation on the host.
- Runtime configuration must be externalized through environment files, variables, volumes, and ports.
- Container networking must be considered explicitly, especially for browser automation where `localhost` may refer to different containers.
- Heavier orchestration platforms are deferred until there is a concrete need.

## Alternatives Considered

| Alternative | Reason Not Chosen |
| --- | --- |
| Manual local installation of every dependency | Too much hidden machine state and setup effort. |
| Kubernetes for local development | Disproportionate to the current project stage. |
| Running everything directly from the IDE | Useful during development, but insufficient as the shared operational model. |
