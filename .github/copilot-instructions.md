# Copilot Instructions — CrowdsNow

Short, actionable guidance for AI coding agents working on this repository.

- Purpose: This is a React Native + TypeScript mobile app (monorepo-style layout with native ios/android folders). Key runtime choices: React Native 0.82.x, TypeScript, React Query, Supabase, and Zustand for local state.

- Key locations:

  - src/modules — feature modules (e.g., `events`, `profile`, `onboarding`). Put screens/components inside the module folder. Example: `src/modules/events/talent/components/TalentEventsList/TalentEventsList.tsx`.
  - src/services — API clients and integrations (see `src/services/supabase` and `src/services/reactQuery`).
  - src/components — shared UI primitives.
  - src/navigation — app navigation stacks and `AppNavigation.tsx`.
  - src/styles, src/ui — styling tokens and shared UI components.

- Aliases and resolver: imports use babel module resolver defined in `babel.config.js`. Common aliases:

  - `@assets`, `@components`, `@services`, `@modules/*`, `@styles`, `@actions`, etc. Always prefer these aliases rather than relative paths.

- Environment & secrets: `.env.local` is used via `react-native-dotenv` (configured in `babel.config.js`). Do not hardcode keys; follow existing pattern of `@env` imports.

- Supabase & types: Supabase client lives under `src/services/supabase/supabase.ts`. Types are generated into `src/services/supabase/types.ts`. Use the provided npm script to regenerate DB types:

  npm run types:generate

- Scripts & developer workflows (run from repo root):

  - `npm start` — metro bundler
  - `npm run android` — build and run Android
  - `npm run ios` — build and run iOS (requires CocoaPods install in `ios/`)
  - `npm run lint` — ESLint
  - `npm test` — Jest unit tests (tests live under `__tests__`)
  - `npm run prepare` — husky hooks

- Conventions & patterns to follow (code-searchable examples):

  - Feature modules: keep module-local components, hooks, `types.ts`, `styles.ts`, and `index.ts` re-exports in the same folder (see `src/modules/events/talent/*`).
  - Service exports: services have an `index.ts` that re-exports clients (see `src/services/supabase/index.ts`).
  - Hooks: custom hooks live under `src/hooks` and per-component hooks often live next to the component (e.g., `useTalentEventsList.ts`).
  - Styling: use tokens from `src/styles` and small `styles.ts` files per component.

- State & data-fetching:

  - Server state is primarily handled with `@tanstack/react-query` (look under `src/services/reactQuery`).
  - Local ephemeral state uses `zustand` in places — search `@store`.

- Native modules & platform specifics:

  - The app uses several native modules (camera, fast-image, vision-camera). When adding native deps, update `Podfile` and run `pod install` in `ios/`.

- CI / commits:

  - Node engine is `>=20` (see `package.json`).
  - Husky + lint-staged + commitlint are configured; follow conventional commits enforced by `commitlint.config.js`.

- When modifying API clients or DB types:

  - Update or regenerate `src/services/supabase/types.ts` using `npm run types:generate`.
  - Keep `src/services/supabase/supabase.ts` exports stable; prefer adding helper functions over changing the client surface.

- Where to look for common tasks/examples:
  - Navigation setup: `src/navigation/AppNavigation.tsx` and `src/navigation/navigationStacks`.
  - Events feature: `src/modules/events` (organization & talent flows).
  - Styles and design tokens: `src/styles` and `src/ui`.

If anything above is unclear or you need more detail (CI commands, native build tips, or coding conventions to prefer), tell me which area to expand.
