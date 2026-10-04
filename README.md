# Cineverse

Cineverse is a small React Native app that shows the next upcoming Marvel Cinematic Universe (MCU) release and the production that follows it, with the release date, a days-until-release countdown, the poster, and a short overview. It runs on Android and iOS, and on the web through React Native Web.

> Cineverse is an unofficial fan project. It is not affiliated with, endorsed by, or sponsored by Marvel Studios or The Walt Disney Company. Movie data and poster images come from a third-party API (see [External services](#external-services)).

## Features

Implemented:

- **Next and Following tabs** show the next MCU release and, when one has been announced, the following production.
- **Movie card** with poster, title, release date, overview, and a countdown badge ("N days", or "Out now" on release day).
- **Pull to refresh** reloads the data, and a retry message is shown if loading fails.
- **Accent themes**: Red, Yellow, Blue, Green, and Orange on a dark UI, selectable in Settings.
- **Settings screen** with the theme picker and a link to the in-app privacy policy.
- **Responsive layout** for phones and tablets, with a side-by-side card layout in landscape.
- **Demo mode**: tapping the "Cineverse" title five times in quick succession toggles placeholder data that does not call the API. This is useful for screenshots and offline UI work.
- **Platforms**: Android, iOS, and web (webpack + React Native Web).

Known limitations:

- The selected theme is kept in memory only and resets to Red when the app restarts.
- The app depends entirely on the third-party API being available; there is no offline cache.

Planned features: no roadmap is published yet. Feature ideas are welcome as GitHub issues (see [CONTRIBUTING.md](CONTRIBUTING.md)).

## Technology stack

| Area          | Technology                                                              |
| ------------- | ----------------------------------------------------------------------- |
| App framework | React Native 0.81 (New Architecture and Hermes enabled), React 19.1     |
| Language      | TypeScript 5.8                                                          |
| Web           | React Native Web 0.21, webpack 5, ts-loader                             |
| Android       | Gradle 8.14.3 wrapper, Kotlin 2.1.20, compile/target SDK 36, min SDK 24 |
| iOS           | CocoaPods (via Bundler), Swift `AppDelegate`                            |
| Tooling       | Jest 29, ESLint 8 with `@react-native/eslint-config`, Prettier 3.6, npm |
| CI            | GitHub Actions: formatting, lint, typecheck, tests, and the web build   |

## Repository structure

```
.
├── __tests__/                 Jest tests
├── android/                   Android native project (Gradle)
│   └── keystore.properties.example   Template for local release signing values
├── ios/                       iOS native project (Xcode workspace, Podfile)
├── screenshots/android/       Phone and tablet screenshots
├── src/
│   ├── App.tsx                App shell: screens, tabs, data loading, demo mode
│   ├── components/            MovieCard, NavBar
│   ├── contexts/              ThemeContext (selected accent theme)
│   ├── hooks/                 useResponsiveLayout (orientation and content width)
│   ├── screens/               SettingsScreen, PrivacyPolicyScreen
│   ├── services/mcuApi.ts     API client and demo placeholder data
│   ├── styles.ts              Theme-aware shared styles
│   └── theme.ts               Accent theme definitions
├── web/                       Web entry point, HTML template, webpack config
├── index.js                   Native entry point
└── package.json               Scripts and dependencies
```

## Prerequisites

- **Node.js 20 or newer** (`engines` in `package.json`). React Native 0.81 needs at least Node 20.19.4; CI uses Node 22.
- **npm** (the repository uses `package-lock.json`; please don't commit other lockfiles).
- For Android: Android Studio with the Android SDK (platform 36, build tools 36.0.0, NDK 27.1.12297006), and JDK 17.
- For iOS (macOS only): Xcode, Ruby 2.6.10 or newer, and Bundler.

Follow the official [React Native environment setup guide](https://reactnative.dev/docs/set-up-your-environment) for platform toolchains.

## Getting started

```bash
git clone <repository-url>
cd Cineverse
npm ci
```

For iOS, install the CocoaPods dependencies:

```bash
bundle install
cd ios && bundle exec pod install && cd ..
```

### Run the app

```bash
npm start            # Start the Metro bundler
npm run android      # Build and run on an Android emulator or device
npm run ios          # Build and run on an iOS simulator (macOS only)
npm run web          # Start the web dev server on http://localhost:3000
```

## Configuration

The app needs no API keys or environment variables to run. The movie API is public and is called directly from the client.

The only private configuration is **Android release signing**, which is never stored in the repository. See [Android release signing](#android-release-signing).

## Available scripts

| Command                | What it does                                  |
| ---------------------- | --------------------------------------------- |
| `npm start`            | Starts Metro                                  |
| `npm run android`      | Builds and installs the Android debug app     |
| `npm run ios`          | Builds and runs the iOS app                   |
| `npm run web`          | Starts the webpack dev server on port 3000    |
| `npm run build:web`    | Builds the production web bundle into `dist/` |
| `npm test`             | Runs the Jest tests                           |
| `npm run lint`         | Runs ESLint and fails on any error or warning |
| `npm run lint:fix`     | Runs ESLint and applies safe automatic fixes  |
| `npm run format`       | Formats files with Prettier                   |
| `npm run format:check` | Checks formatting without changing files      |
| `npm run typecheck`    | Type-checks the project with `tsc --noEmit`   |

## Building for release

### Android release signing

Release builds read four values, in this order of precedence, from:

1. `android/keystore.properties` (git-ignored),
2. Gradle properties, for example in `~/.gradle/gradle.properties` or passed with `-P`,
3. environment variables with the same names (recommended for CI).

| Name                              | Meaning                                                              |
| --------------------------------- | -------------------------------------------------------------------- |
| `CINEVERSE_UPLOAD_STORE_FILE`     | Path to the upload keystore (relative paths start at `android/app/`) |
| `CINEVERSE_UPLOAD_STORE_PASSWORD` | Keystore password                                                    |
| `CINEVERSE_UPLOAD_KEY_ALIAS`      | Key alias                                                            |
| `CINEVERSE_UPLOAD_KEY_PASSWORD`   | Key password                                                         |

To set this up locally:

```bash
cp android/keystore.properties.example android/keystore.properties
# edit android/keystore.properties with your own values
```

To create your own upload key, follow the React Native guide on [publishing to Google Play](https://reactnative.dev/docs/signed-apk-android). Keep keystores outside the repository or in a git-ignored location. Keystores, `.jks` files, and `keystore.properties` are excluded by `.gitignore`; the only tracked keystore is `android/app/debug.keystore`, a project debug key whose credentials are intentionally public.

**You don't need any of this for local or open-source builds.** If any value is missing, release builds are signed with the public debug key (`android/app/debug.keystore`, password `android`) and Gradle prints a warning. Those builds work for testing but must not be uploaded to an app store, because anyone can sign an app with that key. Debug builds always use the debug key.

```bash
cd android
./gradlew assembleRelease   # APK  (on Windows: gradlew.bat assembleRelease)
./gradlew bundleRelease     # AAB for Google Play
```

### iOS

Open `ios/Cineverse.xcworkspace` in Xcode, select your own team under **Signing & Capabilities**, and archive from Xcode. The project still uses the React Native template bundle identifier (`org.reactjs.native.example.Cineverse`), so set your own identifier before distributing.

### Web

```bash
npm run build:web
```

The static output is written to `dist/` (`index.html` and `bundle.js`) and can be served by any static file host.

## External services

Movie data comes from the public [When Is The Next MCU Film API](https://www.whenisthenextmcufilm.com/api) (`GET https://www.whenisthenextmcufilm.com/api`). It requires no API key. Poster images are loaded from the URLs that the API returns.

This is an independent third-party service: its availability, response format, and content are outside this project's control, and its terms of use apply. Please avoid making excessive automated requests to it, for example from tests or scripts; the Jest tests mock the network.

## Troubleshooting

- **"Unable to load movie data. Pull down to try again."**: the API request failed or returned an error status. Check the device's internet connection and whether the API URL above responds in a browser. You can use demo mode (tap the title five times) to keep working on the UI.
- **Metro serves stale code or cannot resolve a module**: restart it with `npm start -- --reset-cache`.
- **`SDK location not found` on Android**: set the `ANDROID_HOME` environment variable, or create `android/local.properties` (git-ignored) containing `sdk.dir=/path/to/Android/sdk`.
- **Gradle warns that release signing is not configured**: this is expected for local builds, which fall back to the debug key. Provide the four `CINEVERSE_UPLOAD_*` values described in [Android release signing](#android-release-signing) only when producing a build for distribution.
- **`pod install` fails or uses the wrong CocoaPods version**: run `bundle install`, then `bundle exec pod install` inside `ios/` so the versions pinned in the `Gemfile` are used.
- **Port 3000 is already in use for `npm run web`**: stop the other process, or run `npx webpack serve --mode development --config web/webpack.config.js --port 3001`.

## Contributing

Contributions are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for setup, coding conventions, and the checks to run before opening a pull request.

## Security

Please do not report security vulnerabilities in public issues. See [SECURITY.md](SECURITY.md) for how to report them privately.

## License

Cineverse is released under the [MIT License](LICENSE). The license covers this project's code only; movie data, posters, and Marvel trademarks belong to their respective owners.
