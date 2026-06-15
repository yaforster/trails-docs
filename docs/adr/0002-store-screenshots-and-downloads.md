# ADR 0002: Store Screenshots, Downloads, and Diagnostics as Managed Artifacts

## Status

Accepted

## Context

Trails executes browser-driven workflows.
During execution, the system may create screenshots, download files, inspect documents, or collect diagnostic evidence for failed runs.

These artifacts are important for understanding test results.
They are also potentially large, sensitive, and operationally different from ordinary relational data.

## Decision

Trails treats generated files as managed execution artifacts.
Screenshots, downloads, and diagnostic evidence must be traceable to the originating execution, workflow, or action.

Artifact storage, naming, lifecycle, and retrieval are architectural concerns and should not be left as incidental filesystem behavior.

## Consequences

- Test results can link to the evidence produced during execution.
- Failed browser runs can preserve useful diagnostics.
- Storage behavior must be explicit in configuration and deployment.
- Artifact cleanup and retention need deliberate rules as the system matures.
- Sensitive information may be present in screenshots or downloads, so access and logging must be handled carefully.

## Alternatives Considered

| Alternative | Reason Not Chosen |
| --- | --- |
| Ignore artifacts after execution | Would make failures harder to diagnose and reduce confidence in test results. |
| Store all artifacts directly in relational tables | Simple traceability, but poor fit for larger binary files and operational storage management. |
| Leave files wherever the browser downloads them | Too dependent on browser-node implementation details and not reliably traceable. |
