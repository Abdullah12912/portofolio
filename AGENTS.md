# AGENTS.md — Entry Point for AI Coding Agents

Welcome, AI Coding Agent. You are pair-programming with the user (CTO). Read this file before any action.

---

## 1. Project Identity & Scope

*   **Project Name:** Personal Portfolio Website with Admin CMS
*   **Product Vision:** A minimalist, highly aesthetic digital archive representing Rifqi Abdullah's journey as a student, photographer, developer, and writer.
*   **MVP Boundary (Decision #006):** No search, tags, likes, comments, view counters, analytics, RSS, multi-language, AI helpers, multi-user permissions, notifications, scheduling, or publication workflows.

---

## 2. Architecture & Tech Stack

*   **Frontends:** Vanilla HTML, CSS, JavaScript (zero build steps, directly served).
*   **Backend:** Node.js + Express.js API.
*   **Database:** PostgreSQL (with raw SQL queries via `pg` pool; no ORM).
*   **Authentication:** Single admin account. JWT stored in `HttpOnly`, Secure, `SameSite=Strict` cookie.
*   **Storage:** Local filesystem under `src/public/uploads/` managed by `multer`.

---

## 3. Directory Layout

```text
PORTOFOLIO/
├── docs/               ← Project documentation (00-operations, 01-product, etc.)
│   ├── 00-operations/  ← Operation workflows, run guides
│   ├── 01-product/     ← Product specs, content model, sitemaps
│   ├── 02-design/      ← Design system rules
│   ├── 03-architecture/← Backend, database schema, API designs
│   ├── 04-implementation/ ← Sprints 1 to 3
│   ├── 05-engineering/ ← Development guidelines
│   └── 06-adr/         ← Architecture Decision Records (ADRs 0001-0004)
├── src/
│   ├── server/         ← Node.js Express Backend
│   ├── public/         ← Public Website frontend (served statically)
│   └── admin/          ← Admin CMS frontend (served statically under /admin)
├── schema.sql          ← Database Schema DDL
├── package.json
└── AGENTS.md           ← This file
```

---

## 4. Documentation Hierarchy

```text
Product Vision & Sitemap (docs/01-product/)
          ↓
Content Model (docs/01-product/Content Model.md)
          ↓
Architecture & Database DDL (docs/03-architecture/ & schema.sql)
          ↓
API Specification (docs/03-architecture/API.md)
          ↓
Implementation Plan & Sprints (docs/04-implementation/)
```
*Crucial:* Lower-level specifications must not contradict higher-level ones.

---

## 5. Development Principles

1.  **KISS (Keep It Simple, Stupid):** Write explicit code. Avoid over-engineering.
2.  **DRY (Don't Repeat Yourself):** Share common frontend components/CSS rules and backend middleware.
3.  **YAGNI (You Aren't Gonna Need It):** Implement only what is in the current Sprint.
4.  **Content-First:** Structure layouts and APIs around the frozen fields in the Content Model.
5.  **Mobile-First & Fluid Layouts:** Design for screens first, scale up gracefully using CSS variables.
6.  **Performance Budget:** Avoid JS bloat. Keep static pages fast.

---

## 6. Coding & Git Rules

*   **Commit Message Format:** Must follow Conventional Commits (e.g., `feat: ...`, `fix: ...`, `style: ...`, `docs: ...`, `chore: ...`).
*   **Granularity:** One logical change = one commit. Do not combine multiple separate tasks into one commit.
*   **Safety Checks:** Run linting/build and verify local servers run correctly before suggesting commits.
*   **Scope Discipline:** Never implement a feature unless it is explicitly specified in the approved implementation plan.
*   **Naming Conventions:**
    *   Database tables & columns: `snake_case`
    *   JS/JSON/APIs: `camelCase`
    *   React/Frontend Components (if any): `PascalCase`
    *   CSS classes & filenames: `kebab-case`
    *   Environment variables: `UPPER_SNAKE_CASE`

---

---

## 7. Permanent Architecture Decisions (CTO Decisions)

1.  **CTO Decision #017 — Service Layer Independence:** Services must remain framework-agnostic and must not import or depend on HTTP request, response, or Express objects.
2.  **CTO Decision #018 — Parameterized SQL Queries:** All database queries must use parameterized statements to prevent SQL injection.
3.  **CTO Decision #024 — Slug Immutability:** Once a project, album, or article is created, its URL slug is immutable and cannot be updated.
4.  **CTO Decision #025 — File Lifecycle:** When an upload file (e.g. project cover image) is replaced or deleted, the old file must be deleted from the filesystem immediately.
5.  **CTO Decision #026 — Centralized Upload Cleanup:** File cleanups upon request/validation failures must reside in centralized error handler middleware, never in validators.
6.  **CTO Decision #027 — Album Ownership:** Photos and videos are owned by a single album. Deleting an album must cascade delete its records and all physical files from disk.
7.  **CTO Decision #028 — Service Returns Domain Data Only:** The service layer should only return domain data/results. The controller remains responsible for HTTP orchestration.

---

## 8. Next Step Reference
For onboarding instructions, refer to [Codex Guide](file:///E:/PORTOFOLIO/docs/00-operations/Codex%20Guide.md).
For team workflow guidelines, refer to [Repository Workflow](file:///E:/PORTOFOLIO/docs/00-operations/Repository%20Workflow.md).
