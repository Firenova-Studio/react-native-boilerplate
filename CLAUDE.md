# Project Overview

This repository has two layers:

- Root: the boilerplate generator package, docs site, release metadata, and post-init wrapper logic
- `template/`: the React Native app that gets copied into generated projects

## App Architecture

The template app uses FSD-style folders in `template/src`:

- `app` for bootstrap and navigation
- `screens` for route slices
- `widgets`, `features`, `entities` only when reuse justifies them
- `shared` for UI primitives, assets, API, i18n, storage, and theme infrastructure

## Working Conventions

- Navigation: define routes and types in `template/src/app/navigation`; import screens through slice public APIs.
- Styling: use `template/src/shared/lib/theme` and `react-native-unistyles`; avoid recreating local theme systems.
- Translations: initialize i18n in `template/src/shared/config/i18n`; shared helpers belong in `template/src/shared/lib/i18n`.
- Reusable UI: export from `template/src/shared/ui`.
- Tests: prefer colocated `*.test.tsx` files and wrap rendered UI with `template/src/tests/TestAppWrapper` when app providers are required.
- Dependencies: update app dependencies in `template/package.json`; the root package is for the generator and should not be treated as the app manifest.

## Architecture Guardrails

- Keep screen-only fetching, state, and view logic inside the screen slice until reuse appears.
- Do not add speculative `features`, `entities`, or `widgets`.
- Respect downward imports: `entities -> shared`, `features -> entities/shared`, `screens -> widgets/features/entities/shared`, `app -> anything below`.
