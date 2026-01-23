# TaskFlow

TaskFlow is a task management application built with a **server-first mindset**, focusing on correctness, clarity, and clean data flow over premature polish.

This project is intentionally developed in **phases**:

- **V1** locks in fundamentals and behavior
- **V2** introduces intentional complexity and automation

---

## Tech Stack

- **Next.js (App Router)**
- **Auth.js (NextAuth) – Google OAuth**
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
- V1 is for correctness, not impressiveness

---

## Features (V1)

### Authentication & Authorization

- Google OAuth authentication
- Role-based access control:
  - `ADMIN`
  - `USER`
- All authorization enforced server-side

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

### Due Dates

- Optional due date on tasks
- Due date must be **from tomorrow onward**
- Validation enforced server-side
- Past dates and today disabled in UI calendar

> Note: Overdue is intentionally **not** a stored status in V1.

---

### Forms & Validation

- `react-hook-form` for client-side form control
- Zod schemas shared between client and server
- Server-side validation is authoritative
- Server errors mapped back to form fields explicitly
- No reliance on client-only validation for correctness

---

### UI

- shadcn/ui components
- Tailwind for layout and spacing
- Clean, readable layouts
- Minimal animations
- No design system overengineering in V1

---

## What V1 Explicitly Does NOT Handle

These are **intentional omissions**, not oversights:

- Overdue / expired task status
- Automatic status transitions
- Background jobs / cron tasks
- Notifications
- Audit logs
- Task comments
- Assignment automation
- Dashboard analytics

V1 prioritizes **manual, explicit behavior** over automation.

---

## V2 Ideas & Notes (Planned)

These are intentionally deferred to avoid over-scoping V1.

### Task Lifecycle Enhancements

- Derived `overdue` state (computed, not stored)
- Visual indicators for overdue tasks
- Optional auto-reminders

### Comments & Collaboration

- Task comments
- Activity feed per task
- Mentions / notifications

### Admin Features

- Admin assignment UI
- Bulk task operations
- Role management improvements

### Automation

- Background jobs (cron / queues)
- Status reminders
- Due-date-based notifications

### UI Enhancements

- Dashboard overview
- Filters and sorting
- Better loading states
- Improved navigation
- Accessibility polish

---

## Why This Project Exists

This project is not a showcase of every possible feature.

It exists to demonstrate:

- Clean server-first architecture
- Realistic form handling
- Proper validation boundaries
- Thoughtful scoping
- Ability to grow without refactoring fundamentals

---

## Status

**V1: In Progress**  
Currently focused on finishing core flows and freezing behavior before adding complexity.
