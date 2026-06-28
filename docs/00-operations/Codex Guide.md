# Codex Guide — Agent Onboarding and Task Execution

This guide provides steps for AI Agents (like Codex and Antigravity) to onboard, boot up the local dev environment, execute tasks, and verify their work.

---

## 1. Quick Start

Run these commands to verify the environment and start the development server:

```bash
# 1. Pull latest code from the remote
git pull

# 2. Install dependencies
npm install

# 3. Create .env if it does not exist
# Copy the template from .env.example and populate values
cp .env.example .env

# 4. Start the local server in development mode (with nodemon)
npm run dev
```

The server is available at:
*   Public Portfolio: `http://localhost:3000`
*   Admin CMS: `http://localhost:3000/admin`

---

## 2. Formatting Prompt Instructions

When requesting Codex or Antigravity to perform tasks, prompts should clearly reference files and follow the context boundaries:

1.  **Read Onboarding First:** "Read [AGENTS.md](file:///E:/PORTOFOLIO/AGENTS.md) first to align on project principles."
2.  **Point to Specific Sprint Docs:** "Refer to [Sprint 1.md](file:///E:/PORTOFOLIO/docs/04-implementation/Sprint%201.md)."
3.  **Specify Target Files:** "Modify [main.js](file:///E:/PORTOFOLIO/src/public/js/main.js)."
4.  **Confirm Boundaries:** "Do not add any additional endpoints, dependencies, or CSS properties outside the design system."

---

## 3. Task Execution Checklist

Before finishing any task, the AI agent must run through this checklist:

*   [ ] **Linting & Code Quality:** Check code conforms to formatting and naming standards. Run `npm run lint`.
*   [ ] **Server Running:** Test if the local Express server starts correctly and routes are responsive.
*   [ ] **No Scope Creep:** Verify that no undocumented features have been sneakily added.
*   [ ] **Git Commits:** Make small, granular commits using Conventional Commits guidelines.
*   [ ] **Documentation Check:** Do not modify frozen documents unless specifically approved by the CTO.
