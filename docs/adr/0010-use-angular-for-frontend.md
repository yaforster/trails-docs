# ADR 0010: Use Angular for the Frontend

## Status

Accepted

## Context

Trails needs a browser-based UI for modeling applications, stages, UI elements, test data, test plans, test execution, result inspection, metrics, and administration workflows.

The frontend is expected to grow beyond a small static UI.
It needs routing, forms, generated API integration, stateful workflows, authentication handling, and maintainable component boundaries.

## Decision

Trails uses Angular and TypeScript for the frontend application.

Angular is used for:

- page routing and application shell
- feature-oriented UI implementation
- forms and interaction state
- generated API client integration
- authentication-aware views
- reusable components and services

## Consequences

- Trails uses a structured frontend framework suitable for larger applications.
- TypeScript gives strong typing for API models and frontend code.
- Generated API clients can be consumed directly from the Angular codebase.
- Angular introduces framework conventions and build tooling that must be maintained.
- Large components remain a risk and should be split along workflow boundaries.

## Alternatives Considered

| Alternative | Reason Not Chosen |
| --- | --- |
| Plain HTML/JavaScript | Too little structure for the expected UI complexity. |
| React | Viable, but Angular provides a more opinionated application structure out of the box. |
| Vue | Viable, but Angular's structure and TypeScript-first ecosystem fit the expected application scale. |
| Server-rendered UI only | Would reduce frontend complexity but make interactive modeling workflows harder to implement. |
