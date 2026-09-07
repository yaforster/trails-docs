# 1. Introduction and Goals

This document describes the architecture of Trails.
Trails is a system for modeling, executing, and inspecting browser-driven test workflows.

It allows applications, stages, UI elements, test plans, browser actions, executions, and persisted test results to be described and inspected.
Browser execution is performed through Selenium Grid, while users interact with Trails through a web frontend and, for locator discovery, a browser extension.

The documentation is written for the current local-first, single-maintainer stage of the project.
It should make the architecture understandable, preserve important decisions, and expose risks and technical debt honestly.

## Requirements Overview

Trails should support the following core capabilities:

| Capability | Description |
| --- | --- |
| Model applications and stages | Describe applications under test and their runtime stages or environments. |
| Model UI elements and locators | Store page elements and locator information used by browser actions. |
| Model test plans | Define reusable browser-driven test workflows. |
| Execute tests in real browsers | Run test plans through Selenium Grid and remote browser nodes. |
| Persist test results | Store test run results so they can be inspected later. |
| Manage generated artifacts | Keep screenshots, downloaded files, document checks, and diagnostics traceable to their execution. |
| Support browser-assisted locator discovery | Use Trails Scout to identify locator candidates directly in the browser. |
| Expose a stable API | Provide a REST/HATEOAS API described by OpenAPI. |
| Provide a usable frontend | Offer a browser-based UI for modeling, execution, inspection, and administration workflows. |
| Support optional security | Allow local unsecured operation and OAuth2/JWT-secured operation where needed. |

## Quality Goals

The most important quality goals are:

| Priority | Quality Goal | Explanation |
| --- | --- | --- |
| 1 | Maintainability | Trails is developed by a single maintainer and must remain understandable over time. |
| 2 | Reliability | Browser automation and downloads are failure-prone, so failures must be handled explicitly. |
| 3 | Observability | Failed executions must be diagnosable through logs, states, results, and artifacts. |
| 4 | Testability | Core behavior should be verifiable without requiring full browser or infrastructure execution. |
| 5 | Deployability | Components should be easy to run locally and should remain container-capable. |

These goals are expanded in [10. Quality Requirements](../10-quality-requirements/).

## Stakeholders

| Stakeholder | Interest |
| --- | --- |
| Maintainer | Needs an architecture that remains understandable, evolvable, testable, and documented. |
| Test designer | Defines applications, stages, UI elements, locators, actions, and test plans. |
| Test executor | Starts test executions and needs clear status, results, and diagnostics. |
| Administrator | Configures runtime behavior, security, supporting services, and deployment settings. |
| Browser extension user | Uses Trails Scout to identify locator candidates on pages under test. |
| CI/CD pipeline | May report deployments or trigger test-related workflows through the API. |
| Future contributor | Needs clear boundaries, decision records, and extension rules. |

## Architecture Goals

Trails should be shaped by the following architectural goals:

- Use established languages, frameworks, and tools.
- Keep domain logic independent from REST, database, Selenium, and security details.
- Wrap important external dependencies behind Trails-owned abstractions.
- Keep components runnable in Docker containers without hidden host-machine dependencies.
- Treat browser automation as unreliable external I/O.
- Make generated artifacts traceable to their originating execution.
- Keep architecture documentation and ADRs close to the code.
- Prefer pragmatic, local-first operation over premature enterprise infrastructure.

## Scope

Trails includes:

- Trails Service, the Spring Boot backend
- Trails Frontend, the Angular web application
- Trails Scout, the browser extension
- database schema and migrations owned by Trails
- Docker Compose configuration for local operation
- architecture documentation and ADRs
- diagram sources used by the documentation

Trails does not include:

- the implementation of applications under test
- Selenium Grid internals
- browser implementation internals
- MySQL internals
- Keycloak internals
- Docker Desktop or the host operating system
- external CI/CD systems

The system boundary is described in more detail in [3. Context and Scope](../03-context-scope/).

## Non-Goals

The initial architecture does not aim to provide:

- high availability
- horizontal scaling
- multi-tenant operation
- enterprise-grade access control
- Kubernetes deployment
- strict real-time processing
- a replacement for a general-purpose non-browser test framework
- production-grade identity-provider administration

These are deliberate non-goals for the current project stage.
They may be revisited if Trails moves beyond trusted local or small-scale operation.

## Documentation Goals

This documentation should help answer:

- What is Trails responsible for?
- Which technologies and components make up the system?
- Why were important architectural choices made?
- How does browser-driven execution work at runtime?
- Where are the known risks and technical debts?
- How should future changes preserve the intended boundaries?

ARC42 chapters describe stable architecture views.
ADRs capture individual architecture decisions and their consequences.
