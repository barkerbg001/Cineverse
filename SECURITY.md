# Security Policy

## Supported versions

Cineverse does not yet have a published release history in this repository. Security fixes are made on the `main` branch and included in the next app release. Older app versions do not receive separate patches.

| Version                     | Receives security fixes |
| --------------------------- | ----------------------- |
| Latest code on `main`       | Yes                     |
| Older releases and branches | No                      |

## Reporting a vulnerability

Please report vulnerabilities privately using GitHub's private vulnerability reporting: open the repository's **Security** tab and choose **Report a vulnerability**.

Do **not** open a public issue, pull request, or discussion for a security problem, and do not include secrets or exploit details in any public place.

## What to include

A useful report includes:

- a description of the issue and its potential impact,
- the affected platform (Android, iOS, web), app version or commit, and the affected files if known,
- steps to reproduce or a minimal proof of concept,
- any suggested fix or mitigation.

If your report involves a credential or other secret, describe where you found it (file path, commit, or build artifact) and its type, but do not paste the secret itself.

The maintainer will review reports as their time allows and coordinate a fix and disclosure with you. Please give a reasonable opportunity to address the issue before disclosing it publicly.

## Handling credentials and signing assets

- The app does not need API keys; the movie API it uses is public. Never add server-side secrets to the app code: anything bundled into the Android, iOS, or web app can be extracted by users.
- Android release signing values are read from the git-ignored `android/keystore.properties`, Gradle properties, or environment variables. They must never be written into tracked files such as `android/app/build.gradle` or `android/gradle.properties`.
- Keystores, `.jks` files, certificates, provisioning profiles, private keys, and `.env` files are git-ignored. Do not force-add them. In CI, supply signing values through encrypted secrets.
- If a credential is ever committed or exposed, treat it as compromised: rotate it, then remove it from the repository history. Deleting it in a new commit is not sufficient.
