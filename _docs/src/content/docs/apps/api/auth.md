---
title: Auth Router
description: Learn about the authentication router and its procedures.
---

The `authRouter` handles all authentication-related procedures within the `buncn` API.

## Procedures

### `viewBackupCodes`

*   **Type**: Query
*   **Input**: `z.object({ userId: z.string() })`
    *   `userId`: The ID of the user for whom to retrieve backup codes.
*   **Output**: `Promise<string[]>` - An array of backup codes.
*   **Description**: Retrieves the backup codes associated with the specified user ID. This is useful for account recovery purposes.
