---
title: Database Schema
description: An overview of the database schema used by the buncn API.
---

The `buncn` API uses a PostgreSQL database, managed with Drizzle ORM. The database connection string is configured via the `DATABASE_URL` environment variable.

The schema primarily supports authentication and user management features.

## Tables

### `user`

Stores user profile information.

| Column             | Type      | Constraints                                  | Description                                         |
|--------------------|-----------|----------------------------------------------|-----------------------------------------------------|
| `id`               | `text`    | Primary Key                                  | Unique identifier for the user.                     |
| `name`             | `text`    | Not Null                                     | User's name.                                        |
| `email`            | `text`    | Not Null, Unique                             | User's email address.                               |
| `emailVerified`    | `boolean` | Not Null, Default: `false`                   | Flag indicating if the email has been verified.     |
| `image`            | `text`    |                                              | URL to the user's profile image.                    |
| `createdAt`        | `timestamp`| Not Null, Default: `current_timestamp`       | Timestamp of user creation.                         |
| `updatedAt`        | `timestamp`| Not Null, Default: `current_timestamp`       | Timestamp of last user update.                      |
| `twoFactorEnabled` | `boolean` |                                              | Flag indicating if two-factor auth is enabled.      |

### `session`

Stores active user sessions.

| Column        | Type      | Constraints                                                  | Description                                       |
|---------------|-----------|--------------------------------------------------------------|---------------------------------------------------|
| `id`          | `text`    | Primary Key                                                  | Unique identifier for the session.                |
| `expiresAt`   | `timestamp`| Not Null                                                     | Timestamp when the session expires.               |
| `token`       | `text`    | Not Null, Unique                                             | Session token.                                    |
| `createdAt`   | `timestamp`| Not Null                                                     | Timestamp of session creation.                    |
| `updatedAt`   | `timestamp`| Not Null                                                     | Timestamp of last session update.                 |
| `ipAddress`   | `text`    |                                                              | IP address associated with the session.           |
| `userAgent`   | `text`    |                                                              | User agent string for the session.                |
| `userId`      | `text`    | Not Null, Foreign Key (`user.id`), On Delete Cascade       | ID of the user associated with the session.       |

### `account`

Links user accounts with external OAuth providers or stores other account-related credentials.

| Column                | Type      | Constraints                                                  | Description                                       |
|-----------------------|-----------|--------------------------------------------------------------|---------------------------------------------------|
| `id`                  | `text`    | Primary Key                                                  | Unique identifier for the account link.           |
| `accountId`           | `text`    | Not Null                                                     | ID from the external provider.                    |
| `providerId`          | `text`    | Not Null                                                     | Identifier for the OAuth provider (e.g., "google").|
| `userId`              | `text`    | Not Null, Foreign Key (`user.id`), On Delete Cascade       | ID of the local user.                             |
| `accessToken`         | `text`    |                                                              | Access token from the provider.                   |
| `refreshToken`        | `text`    |                                                              | Refresh token from the provider.                  |
| `idToken`             | `text`    |                                                              | ID token from the provider (for OIDC).            |
| `accessTokenExpiresAt`| `timestamp`|                                                              | Expiration time for the access token.             |
| `refreshTokenExpiresAt`| `timestamp`|                                                              | Expiration time for the refresh token.            |
| `scope`               | `text`    |                                                              | Scopes granted by the provider.                   |
| `password`            | `text`    |                                                              | Password (e.g. for credential-based providers).   |
| `createdAt`           | `timestamp`| Not Null                                                     | Timestamp of account link creation.               |
| `updatedAt`           | `timestamp`| Not Null                                                     | Timestamp of last account link update.            |

### `verification`

Stores tokens for processes like email verification or password reset.

| Column      | Type      | Constraints                                  | Description                                       |
|-------------|-----------|----------------------------------------------|---------------------------------------------------|
| `id`        | `text`    | Primary Key                                  | Unique identifier for the verification record.    |
| `identifier`| `text`    | Not Null                                     | The identifier being verified (e.g., email).      |
| `value`     | `text`    | Not Null                                     | The verification token or code.                   |
| `expiresAt` | `timestamp`| Not Null                                     | Timestamp when the verification token expires.    |
| `createdAt` | `timestamp`| Default: `current_timestamp`                 | Timestamp of verification record creation.        |
| `updatedAt` | `timestamp`| Default: `current_timestamp`                 | Timestamp of last verification record update.     |

### `twoFactor`

Stores two-factor authentication details for users.

| Column        | Type   | Constraints                                                  | Description                                       |
|---------------|--------|--------------------------------------------------------------|---------------------------------------------------|
| `id`          | `text` | Primary Key                                                  | Unique identifier for the two-factor record.      |
| `secret`      | `text` | Not Null                                                     | The secret key for TOTP generation.               |
| `backupCodes` | `text` | Not Null                                                     | Encrypted or hashed backup codes.                 |
| `userId`      | `text` | Not Null, Foreign Key (`user.id`), On Delete Cascade       | ID of the user.                                   |
