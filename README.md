# FireNova Studio React Native Boilerplate

A [React Native](https://reactnative.dev/) CLI template for starting cross-platform mobile apps with a ready-to-use architecture, typed navigation, theming, i18n, API wiring, and test setup.

The template keeps application concerns separated so UI, business logic, shared infrastructure, and domain code can evolve without turning the app into a single flat source tree.

## Requirements

- Node.js 18 or newer.
- A working React Native CLI environment for your target platform.
- macOS and Xcode when building for iOS.

Follow the official [React Native environment setup](https://reactnative.dev/docs/environment-setup) guide and select the React Native CLI instructions for your operating system and target platform.

## Quick Start

Create a new app from the template:

```sh
npx @react-native-community/cli@latest init MyApp --template @firenova-studio/react-native-boilerplate
```

Start the generated app:

```sh
cd MyApp
yarn start
```

In another terminal, run the target platform:

```sh
yarn ios
# or
yarn android
```

Make sure a simulator is running or a physical device is connected before launching the platform command.

## What Is Included

- Feature-Sliced Design inspired project structure.
- React Navigation native stack setup.
- `react-native-unistyles` theme foundation.
- i18n bootstrap and shared translation helpers.
- Shared UI primitives and asset helpers.
- API client foundation with React Query.
- Jest and React Native Testing Library setup.

## Template Source

The npm package root contains the generator metadata and post-init script. The app that gets copied into new projects lives in `template/`.
