# Task Management App (Next.js App Router)

A role-based task management application built with **Next.js App Router**, **Auth.js (NextAuth)**, and **Prisma**.  
Designed with a **server-first architecture**, clean authorization boundaries, and production-style data modeling.

---

## Features

- Google OAuth authentication
- Role-Based Access Control (USER / ADMIN)
- Admin-only task creation
- Task assignment and ownership rules
- Secure, server-side data access
- Read-only task views with proper authorization
- Task status tracking (TODO / IN_PROGRESS / DONE)
- Clean Prisma + PostgreSQL schema
- Server Actions (no REST API layer)

---

## Tech Stack

- **Next.js** (App Router)
- **Auth.js (NextAuth)** – Google OAuth
- **Prisma** + PostgreSQL
- **TypeScript**
- **Tailwind CSS**
- Server Components & Server Actions

---

## Architecture Highlights

- **Server-first approach**
  - Data fetching and mutations handled on the server
  - Minimal client-side state
- **Authorization enforced at multiple levels**
  - Route-level protection via layouts
  - Resource-level checks in server actions and pages
- **Prisma Adapter setup**
  - Uses `@prisma/adapter-pg` for compatibility with Next.js App Router
- **No Express-style API routes**
  - Mutations implemented using Server Actions

---

## Role-Based Access Control (RBAC)

- **ADMIN**
  - Create tasks
  - View all tasks
- **USER**
  - View tasks they created
  - View tasks assigned to them

Authorization is enforced on the server and does not rely on client-side checks.

---

## Environment Variables

- DATABASE_URL=postgresql://...
- GOOGLE_CLIENT_ID=...
- GOOGLE_CLIENT_SECRET=...
- NEXTAUTH_SECRET=...
- ADMIN_EMAIL=youremail@example.com

---

## Getting Started

```bash
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```
