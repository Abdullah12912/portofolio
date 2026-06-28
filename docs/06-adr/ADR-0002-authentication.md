# ADR-0002: Authentication Strategy — Single Admin, JWT via HttpOnly Cookie

**Status:** Accepted
**Date:** 2026-06-28
**Deciders:** CTO (Rifqi Abdullah)

---

## Context

The Admin Dashboard CMS requires authentication to protect content creation and modification endpoints. The system has one and only one administrator: the portfolio owner.

We needed to decide:
1. Authentication mechanism (session-based vs. token-based).
2. Token storage strategy (localStorage vs. HttpOnly cookie).
3. Whether to support multi-user, registration, or password reset flows.

---

## Decision

**Authentication Mechanism:** JSON Web Tokens (JWT)
**Token Storage:** HttpOnly, Secure, SameSite=Strict cookie
**Admin Model:** Single pre-seeded admin account. No registration. No password reset. No user management.

---

## Rationale

### JWT over Session-Based Auth
Sessions require server-side storage (in-memory or Redis). For a single-admin system, the overhead of maintaining a session store provides no benefit over a self-contained JWT. JWTs are stateless, which simplifies the server and removes an external dependency.

### HttpOnly Cookie over localStorage
Storing JWTs in `localStorage` exposes them to XSS (Cross-Site Scripting) attacks — any injected script can read and exfiltrate the token. An `HttpOnly` cookie cannot be accessed via JavaScript, significantly reducing this attack surface. Combined with `SameSite=Strict`, CSRF attacks are also mitigated without requiring a separate CSRF token mechanism.

### Single Admin — No Registration or Password Reset
The MVP is a personal portfolio with a single owner-administrator. Adding user registration, email-based password recovery, or role management would:
- Require an SMTP server or third-party email provider.
- Introduce attack surfaces (mass registration, email enumeration).
- Add complexity that provides zero value for this use case.

The admin credentials are set once via the database seeding script and changed directly in the database if needed.

---

## Consequences

**Positive:**
- No external email service dependency.
- No CSRF token complexity (mitigated by SameSite cookie).
- No user management surface area for exploitation.
- Simple auth middleware: verify JWT signature → extract payload → allow or reject.

**Negative:**
- Admin password changes require direct database access (manual bcrypt hash update).
- Forgotten admin credentials cannot be recovered via the web interface.
- If multi-user access is ever needed, this ADR must be superseded with a new auth strategy.

---

## Implementation Notes
- Password hashed using `bcryptjs` with a salt rounds factor of `12`.
- JWT signed with `HS256` algorithm, secret stored in `JWT_SECRET` environment variable.
- Token expiry: `7d` (7 days). Admin must re-login after expiry.

---

## Status History
- `2026-06-28`: Accepted at Architecture Baseline v1.0
