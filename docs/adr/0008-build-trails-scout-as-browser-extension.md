# ADR 0008: Build Trails Scout as a Browser Extension

## Status

Accepted

## Context

Trails needs a practical way to identify UI elements and locator candidates on web pages.
This work happens directly in the browser while viewing the application under test.

Putting this capability only into the main Trails frontend would limit access to the inspected page and browser context.

## Decision

Trails Scout is implemented as a browser extension using TypeScript, Vite, and WebExtension APIs.

## Consequences

- Locator discovery can happen in the browser context of the page being inspected.
- Trails Scout can evolve independently from the main Angular frontend.
- Browser extension APIs become an explicit external dependency and should be isolated where practical.
- Packaging and browser compatibility need their own build and test workflow.
- Communication between Trails Scout and other Trails components must be explicit and documented as it matures.

## Alternatives Considered

| Alternative | Reason Not Chosen |
| --- | --- |
| Implement locator discovery only in the Angular frontend | The frontend does not naturally run inside the inspected application's page context. |
| Manual locator entry only | Too slow and error-prone for regular use. |
| Selenium-only locator discovery | Useful for execution, but less ergonomic for interactive inspection by a human user. |
