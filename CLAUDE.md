# Project Overview

This repository has two layers:

- Root: the React Native boilerplate generator package, documentation, release metadata, and post-init logic.
- `template/`: the React Native app copied into newly generated projects.

## App Architecture

The template app uses Feature-Sliced Design style folders under `template/src`:

- `app` for bootstrap, providers, and navigation.
- `screens` for route-level slices.
- `widgets`, `features`, and `entities` only when reuse justifies the extra layer.
- `shared` for UI primitives, assets, API access, i18n, storage, and theme infrastructure.

## Working Conventions

- Navigation: define routes and types in `template/src/app/navigation`; import screens through slice public APIs.
- Styling: use `template/src/shared/lib/theme` with `react-native-unistyles`; avoid local theme systems.
- Translations: initialize i18n in `template/src/shared/config/i18n`; keep shared helpers in `template/src/shared/lib/i18n`.
- Reusable UI: export shared primitives from `template/src/shared/ui`.
- Tests: prefer colocated `*.test.tsx` files and wrap rendered UI with `template/src/tests/TestAppWrapper` when app providers are required.
- Dependencies: update app dependencies in `template/package.json`; root `package.json` belongs to the generator package.

## Architecture Guardrails

- Keep screen-only fetching, state, and view logic inside the screen slice until reuse appears.
- Do not add speculative `features`, `entities`, or `widgets`.
- Respect downward imports: `entities -> shared`, `features -> entities/shared`, `screens -> widgets/features/entities/shared`, and `app -> anything below`.
