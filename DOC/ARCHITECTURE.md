# CollabAI — Architecture

This document describes the high-level architecture, data flow, and design decisions for CollabAI.

---

## 1. System Overview

CollabAI is a **client-first SPA** backed by **Firebase** (Auth + Firestore) and **Next.js API routes** for AI (Gemini). The app runs on Vercel; Firebase and Gemini keys are configured via environment variables.

```
┌─────────────────────────────────────────────────────────────────┐
│                        Browser (Client)                          │
│  Next.js App Router · React · Tailwind · Firebase JS SDK         │
└───────────────┬─────────────────────────────┬───────────────────┘
                │                             │
                │ Firebase Auth / Firestore   │ POST /api/ai/*
                ▼                             ▼
┌───────────────────────────────┐   ┌─────────────────────────────┐
│  Firebase                     │   │  Next.js (Vercel)            │
│  · Authentication             │   │  · /api/ai/generate          │
│  · Firestore (pages, tasks,   │   │  · /api/ai/summarize         │
│    permissions)               │   │  · /api/ai/planner           │
└───────────────────────────────┘   │  · /api/ai/improve           │
                                    │  (uses GEMINI_API_KEY)       │
                                    └─────────────────────────────┘
```

---

## 2. Frontend Architecture

- **Framework:** Next.js 16 with **App Router**.
- **UI:** React 19, Tailwind CSS 4, Lucide Icons.
- **Routing:**
  - `/` — Landing or redirect.
  - `/login` — Login/register (email or Google).
  - `/dashboard` — Main workspace (sidebar, page list).
  - `/page/[pageId]` — Single collaborative page (real-time editor).
  - `/dailyplanner` — AI daily planner.
  - `/checklist` — Checklist generator.
  - `/AIEditor` — AI-assisted editor.

Firebase is used **directly from the browser** for Auth and Firestore (no custom backend for CRUD). AI features call **Next.js API routes**, which call the Gemini API server-side so the API key stays secret.

---

## 3. Backend & API Layer

- **Firebase (client):** All auth and Firestore access (pages, tasks, permissions) happen from the client using the Firebase JS SDK.
- **Next.js API (server):** Only AI features use the server. Four routes under `app/api/ai/`:
  - `generate` — Generate notes/ideas from a topic.
  - `summarize` — Summarize text.
  - `planner` — Daily schedule with time and priority.
  - `improve` — Improve clarity and tone of text.

All four use **Gemini 2.5 Flash** and require `GEMINI_API_KEY` in the environment.

---

## 4. Data Model (Firestore)

| Collection   | Purpose | Main fields |
|-------------|---------|-------------|
| **pages**   | Workspace pages (documents) | `title`, `content`, `ownerId`, `updatedAt` |
| **tasks**   | Tasks linked to a page | `pageId`, `title`, `dueDate`, `status` |
| **permissions** | Page-level access | `pageId`, `userId`, `role` |

- **pages:** One document per page; `content` is the main editable body (e.g. rich text or markdown). Real-time sync is done via Firestore `onSnapshot` on the page document.
- **tasks:** Query by `pageId` to show tasks for a given page; `status` (e.g. pending/done) can be updated.
- **permissions:** Used to resolve `getUserRole(pageId, userId)` (e.g. viewer vs editor). Default is viewer if no permission doc exists.

---

## 5. Authentication Flow

1. User visits `/login` (or is redirected there when not authenticated).
2. **Email/password:** `loginWithEmail` / `registerWithEmail` (Firebase Auth).
3. **Google:** `loginWithGoogle` (Firebase Auth with Google provider).
4. On success, redirect to `/dashboard`. Auth state is observed via Firebase `onAuthStateChanged` (or equivalent); protected routes check this before rendering.

No custom token or session server: Firebase Auth handles sessions and ID tokens.

---

## 6. Real-Time Collaboration

- **Page content:** The client subscribes to the current page document with `onSnapshot(doc(db, "pages", pageId))`. Local edits are written with `updateDoc` to the same document. Firestore merges updates and broadcasts changes to all subscribed clients, so everyone sees updates in real time.
- **Concurrency:** Last-write-wins at the document level. For heavy concurrent editing, consider operational transforms or CRDTs in a future iteration.

---

## 7. Security Considerations

- **API key:** `GEMINI_API_KEY` is only used in Next.js API routes (server), never exposed to the client.
- **Firebase:** Auth and Firestore Security Rules must restrict reads/writes (e.g. by `request.auth.uid`, `ownerId`, or `permissions`). The app assumes rules enforce that users can only read/write pages and tasks they are allowed to access.
- **Client-side Firebase config:** If you move Firebase config to env vars, use `NEXT_PUBLIC_*` only for non-secret config (e.g. `apiKey`, `projectId`). Never put secret keys in `NEXT_PUBLIC_*`.

---

## 8. Deployment (Vercel)

- Build command: `next build` (or default).
- Environment variables: Set `GEMINI_API_KEY` (and optionally Firebase env vars) in the Vercel project.
- Live URL: [https://final-milestone-saas.vercel.app/login](https://final-milestone-saas.vercel.app/login)

---

## 9. Folder Structure (Summary)

| Path | Role |
|------|------|
| `app/` | Routes, layouts, API routes |
| `app/api/ai/*` | Gemini-backed AI endpoints |
| `components/` | Reusable UI (sidebar, AIEditor, planner, checklist) |
| `lib/` | Firebase init, auth helpers, firestore helpers, pages, tasks, permissions |

For API request/response details, see [API.md](API.md).
