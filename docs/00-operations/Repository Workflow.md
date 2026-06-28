# Repository Workflow SOP

This document outlines the standard operating procedure (SOP) for making modifications, verifying code, and submitting changes in this repository.

---

## 1. Development Lifecycle Flow

Every task goes through the following states:

```text
Planning
   ↓
Task Assignment
   ↓
Implementation
   ↓
Verification (Lint, Build & Run)
   ↓
Git Commit (Conventional Commits)
   ↓
Push to Origin (main branch)
   ↓
CTO Review & Sign-Off
   ↓
Next Task Selection
```

---

## 2. Planning Phase

Before modifying any code:
1.  Verify the task matches a checklist item in the current active Sprint.
2.  Identify which documentation files define the feature (e.g., sitemap, content model, database schema).
3.  Consult ADR files for architectural constraints.

---

## 3. Implementation Phase

While writing code:
1.  Use precise naming conventions as described in [AGENTS.md](file:///E:/PORTOFOLIO/AGENTS.md).
2.  Do not leave debug prints, hardcoded secrets, or dead code behind.
3.  Never add undocumented features or database tables.

---

## 4. Verification Phase

Before committing:
1.  Verify that the server boots up without exceptions using `npm start` or `npm run dev`.
2.  Open browsers to verify HTML structure, mobile viewport responsiveness, and console log errors.
3.  Check that files are staged properly using `git status`.

---

## 5. Commit Policy

We enforce strict **Conventional Commits** formatting. Commits should be granular (each commit addresses exactly one logical unit of work).

### Allowed Prefixes:
*   `feat`: A new feature (e.g., adding a page, database route, middleware)
*   `fix`: A bug fix
*   `style`: Formatting, CSS changes, styling adjustments (no logic changes)
*   `refactor`: Code changes that neither fix a bug nor add a feature
*   `docs`: Documentation only changes
*   `chore`: Updating build tasks, package configurations, or system files

---

## 6. Push & Review

1.  Push verified, committed changes to the GitHub origin `main` branch.
2.  Present the walkthrough summary of changes to the CTO.
3.  Proceed to the next task only after the CTO reviews and approves.
