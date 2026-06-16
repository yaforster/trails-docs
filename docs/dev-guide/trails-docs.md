# Trails Docs Development

This page describes local development for the documentation site itself.

## Role

`trails-docs` contains:

- ARC42 architecture documentation
- ADRs
- Mermaid diagram sources
- MkDocs Material configuration
- local Docker Compose setup for the interactive documentation site

## Local Setup

The docs site runs through Docker Compose using the `squidfunk/mkdocs-material` image.

From `trails-docs`:

```powershell
docker compose up -d
```

The site is available at:

```text
http://localhost:8811
```

The container listens on port `8000` internally and Docker maps it to host port `8811`.

## Live Editing

Markdown files are mounted into the container:

```yaml
volumes:
  - .:/docs
```

MkDocs usually reloads content changes automatically.
For changes to `mkdocs.yaml`, navigation, theme settings, Markdown extensions, or Mermaid/snippet behavior, restart the service:

```powershell
docker compose restart trails-docs
```

If Docker Desktop or Windows file watching is unreliable, recreate the service without deleting it manually:

```powershell
docker compose up -d --force-recreate trails-docs
```

Use a browser hard refresh after theme or stylesheet changes.

## Build Verification

Run a full build from `trails-docs`:

```powershell
docker compose run --rm trails-docs build
```

The generated site output is written to:

```text
site
```

## Documentation Structure

| Path | Purpose |
| --- | --- |
| `docs/index.md` | Home page. |
| `docs/arc42` | ARC42 architecture chapters. |
| `docs/adr` | Architecture decision records. |
| `docs/diagrams` | Mermaid diagram source files. |
| `mkdocs.yaml` | Site configuration, navigation, theme, Markdown extensions. |
| `docker-compose.yaml` | Local docs server. |

## Diagrams

Diagrams are written as Mermaid source files under:

```text
docs/diagrams
```

They are included into Markdown pages using snippets:

```markdown
```mermaid
--8<-- "docs/diagrams/example.mmd"
```
```

Keep diagram source files small and focused.
Prefer one file per diagram.

## Theme and Navigation

The docs currently use Material for MkDocs with:

- light/dark palette toggle
- navigation tabs
- expanded sections
- integrated table of contents
- search suggestions and shareable search
- Mermaid support through `pymdownx.superfences`
- snippets through `pymdownx.snippets`

When adding a new page, update `mkdocs.yaml` so it appears in the navigation.

## Common Pitfalls

- Editing generated files in `site` instead of source files under `docs`.
- Forgetting to update `mkdocs.yaml` after adding a page.
- Embedding large diagrams directly in Markdown instead of using `docs/diagrams`.
- Expecting `docker compose up -d --build` to refresh source changes; this setup uses a mounted source directory, not a custom docs image.
- Forgetting that PDF export is not yet implemented.
