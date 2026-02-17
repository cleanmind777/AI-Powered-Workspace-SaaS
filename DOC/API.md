# CollabAI — API Documentation

All AI features are exposed as **Next.js API routes** under `/api/ai/`. Each endpoint expects a **POST** request with a JSON body and returns JSON.

**Base URL (relative):** `/api/ai/`  
**Base URL (absolute):** `https://final-milestone-saas.vercel.app/api/ai/` (when deployed)

---

## 1. Generate (Notes / Ideas)

Generates notes and ideas from a given topic using Gemini.

| Item | Value |
|------|--------|
| **Endpoint** | `POST /api/ai/generate` |
| **Body** | `{ "text": string }` |
| **Response** | `{ "result": string }` |

**Example request:**

```json
POST /api/ai/generate
Content-Type: application/json

{
  "text": "Machine learning basics"
}
```

**Example response:**

```json
{
  "result": "1. Supervised vs unsupervised learning\n2. Key algorithms: ..."
}
```

On failure, `result` may be the string `"AI generate failed"`.

---

## 2. Summarize

Summarizes the given text in simple words.

| Item | Value |
|------|--------|
| **Endpoint** | `POST /api/ai/summarize` |
| **Body** | `{ "text": string }` |
| **Response** | `{ "result": string }` |

**Example request:**

```json
POST /api/ai/summarize
Content-Type: application/json

{
  "text": "Long paragraph or article to summarize..."
}
```

**Example response:**

```json
{
  "result": "Short summary in simple words."
}
```

On failure, `result` may be `"Gemini connection failed"`.

---

## 3. Planner (Daily Schedule)

Returns a simple numbered daily schedule with time and priority (High/Medium/Low). Plain text only, no table.

| Item | Value |
|------|--------|
| **Endpoint** | `POST /api/ai/planner` |
| **Body** | `{ "text": string }` (list of tasks or description) |
| **Response** | `{ "result": string }` |

**Example request:**

```json
POST /api/ai/planner
Content-Type: application/json

{
  "text": "Meeting with team, finish report, gym, read book"
}
```

**Example response:**

```json
{
  "result": "1. 09:00 - Meeting with team (High)\n2. 11:00 - Finish report (High)\n..."
}
```

On failure, `result` may be `"Planner failed"` or `"AI could not generate schedule."`.

---

## 4. Improve (Text)

Improves clarity and professionalism of the given text.

| Item | Value |
|------|--------|
| **Endpoint** | `POST /api/ai/improve` |
| **Body** | `{ "text": string }` |
| **Response** | `{ "result": string }` |

**Example request:**

```json
POST /api/ai/improve
Content-Type: application/json

{
  "text": "we need to do the thing asap and fix the stuff"
}
```

**Example response:**

```json
{
  "result": "We need to complete the task as soon as possible and address the remaining items."
}
```

On failure, `result` may be `"AI improve failed"`.

---

## 5. Common Details

- **Authentication:** These API routes do not enforce auth in code; protect them in production (e.g. with middleware or by only calling them from authenticated app pages).
- **Model:** All endpoints use **Google Gemini 2.5 Flash** via `generativelanguage.googleapis.com`.
- **Server env:** Each route uses `process.env.GEMINI_API_KEY`. If missing, Gemini calls will fail.
- **Errors:** Failed requests still return `200` with a `result` string describing the error. Check `result` for messages like `"AI generate failed"`, `"Gemini connection failed"`, etc.

For architecture and data model, see [ARCHITECTURE.md](ARCHITECTURE.md).
