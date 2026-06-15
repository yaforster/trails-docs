# ADR 0007: Use MkDocs Material, ARC42, and ADRs for Documentation

## Status

Accepted

## Context

Trails needs architecture documentation that is easy to write, navigate, version, and run locally.
The documentation should cover both stable architecture views and point-in-time decisions.

## Decision

Trails uses MkDocs Material for the documentation website.
The architecture documentation follows the ARC42 structure.
Architecture decision records are stored as Markdown files in a dedicated ADR directory.

## Consequences

- Documentation is written in Markdown and stored near the project workspace.
- The documentation site can be served locally in a Docker container.
- ARC42 provides a predictable structure for architecture views.
- ADRs preserve decision context without overloading the ARC42 chapters.
- PDF export requires an additional documented mechanism or plugin because the basic MkDocs Material image primarily serves the website.

## Alternatives Considered

| Alternative | Reason Not Chosen |
| --- | --- |
| Wiki-only documentation | Easy to edit, but often separated from code and harder to version with implementation changes. |
| Large single architecture document | Harder to navigate and evolve. |
| ADRs only | Good for decisions, but insufficient for stable system views such as context, deployment, and runtime behavior. |
