# Expo eCommerce App Starter 👋

An Expo (React Native) starter for an eCommerce app, built with Expo Router, TypeScript, and a component-driven UI. This template includes a local JSON Server for mock APIs, preconfigured Android project files, and common e-commerce screens like product listing, details, cart, and profile.

## Tech Stack

- Expo 54 (Managed workflow)
- React Native 0.81, React 19
- Expo Router for navigation (typed routes enabled)
- TypeScript (strict mode)
- Axios for HTTP requests
- React Native SVG + SVG Transformer
- Jest + `jest-expo` for testing

## Features

- Tab navigation with Expo Router under `app/(tabs)`
- Product listing, flash sales, categories, pagination, and variant selector
- Product details with dynamic route `app/product-details/[id].tsx`
- Reusable UI components (`components/*`) and theme constants (`constants/*`)
- Local mock API using JSON Server with `data/db.json`
- Android native project preconfigured under `android/`

## Getting Started

1) Install dependencies

```bash
npm install
```

2) Start the app (Expo Metro)

```bash
npm start
# or
npx expo start
```

3) Run on a device/emulator

```bash
# Android (requires Android Studio or a connected device)
npm run android

# iOS (on macOS with Xcode; not available on Windows)
npm run ios

# Web
npm run web
```

## Mock API (JSON Server)

This project uses JSON Server to serve mock endpoints from `data/db.json`.

Install JSON Server (globally or as a dev dependency):

```bash
npm install -g json-server
# or
npm install --save-dev json-server
```

Start the server (recommended port 8000):

```bash
json-server --watch data/db.json --port 8000
```

Update your API base URL in code (if applicable) to point to `http://localhost:8000`.

## Scripts

- `start`: Launch Expo dev server
- `android`: Build/run the Android app
- `ios`: Build/run the iOS app (macOS only)
- `web`: Start Expo for Web
- `test`: Run Jest tests
- `lint`: Run Expo/ESLint
- `reset-project`: Helper script (if present) under `scripts/reset-project.js`

## Project Structure

```
app/
   _layout.tsx
   index.tsx
   signin.tsx
   signup.tsx
   (tabs)/
      _layout.tsx
      index.tsx
      explore.tsx
      cart.tsx
      notifications.tsx
      profile.tsx
   product-details/
      [id].tsx
components/
   Categories.tsx, FlashSales.tsx, Header.tsx, imageSlider.tsx
   InputField.tsx, Pagination.tsx, ProductItem.tsx, ProductList.tsx
   SocialLoginButtons.tsx, TabBar.tsx, TabBarButton.tsx, VariantSelector.tsx
constants/
   Colors.ts, Icons.ts
data/
   db.json
android/
   Native Android project (Gradle, manifests, resources)
assets/
   images/, fonts/
```

Routing is powered by Expo Router (`expo-router`), with typed routes enabled in `app.json` via `experiments.typedRoutes`.

## Configuration

- App metadata and platform settings live in `app.json`.
- TypeScript config extends Expo defaults via `tsconfig.json`.
- Android package name: `com.anonymous.expoecommereceappstarter`.

## Testing & Linting

Run tests:

```bash
npm test
```

Run linter:

```bash
npm run lint
```

## Troubleshooting

- If Metro bundler misbehaves, try clearing cache: `npx expo start -c`.
- Ensure Android SDK/Emulator is installed and running for `npm run android`.
- For SVG usage, files should import correctly via `react-native-svg-transformer`.
- Windows users can run Android and Web; iOS builds require macOS with Xcode.

## Notes

- Images and icons are under `assets/images`; splash and app icons are configured in `app.json`.
- You can customize theme colors and icons in `constants/Colors.ts` and `constants/Icons.ts`.
