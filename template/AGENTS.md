# Repository Guide

This repository publishes a React Native boilerplate as a CLI template. The root
contains generator metadata, package configuration, documentation, and post-init
logic. The generated mobile app source lives in `template/`.

## Where to Work

- Work at the repository root for generator, publishing, and documentation
  changes.
- Work inside `template/` for the React Native app that new projects receive.
- Keep app architecture, dependencies, navigation, screens, styling, and
  translations inside `template/`.

## Template Architecture

The app template follows a Feature-Sliced Design style under `template/src`:

- `app`: app bootstrap, providers, navigation container, and route definitions.
- `screens`: route-level slices. This template intentionally uses `screens/`
  instead of canonical FSD `pages/`.
- `widgets`: large shared UI blocks, only when they are reused across screens.
- `features`: reusable user interactions, only when reuse is already present.
- `entities`: reusable domain concepts.
- `shared`: infrastructure, design tokens, theme, assets, API client, i18n
  bootstrap, and reusable UI.

## Import Boundaries

Respect these dependency directions:

- `app` can import from `screens`, `widgets`, `features`, `entities`, and
  `shared`.
- `screens` can import from `widgets`, `features`, `entities`, and `shared`.
- `widgets` can import from `features`, `entities`, and `shared`.
- `features` can import from `entities` and `shared`.
- `entities` can import only from `shared`.

Additional conventions:

- Import route components from `src/screens/*` public APIs, not from internal
  `ui/*` files.
- Import reusable shared UI from `src/shared/ui`.
- Export reusable entity behavior through `src/entities/*/index.ts`.
- Promote code to `features`, `entities`, or `widgets` only when reuse is real.
  Keep screen-specific logic inside the screen slice by default.

## Styling and Theme

- Use `react-native-unistyles` as the styling foundation.
- Keep shared theme runtime and tokens in `template/src/shared/lib/theme`.
- Persist theme selection through `template/src/shared/lib/storage`.
- Put reusable styling helpers in `shared`, not inside screens.

## Navigation, I18n, and Tests

- App navigation lives in `template/src/app/navigation` and uses
  `@react-navigation/native-stack`.
- Translation bootstrap lives in `template/src/shared/config/i18n`.
- Shared i18n helpers live in `template/src/shared/lib/i18n`.
- The template keeps Jest and Testing Library installed, but generated tests are
  only necessary when the user explicitly asks for them.

## Checks

- Always use TypeScript and lint checks for validation: run
  `yarn lint:type-check` and `yarn lint:rules` from `template/` for app changes.
- Run `yarn lint` from `template/` when touching shared architecture, config, or
  broad app surfaces.
- Do not add or run other tests unless the user explicitly asks for them.

## Dependency Changes

- App runtime dependency changes belong in `template/package.json`.
- Root `package.json` describes the generator package, not the generated app.
