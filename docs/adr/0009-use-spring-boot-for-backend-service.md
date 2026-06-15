# ADR 0009: Use Spring Boot for the Backend Service

## Status

Accepted

## Context

Trails needs a backend service that owns the core API, coordinates use cases, persists structured data, integrates optional OAuth2/JWT security, and orchestrates browser-driven test execution.

The backend technology should be established, actively maintained, container-capable, and suitable for a single-maintainer project where clarity and ecosystem support matter.

## Decision

Trails uses Java and Spring Boot for the backend service.

Spring Boot is the primary framework for:

- REST/HATEOAS API exposure
- validation
- configuration
- dependency injection
- security integration
- database integration
- application startup and runtime wiring
- test support

## Consequences

- Trails can rely on a mature backend ecosystem instead of building infrastructure manually.
- Spring configuration and dependency injection provide a consistent composition model.
- Spring Security can support optional OAuth2/JWT resource-server behavior.
- Spring Data/JPA and Liquibase integration fit the relational persistence model.
- Spring Boot adds framework conventions that must be kept out of the core domain model.
- Architecture tests are needed to keep domain/application code independent from adapters and framework details.

## Alternatives Considered

| Alternative | Reason Not Chosen |
| --- | --- |
| Plain Java without Spring Boot | Would require more custom infrastructure for REST, configuration, security, persistence, and testing. |
| Quarkus or Micronaut | Viable backend frameworks, but Spring Boot has broader ecosystem familiarity and fits the current project well. |
| Node.js backend | Would align language with frontend tooling, but Trails already benefits from Java's type system, mature backend libraries, and Spring's integration ecosystem. |
