# ADR 0006: Use Keycloak for Local OAuth2/JWT Scenarios

## Status

Accepted

## Context

Trails can run without authentication for local or internal development.
It should also support authenticated operation through OAuth2/JWT when security scenarios need to be tested or demonstrated.

The project needs an identity provider that can run locally in a container and issue tokens compatible with the backend resource-server setup.

## Decision

Trails uses Keycloak as the local identity provider for OAuth2/JWT security scenarios.
OAuth2/JWT validation remains optional and can be disabled for local development.

## Consequences

- Security behavior can be tested locally without relying on an external identity provider.
- Role mapping and token validation can be exercised in a realistic way.
- Keycloak remains supporting infrastructure, not part of the Trails domain.
- Local setup is more complex when security is enabled.
- Configuration must clearly distinguish issuer URLs used by clients from service-to-service URLs used inside Docker networks.

## Alternatives Considered

| Alternative | Reason Not Chosen |
| --- | --- |
| No local identity provider | Would make authenticated scenarios harder to test. |
| Mock JWT validation only | Useful for focused tests, but not enough for realistic local integration. |
| External hosted identity provider | Adds external dependency and credentials to local development. |
