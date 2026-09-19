# Trails Scout Development

`trails-scout/README.md` is the intended project-local source of truth.
It is currently sparse, so this page records the important setup and development notes until that README is expanded.

## Role

`trails-scout` is a browser extension for identifying locator candidates on pages under test.
It runs in the user's browser and can inspect the application under test directly, which the main Angular frontend cannot do by itself.

## Element Screenshots

After locator validation, Scout can capture the active tab, scroll to the element, and crop a small-margin screenshot around it. The image stays in popup memory until upload and may contain sensitive content.

## Project Shape

Important areas:

| Area | Responsibility |
| --- | --- |
| `src/popup` | Extension popup UI, settings, token handling, and resource/element controls. |
| `src/content` | Content-script behavior. |
| `content-inspector.ts` | Page inspection coordination. |
| `injected-inspector.ts` | Inspector behavior injected into the page context. |
| `locator-selectors.ts` | Locator candidate logic. |
| `manifest.json` | Browser extension manifest. |

## Local Setup

Install dependencies from `trails-scout`:

```powershell
npm install
```

Run the Vite dev task:

```powershell
npm run dev
```

Build the extension:

```powershell
npm run build
```

The build output is generated under `dist`.
Generated build output should not be committed.

## Loading the Extension

During development, load the built extension into the target browser using that browser's extension developer mode.
The exact browser steps differ between Chrome, Edge, and Firefox.

After rebuilding, the browser extension may need to be reloaded in the browser's extension management page.

## Tests and Formatting

Useful commands:

```powershell
npm test
npm run test:watch
npm run test:coverage
npm run format:check
npm run format
```

The project uses Vitest and Prettier.

## Integration Notes

Trails Scout is intentionally separate from Trails Frontend.
Locator discovery needs access to the inspected page context.

Keep these boundaries clear:

- browser-extension APIs should stay localized
- locator terminology should remain consistent with Trails Service and Trails Frontend
- communication with Trails Service should be explicit and documented as it matures
- generated build artifacts should not be versioned

## Common Pitfalls

- Testing only the popup while missing content-script or injected-page behavior.
- Forgetting to reload the extension after a build.
- Reintroducing `selector` terminology where Trails now uses `locator`.
- Committing `dist` output.
- Assuming extension APIs behave identically across all browsers.
- Allowing Trails Scout integration behavior to drift away from backend/frontend models.
