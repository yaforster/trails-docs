# ADR 0011: Use Selenium Grid for Browser Automation

## Status

Accepted

## Context

Trails executes browser-driven test workflows.
The browser automation layer must operate real browsers and support multiple browser families.

Browser execution should not depend on browser executables installed on the backend host.
The architecture should allow browser capacity to grow independently from the backend service, because test execution can become resource-intensive and browser-specific.

The project has already moved away from local WebDriver executables and filesystem-based download assumptions.
Remote browser execution and managed downloads are now core runtime expectations.

## Decision

Trails uses Selenium Grid with remote browser nodes for browser automation.

The backend creates remote browser sessions through Selenium Grid.
Browser nodes provide Chrome, Firefox, and Edge execution.
Downloads are retrieved through Selenium managed downloads rather than through a shared filesystem path.

## Rationale

Selenium Grid is chosen primarily because it separates browser execution capacity from the backend service.

This supports:

- scaling browser execution independently from Trails Service
- running multiple browser families through a common execution model
- keeping browser runtime dependencies out of the backend container
- running browser nodes in generic Selenium container images
- making browser capacity explicit through Grid/node configuration
- aligning with Docker-based local and future small-scale deployment

## Consequences

- Trails Service does not need locally installed browser executables.
- Browser execution can be scaled by changing Selenium node capacity or adding nodes.
- Container networking becomes an explicit architectural concern.
- Browser-facing URLs must be reachable from browser nodes, not only from the host browser.
- Session creation must be protected against unavailable or overloaded browser nodes.
- Browser action retries must remain conservative because actions may have side effects.
- Download handling must use mechanisms compatible with remote browser sessions.
- Selenium/WebDriver APIs must remain isolated behind Trails-owned abstractions.

## Alternatives Considered

| Alternative | Reason Not Chosen |
| --- | --- |
| Local WebDriver executables | Ties execution to host-machine setup and does not scale browser capacity independently. |
| One browser inside the backend container | Couples the backend runtime to browser dependencies and limits scaling flexibility. |
| Playwright | Strong automation tool, but Selenium Grid better matches the current need for remote browser-node capacity and established multi-browser Grid operation. |
| Cypress | Strong for application testing, but Trails is itself a test execution platform and needs externally orchestrated browser sessions. |
| Browserless/custom browser service | Adds another specialized runtime dependency where Selenium Grid already provides the needed model. |
