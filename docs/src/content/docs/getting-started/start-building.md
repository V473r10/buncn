---
title: Start building
description: Get started building your project with Buncn.
---

Buncn is a monorepo template based on Bun, Shadcn and some other tools integrated to make your life and development easier.

There's a few prerequisites to get started:

- <a href="https://git-scm.com" target="_blank">Git</a>
- <a href="https://bun.sh" target="_blank">Bun</a>
- <a href="https://www.postgresql.org" target="_blank">PostgreSQL</a>

## Integrated tools

- <a href="https://bun.sh" target="_blank">Bun</a>
- <a href="https://ui.shadcn.com" target="_blank">Shadcn/ui</a>
- <a href="https://reactrouter.com" target="_blank">React Router</a>
- <a href="https://orm.drizzle.team" target="_blank">Drizzle</a>
- <a href="https://trpc.io" target="_blank">tRPC</a>
- <a href="https://better-auth.com" target="_blank">Better Auth</a>

## Initialize your project

```bash
bun create buncn
```

### Setup environment variables

```bash
cd {project_name}
cp apps/api/.env.example apps/api/.env
```

Edit the `apps/api/.env` file to match your setup.

### Migrate database

After setting up your environment variables, pointing `DATABASE_URL` to your existing PostgreSQL database, you can migrate your database:

```bash
bun run migrate
```

Executing this command in the project root will navigate to the `apps/api` directory and run the same command there.

There, it will run the Better Auth generation script to `./src/db/auth.schema.ts` and then run the Drizzle push command to create the tables in your database.


