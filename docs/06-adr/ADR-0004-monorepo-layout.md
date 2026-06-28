# ADR-0004: Repository Layout — Monorepo

**Status:** Accepted
**Date:** 2026-06-28
**Deciders:** CTO (Rifqi Abdullah)

---

## Context

The project consists of three distinct concerns:
1. **Public Website** — the frontend visible to all visitors.
2. **Admin Dashboard** — the private CMS frontend for the portfolio owner.
3. **Backend API** — the Express server that serves both frontends and manages the database.

We needed to decide whether to manage these as separate repositories (polyrepo) or a single unified repository (monorepo).

---

## Decision

**Monorepo:** All concerns live in a single repository under `E:/PORTOFOLIO/`.

```
PORTOFOLIO/
├── docs/           ← All project documentation
├── src/
│   ├── server/     ← Node.js Express API
│   ├── public/     ← Public website (HTML/CSS/JS)
│   └── admin/      ← Admin CMS (HTML/CSS/JS)
├── schema.sql
├── package.json
└── .env.example
```

---

## Rationale

### Monorepo over Polyrepo
A polyrepo setup (separate repos for server, public, admin) would:
- Require coordinating multiple git remotes.
- Complicate deployment (3 separate deploy processes).
- Make cross-concern refactoring (e.g., shared utility functions) awkward.
- Create version sync overhead: keeping the API compatible with both frontends when they live in separate repositories.

For a solo developer maintaining a single-domain application, the coordination cost of polyrepo provides no benefit over monorepo.

### No Build Step — Direct Static Serving
Because the frontend is written in Vanilla HTML/CSS/JS (no build step), the Express server can serve `src/public` and `src/admin` directly as static directories. There is no `dist/` folder, no compilation step, and no output artifact to manage.

### Shared Package.json
A single `package.json` at the root manages all Node.js dependencies for the server. Frontend assets have no npm dependencies — they load external resources (fonts) via CDN links in `<head>` and use no npm packages.

---

## Consequences

**Positive:**
- Single `git push` updates the entire project.
- Single deployment process — clone repo, install dependencies, run server.
- Shared configuration (`.env`, `.gitignore`) applies to all concerns.
- Documentation and code live side-by-side, reducing drift.

**Negative:**
- A single large repository may feel unwieldy if the project grows significantly beyond MVP.
- No enforced separation of access (a contributor has access to all of server, public, and admin code by default).

---

## Status History
- `2026-06-28`: Accepted at Architecture Baseline v1.0
