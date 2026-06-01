# Repository Guide

This repository is a boilerplate generator. The root contains the generator wrapper, publishing metadata, and documentation. The runnable React Native app template lives in `template/`.

## Where To Work

- Generator and packaging concerns live at the repo root.
- The actual mobile app code lives in `template/`.
- When changing app architecture, dependencies, navigation, screens, styling, translations, or tests, work inside `template/`.

## Template Architecture

The app template uses Feature-Sliced Design with these top-level folders under `template/src`:

- `app`: bootstrap, providers, navigation container, route definitions, app tests
- `screens`: route-level slices; this repo intentionally uses `screens/` instead of canonical FSD `pages/`
- `widgets`: reusable large composed blocks only when they are shared across screens
- `features`: reusable user interactions only when they are shared
- `entities`: reusable domain concepts
- `shared`: infrastructure, design tokens, theme, assets, API client, i18n bootstrap, reusable UI

## Import Boundaries

Follow these dependency rules:

- `app` can import from `screens`, `widgets`, `features`, `entities`, `shared`
- `screens` can import from `widgets`, `features`, `entities`, `shared`
- `widgets` can import from `features`, `entities`, `shared`
- `features` can import from `entities`, `shared`
- `entities` can import only from `shared`

Additional conventions:

- Import route components from `src/screens/*` public APIs, not internal `ui/*` files.
- Import reusable shared UI from `src/shared/ui`.
- Export reusable entity behavior through `src/entities/*/index.ts`.
- Promote code to `features`, `entities`, or `widgets` only when reuse is real. Keep screen-specific logic inside the screen slice by default.

## Styling And Theme

- Use `react-native-unistyles` as the styling foundation.
- Shared theme runtime and tokens live in `template/src/shared/lib/theme`.
- Persist theme selection through `template/src/shared/lib/storage`.
- Reusable styling helpers belong in `shared`, not inside screens.

## Navigation, I18n, And Tests

- App navigation lives in `template/src/app/navigation` and uses `@react-navigation/native-stack`.
- Translation bootstrap lives in `template/src/shared/config/i18n`.
- Shared i18n helpers live in `template/src/shared/lib/i18n`.
- App and screen tests should use `template/src/tests/TestAppWrapper` unless a narrower wrapper is necessary.

## Dependency Changes

- App runtime dependency changes belong in `template/package.json`.
- Root `package.json` describes the generator package, not the generated app.
