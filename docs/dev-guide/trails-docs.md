# Trails Docs Development

This page describes local development for the documentation site itself.

## Role

`trails-docs` contains:

- ARC42 architecture documentation
- ADRs
- Mermaid diagram sources
- VitePress configuration and theme
- local Docker Compose setup for the interactive documentation site

## Local Setup

Install dependencies with Node.js 22 or later:

```powershell
npm install
```

Start the native VitePress development server:

```powershell
npm run docs:dev -- --host 127.0.0.1 --port 8811
```

The docs site also runs through Docker Compose using Node.js 22.

From `trails-docs`:

```powershell
docker compose up -d
```

The site is available at:

```text
http://localhost:8811
```

The container listens on port `5173` internally and Docker maps it to host port `8811`.

## Live Editing

Source files are mounted into the container:

```yaml
volumes:
  - .:/app
```

VitePress reloads Markdown, theme, and configuration changes automatically.
For Docker Compose or dependency changes, recreate the service:

```powershell
docker compose up -d --force-recreate trails-docs
```

If Docker Desktop or Windows file watching is unreliable, use the native Node.js server instead:

```powershell
npm run docs:dev -- --host 127.0.0.1 --port 8811
```

Use a browser hard refresh after theme or stylesheet changes.

## Build Verification

Run a full build from `trails-docs`:

```powershell
npm run docs:build
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
| `docs/.vitepress/config.ts` | Site configuration, navigation, sidebar, search, and route rewrites. |
| `docs/.vitepress/theme` | Default-theme extension, Trails styling, and Mermaid component. |
| `docker-compose.yaml` | Local docs server. |

## Diagrams

Diagrams are written as Mermaid source files under:

```text
docs/diagrams
```

Pages import diagrams as raw source and render them through the global `MermaidDiagram` component:

```markdown
<script setup>
import example from '../diagrams/example.mmd?raw'
</script>

<MermaidDiagram :code="example" />
```

Keep diagram source files small and focused.
Prefer one file per diagram.

## Theme and Navigation

The docs use VitePress with:

- light/dark palette toggle
- navigation and sidebar sections
- page outline and prev/next links
- local search
- client-rendered Mermaid diagrams

When adding a new page, update `docs/.vitepress/config.ts` so it appears in navigation and retains its route.

## Common Pitfalls

- Editing generated files in `site` instead of source files under `docs`.
- Forgetting to update `docs/.vitepress/config.ts` after adding a page.
- Embedding large diagrams directly in Markdown instead of using `docs/diagrams`.
- Expecting generated `site` files to refresh while serving; VitePress development server serves source directly.
- Forgetting that PDF export is not yet implemented.
