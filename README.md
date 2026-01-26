# TaskFlow

TaskFlow is a task management application built with a **server-first mindset**, prioritizing correctness, explicit data flow, and long-term maintainability over premature polish.

The project is developed intentionally in **phases**:

- **V1** — lock fundamentals and behavior
- **V2** — introduce collaboration and controlled complexity

---

## Tech Stack

- **Next.js (App Router)**
- **Auth.js (NextAuth)** — Google OAuth
- **Prisma + PostgreSQL**
- **Server Actions**
- **TypeScript (strict)**
- **Tailwind CSS**
- **shadcn/ui**
- **react-hook-form + Zod**

---

## Core Principles

- Server-side authorization and validation are the source of truth
- Minimal client-side state
- Explicit data flow (no hidden magic)
- UI clarity over visual flair
- Features are added only when behavior is well understood

---

## Features

### Authentication & Authorization

- Google OAuth authentication
- Role-based access control:

  - `ADMIN`
  - `USER`

- All permissions enforced server-side

---

### Tasks

- Create task (admin only)
- Edit task (admin / creator / assignee)
- View single task with metadata
- View task list:

  - Admin sees all tasks
  - Users see assigned + created tasks

- Delete task
- Update task status:

  - `TBD`
  - `IN_PROGRESS`
  - `DONE`

---

### Due Dates & Overdue

- Optional due date on tasks
- Due date must be **from tomorrow onward**
- Validation enforced server-side
- Past dates and today disabled in UI calendar
- **Overdue is a computed state**:

  - `dueDate < today`
  - `status !== DONE`

- Overdue is **visual only**, not stored

---

### Comments (V2)

- Add comments to tasks
- Delete comments (author or admin only)
- Permissions enforced server-side
- Comment list revalidated after mutations

---

### Forms & Validation

- `react-hook-form` for client-side control
- Zod schemas shared between client and server
- Server-side validation is authoritative
- Server errors mapped back to form fields explicitly

---

### UI

- shadcn/ui components
- Tailwind for layout and spacing
- Dark mode support
- Minimal animations
- Icons for visual clarity (navbar & task metadata)

---

## What This Project Intentionally Does NOT Handle (Yet)

These omissions are **intentional**, not oversights:

- Stored overdue / late submission state
- Background jobs / cron
- Notifications
- Comment editing
- Role demotion
- Realtime updates
- Analytics dashboards

---

## Admin Capabilities

- Task creation
- Task management across users
- Comment moderation
- **Admin promotion via email (V2)**

Admin user management UI is intentionally minimal in V2.

---

## Project Status

- **V1**: Fundamentals locked
- **V2**: In progress

  - Comments
  - Computed overdue state
  - Dark mode
  - Admin promotion

V2 will be frozen once collaboration and admin flows are stable.

---

## Why This Project Exists

This is not a feature-maximized demo.

It exists to demonstrate:

- Server-first architecture
- Correct permission boundaries
- Realistic form handling
- Thoughtful scoping
- Ability to extend features without refactoring fundamentals
