# Fastify + typescript

Simple, bare-bones application to sample fastify with typescript

## Requirements/Stack

- fastify
- zod
- knex
- sqlite3
- typescript
- tsx
- vitest

## How to run

```bash
npm install
npm run dev
```

## How to test

```bash
npm run test:coverage
```

## Noteworthy

- vitest doesn't accept explicit node arguments so i can't set env files for
  testing. then we need to [get creative][vitest-config-issue].

[vitest-config-issue]: https://github.com/vitest-dev/vitest/issues/6390#issuecomment-2308511419
