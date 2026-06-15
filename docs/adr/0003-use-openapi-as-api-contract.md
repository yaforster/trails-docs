# ADR 0003: Use OpenAPI as the Backend API Contract

## Status

Accepted

## Context

Trails exposes a backend API consumed by the Angular frontend and potentially by automation clients or CI/CD integrations.
The API should be explicit, reviewable, and stable enough to support generated code and documentation.

## Decision

Trails uses OpenAPI as the source of truth for the backend REST API contract.
Backend interfaces and DTOs are generated from the OpenAPI contract where practical.

## Consequences

- API changes start from an explicit contract.
- Frontend and external consumers can inspect the API shape without reading backend implementation code.
- Generated DTOs reduce drift between the contract and implementation.
- API evolution needs discipline because contract changes affect consumers.
- HATEOAS links remain part of the API design and should be represented consistently.

## Alternatives Considered

| Alternative | Reason Not Chosen |
| --- | --- |
| Code-first API only | Easier initially, but API behavior can become implicit and harder to review. |
| Handwritten API documentation | Likely to drift from implementation. |
| GraphQL | Powerful, but not currently needed for Trails' resource-oriented API. |
