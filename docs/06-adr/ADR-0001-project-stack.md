# ADR-0001: Technology Stack Selection

**Status:** Accepted
**Date:** 2026-06-28
**Deciders:** CTO (Rifqi Abdullah)

---

## Context

We needed to select a technology stack for a personal portfolio website and private CMS. The system has a single administrator, a small number of content types, and must remain maintainable without ongoing framework upgrades for at least 3 years.

The key constraints were:
- Single developer maintaining the project long-term.
- No complex real-time requirements.
- Prioritize speed of initial page load (performance budget).
- Avoid build-step complexity where unnecessary.

---

## Decision

| Layer | Choice | Alternatives Considered |
| :--- | :--- | :--- |
| **Frontend (Public)** | Vanilla HTML / CSS / JS | React, Next.js, Vue |
| **Frontend (Admin)** | Vanilla HTML / CSS / JS | React, Next.js |
| **Backend API** | Node.js + Express.js | Next.js (API routes), Laravel, Django |
| **Database** | PostgreSQL | MySQL, SQLite, MongoDB |
| **DB Driver** | `pg` (node-postgres) | Prisma ORM, Sequelize, Drizzle |

---

## Rationale

### Vanilla HTML/CSS/JS (Frontend)
A personal portfolio is primarily a content-delivery surface, not a complex interactive application. A framework like React adds:
- A build pipeline (Webpack/Vite) that must be maintained and upgraded.
- Hydration overhead on the initial page load.
- Framework-specific knowledge requirements for future modification.

Vanilla JS with well-organized, modular code is sufficient for the interactions required (lightbox, smooth scroll, navigation). The Design System is implemented as CSS Custom Properties, which are natively supported in all modern browsers.

### Node.js + Express.js (Backend)
Express provides the minimal surface area needed for a REST API. It is mature, stable, and requires no complex configuration for serving static files and JSON endpoints. A monolithic framework (Laravel, Django) would introduce overhead far exceeding the project's requirements.

### PostgreSQL (Database)
The content model has well-defined relational structures (albums → album_photos, albums → album_videos, profile → achievements). A relational database is the natural fit. PostgreSQL is battle-tested, supports JSONB for flexible fields (social_links, external_links), and has excellent performance for single-node deployments.

### `pg` over ORM (Drizzle, Prisma)
ORMs introduce a layer of abstraction that can mask important database behavior and generate suboptimal queries. For a project with ~10 tables and simple CRUD operations, raw SQL with `pg` pools is readable, predictable, and eliminates a dependency that may break with version upgrades.

---

## Consequences

**Positive:**
- Zero build-step for frontend means instant hot-reload during development.
- SQL queries are explicit and fully auditable.
- No hidden abstractions or framework-imposed conventions.
- Stack remains comprehensible to any future developer with basic web knowledge.

**Negative:**
- No component reactivity out of the box. Admin CMS UI state management is handled with vanilla JS DOM manipulation.
- SQL queries must be written and tested manually.

---

## Status History
- `2026-06-28`: Accepted at Architecture Baseline v1.0
