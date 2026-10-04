# Contributing to Cineverse

Thanks for your interest in improving Cineverse. This is a small project, so the process is intentionally lightweight.

## Local setup

1. Install the prerequisites listed in the [README](README.md#prerequisites): Node.js 20.19.4 or newer, npm, and the Android and/or iOS toolchains you want to work with.
2. Clone the repository and install dependencies with npm:

   ```bash
   npm ci
   ```

3. For iOS work, install CocoaPods dependencies:

   ```bash
   bundle install
   cd ios && bundle exec pod install && cd ..
   ```

4. Start Metro with `npm start`, then run `npm run android`, `npm run ios`, or `npm run web`.

No API keys or environment variables are needed for development. Release signing is only needed if you are producing signed Android builds; see [Android release signing](README.md#android-release-signing).

## Repository layout

- `src/` contains all application code: `App.tsx` (screens, tabs, data loading), `components/`, `screens/`, `contexts/`, `hooks/`, `services/` (API client), `styles.ts`, and `theme.ts`.
- `__tests__/` contains Jest tests.
- `web/` contains the web entry point and webpack configuration.
- `android/` and `ios/` are the native projects. Most changes don't need to touch them.

## Development workflow

1. Open or find an issue describing the change, especially for larger features, so the approach can be discussed first.
2. Create a branch from `main` with a short descriptive name, for example `fix/refresh-indicator` or `feature/persist-theme`.
3. Make focused changes. Keep unrelated refactors and formatting-only changes in separate commits or pull requests.
4. Run the checks below and open a pull request against `main`.

## Code conventions

- Write TypeScript and React function components with hooks.
- Read colors from the theme (`useTheme()` and `src/theme.ts`) rather than hard-coding them, so all accent themes keep working.
- Put styles in `StyleSheet.create` objects (see `src/styles.ts` and `createMovieCardStyles` in `MovieCard.tsx`). ESLint warns about inline style objects.
- Keep network access in `src/services/`, and handle failures there so screens get either data or `null`.
- Formatting is handled by Prettier (`.prettierrc.js`), and code quality rules by ESLint (`.eslintrc.js`, based on `@react-native/eslint-config`). Don't reformat by hand or disable rules to get a check to pass; if a rule is genuinely wrong for a case, disable it on that line with a short explanation.
- Add or update tests in `__tests__/` when you change logic, such as the API client. Tests must not call the real API; mock `fetch` instead.

## Checks to run before submitting

```bash
npm run format:check   # Prettier (use `npm run format` to fix)
npm run lint           # ESLint, fails on errors and warnings (use `npm run lint:fix` for safe fixes)
npm run typecheck      # TypeScript
npm test               # Jest
npm run build:web      # Web production build
```

The same checks run in GitHub Actions on every pull request. If your change affects native code or platform behavior, please also run the app on the affected platform (Android, iOS, or web) and mention what you tested in the pull request.

## Commits and pull requests

- Write commit messages in the imperative mood with a short summary line, for example `Persist selected theme between launches`.
- Keep pull requests small enough to review in one sitting, and describe what changed, why, and how you tested it.
- Include screenshots or a short recording for visible UI changes.
- Make sure CI passes. A maintainer will review the pull request and may ask for changes.
- By submitting a pull request, you agree that your contribution is licensed under the project's [MIT License](LICENSE).

## Reporting bugs

Open a GitHub issue with:

- the platform and version (Android, iOS, or browser) and device or emulator,
- the steps to reproduce, what you expected, and what happened,
- screenshots or logs if helpful, with any personal information removed.

**Security vulnerabilities must not be reported in public issues.** Follow [SECURITY.md](SECURITY.md) instead.

## Proposing features

Open a GitHub issue describing the problem you want to solve and your proposed approach. Discussing the idea before writing a large change avoids wasted effort.

## Never commit secrets or private data

- Do not commit API keys, passwords, tokens, `.env` files, or credentials of any kind.
- Do not commit signing assets: keystores (`*.keystore`, `*.jks`), `android/keystore.properties`, certificates, provisioning profiles, or private keys. These are git-ignored; don't force-add them. The only tracked keystore is `android/app/debug.keystore`, a project debug key whose credentials are intentionally public.
- Do not commit personal data, production data, or screenshots that show private notifications, accounts, or other personal information.
- If you accidentally commit a secret, tell the maintainer privately (see [SECURITY.md](SECURITY.md)). Removing it in a later commit is not enough, because it stays in Git history and must be rotated.

## Platform notes

- **Android**: JDK 17 and the Android SDK (platform 36, NDK 27.1.12297006). Debug builds use the tracked debug keystore automatically.
- **iOS**: macOS with Xcode. Use `bundle exec pod install` so the CocoaPods version pinned in the `Gemfile` is used. Run it again after adding or updating native dependencies.
- **Web**: `npm run web` serves on port 3000. Modules resolve `.web.tsx`/`.web.ts` files before platform-neutral ones, and `react-native` is aliased to `react-native-web`.
