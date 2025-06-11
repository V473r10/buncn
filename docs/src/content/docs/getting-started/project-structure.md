---
title: Project structure
description: Learn about the project structure.
---

A non exhaustive list of important folders:

```
project/
├── apps/
│   ├── api/
│   │   ├── src/
│   │   │   ├── db // Drizzle config & schemas
│   │   │   ├── lib // Utility functions
│   │   │   ├── routers // tRPC routers
│   │   ├── package.json
│   │   └── bun.lock
│   └── ui/
│       ├── src/
│       ├── package.json
│       └── bun.lock
├── packages/
│   ├── ...
├── package.json
├── bun.lock
```
