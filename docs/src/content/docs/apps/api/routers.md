---
title: Routers
description: Learn about the routers.
---

The `buncn` API uses tRPC to define its routes and procedures. The main router is `appRouter`, which is composed of several procedures for managing users and an authentication router.

## `appRouter`

The `appRouter` handles core functionalities related to users.

### Procedures

#### `userList`

*   **Type**: Query
*   **Input**: None
*   **Output**: `Promise<User[]>` - A list of user objects.
*   **Description**: Retrieves all users from the database.

#### `userByIdOrName`

*   **Type**: Query
*   **Input**: `z.object({ id: z.string().optional(), name: z.string().optional() })`
    *   `id` (optional): The ID of the user.
    *   `name` (optional): The name of the user.
*   **Output**: `Promise<User[]>` - A list of users matching the given ID or name.
*   **Description**: Retrieves users based on their ID or name. At least one of `id` or `name` should be provided.

#### `userById`

*   **Type**: Query
*   **Input**: `z.string()` - The ID of the user.
*   **Output**: `Promise<User | null | undefined>` - The user object if found, otherwise `null` or `undefined`.
*   **Description**: Retrieves a single user by their ID.

#### `userCreate`

*   **Type**: Mutation
*   **Input**: `z.object({ name: z.string() })`
    *   `name`: The name of the user to create.
*   **Output**: `Promise<User>` - The newly created user object.
*   **Description**: Creates a new user with the given name.

### Nested Routers

#### `auth`

*   **Description**: Handles authentication-related procedures. See the [Auth Router](./auth) section for more details. (Note: I will create `auth.md` or update `routers.md` further once I analyze `auth.ts`)
---
