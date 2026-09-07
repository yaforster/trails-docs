# ADR 0012: Use VitePress for Documentation

## Status

Accepted

Supersedes [ADR 0007](../0007-use-mkdocs-material-arc42-and-adrs/).

## Context

Trails documentation remains Markdown-based, versioned with the project, and organized through ARC42 chapters and ADRs.
The site needs local full-text search, client-rendered Mermaid diagrams, a root-domain deployment, and native Node.js as well as Docker Compose development workflows.

## Decision

Trails uses VitePress for the documentation website.
VitePress local search provides offline index generation, and a custom client-side Mermaid component renders existing text diagram sources.
Route rewrites preserve current trailing-slash page URLs.

## Consequences

- Documentation remains Markdown and stays in the existing ARC42 and ADR directories.
- Documentation development uses `npm run docs:dev`, `npm run docs:build`, and `npm run docs:preview`.
- Docker Compose runs the VitePress development server with Node.js.
- Static `site` output publishes through Forgejo Actions to Codeberg Pages.
- Mermaid diagrams load from existing `.mmd` source files by documentation pages.
- ADR 0007 remains an immutable record of previous MkDocs Material decision.

## Alternatives Considered

| Alternative | Reason Not Chosen |
| --- | --- |
| Keep MkDocs Material | Does not meet current tooling and site evolution direction. |
| Generate Mermaid SVG during build | Adds rendering toolchain and generated artifacts without current need. |
| External hosted search | Adds service coupling where VitePress local search is sufficient. |
