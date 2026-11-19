# Mock presentation layer

Everything in this directory is illustrative frontend data. It exists so the
prototype can render believable pages without a backend.

Rules:

- UI pages and the mock-only `services-query` adapter may import from this
  directory.
- Production API modules live in `lib/api/` and must never import from here.
- When the real API is available, the pages should consume `lib/api/` and this
  directory can be removed without touching transport code.
- No credentials, tokens, or real customer data belong in this directory.
