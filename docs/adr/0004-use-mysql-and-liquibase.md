# ADR 0004: Use MySQL and Liquibase for Persistence

## Status

Accepted

## Context

Trails stores structured data such as applications, stages, UI elements, test plans, actions, executions, and results.
The schema will evolve as the domain grows.

The persistence technology should be established, container-friendly, and easy to run locally.

## Decision

Trails uses MySQL as its relational database and Liquibase for versioned schema migrations.

## Consequences

- Trails data is stored in an established relational database.
- Schema changes are versioned and kept with the backend code.
- Local development can use a standard MySQL container.
- Database-specific behavior must remain in persistence adapters and should not leak into the domain model.
- Migrations must be reviewed as part of feature work that changes persistence.

## Alternatives Considered

| Alternative | Reason Not Chosen |
| --- | --- |
| H2 as the primary database | Useful for tests, but not a good primary runtime database for Trails. |
| PostgreSQL | Also suitable, but MySQL is already accepted and sufficient for current needs. |
| MongoDB or another document database | Trails has strongly structured relationships where relational persistence is a better fit. |
| Manual schema updates | Too error-prone once the data model evolves. |
