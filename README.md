<div align="center">

# ✨ CollabAI

### AI-Powered Real-Time Collaborative Workspace

[![Live Demo](https://img.shields.io/badge/Live_Demo-Open_App-00C7B7?style=for-the-badge&logo=vercel)](https://final-milestone-saas.vercel.app/login)

**[🔗 Open Live App →](https://final-milestone-saas.vercel.app/login)**

---

*Next.js · Firebase · Google Gemini*

</div>

---

## 🌐 Overview

**CollabAI** is a modern SaaS workspace that combines **real-time collaboration** with **AI-powered features**. Create pages, generate and summarize content with AI, plan your day, and manage documents—all in one place, synced live via Firestore.

---

## ✨ Features

| Category | Features |
|----------|----------|
| **🔐 Auth** | Email/password sign-in, Google sign-in, secure sessions |
| **📄 Workspace** | Real-time collaborative pages with Firestore live sync |
| **🤖 AI** | Content generation, summarization, text improvement |
| **🗓 Planning** | AI daily planner with time & priority |
| **📋 Tasks** | Checklist generator, task history |
| **📂 Docs** | Sidebar page management, shareable page links |
| **☁️ Data** | Firestore storage, per-user data |

---

## 🏗 Tech Stack

| Layer | Technologies |
|-------|---------------|
| **Frontend** | Next.js 16 (App Router), React 19, Tailwind CSS 4, Lucide Icons |
| **Backend** | Next.js API Routes, Firebase Firestore, Firebase Auth |
| **AI** | Google Gemini API (Gemini 2.5 Flash) |

---

## 🚀 Quick Start

```bash
# Clone and install
git clone https://github.com/cleanmind777/AI-Powered-Workspace-SaaS
cd AI-Powered-Workspace-SaaS
npm install

# Configure environment (see .env.example)
cp .env.example .env.local
# Edit .env.local with your keys

# Run locally
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and sign in or register.

---

## 📁 Project Structure

```
AI-Powered-Workspace-SaaS/
├── app/
│   ├── api/ai/           # AI endpoints (generate, summarize, planner, improve)
│   ├── dashboard/        # Main dashboard
│   ├── login/            # Auth (login/register)
│   ├── page/[pageId]/    # Collaborative page editor
│   ├── dailyplanner/     # AI daily planner
│   ├── checklist/        # Checklist generator
│   └── AIEditor/         # AI-assisted editor
├── components/           # Sidebar, AIEditor, dailyplanner, checklist
├── lib/                  # Firebase, auth, firestore, pages, tasks
├── public/
├── DOC/                  # Detailed documentation
│   ├── ARCHITECTURE.md
│   └── API.md
├── .env.example
└── README.md
```

---

## 📖 Documentation

Detailed docs live in the **`DOC/`** folder:

- **[ARCHITECTURE.md](DOC/ARCHITECTURE.md)** — System design, data flow, security
- **[API.md](DOC/API.md)** — AI API endpoints, request/response formats

---

## 🔗 Links

| Link | URL |
|------|-----|
| **Live app (login)** | [final-milestone-saas.vercel.app/login](https://final-milestone-saas.vercel.app/login) |
| **Vercel** | Deploy via Vercel with env vars set |

---

<div align="center">

*Built with Next.js, Firebase & Gemini*

</div>
