# ADR-0003: Media Storage — Local Filesystem

**Status:** Accepted
**Date:** 2026-06-28
**Deciders:** CTO (Rifqi Abdullah)

---

## Context

The portfolio system requires storage for user-uploaded media assets:
- Album cover images
- Album photos and video thumbnails
- Project cover images and gallery photos
- Profile CV/Resume PDF

We needed to decide where and how these files are stored and served.

---

## Decision

**Storage:** Local filesystem under `src/public/uploads/`
**Serving:** Express static middleware directly serves files from the uploads directory
**Upload Handler:** `multer` Node.js middleware

Directory structure:
```
src/public/uploads/
├── profiles/      ← Profile photos, resume PDFs
├── projects/      ← Project cover and gallery images
└── albums/        ← Album covers, photos, and video thumbnails
```

---

## Rationale

### Local Storage over Cloud (S3, Cloudinary, Supabase Storage)
Cloud object storage provides significant benefits at scale — redundancy, CDN delivery, image transformation. However, for a personal portfolio in MVP phase, it introduces:

- **Complexity**: SDK configuration, IAM credentials, presigned URLs.
- **Cost**: Monthly billing even at low usage (or risk of accidental cost overruns).
- **Dependency**: The site becomes unavailable for media delivery if the cloud account is locked, billing lapses, or the API changes.

A personal portfolio managed by one person, hosted on a single VPS, does not require distributed object storage in its first version. Local storage is simpler, faster to implement, and free.

### File Size and Type Constraints
To prevent abuse and server disk exhaustion:
- Maximum file size: **5MB per file**
- Accepted formats: **JPEG, PNG, WEBP** (images), **PDF** (resume only)
- Enforced at upload time by `multer` configuration on the server

### Future Migration Path
If cloud storage becomes necessary (e.g., deploying to a stateless hosting platform), migrating is a well-understood process:
1. Replace the local `multer` disk storage with `multer-s3`.
2. Update all stored file paths in the database to absolute cloud URLs.
3. Upload existing files to the cloud bucket.

This ADR will be superseded when that migration occurs.

---

## Consequences

**Positive:**
- Zero cost and zero external dependencies for media storage.
- Files served directly by Express with full control over caching headers.
- No SDK or API version management.

**Negative:**
- Files are stored on the same disk as the application — server migration requires moving both code and media.
- No built-in CDN or image transformation.
- No redundancy — disk failure loses all uploaded media without separate backup strategy.

---

## Status History
- `2026-06-28`: Accepted at Architecture Baseline v1.0
