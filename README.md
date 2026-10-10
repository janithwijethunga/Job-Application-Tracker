# 💼 Jobright — Production Job Application Tracker

### Organize your job search. Track every opportunity. Move closer to your next offer.

A high-performance, full-stack job application tracking platform built with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS 4**, and **MongoDB**. Featuring an interactive Kanban interface with real-time drag-and-drop, secure authentication via Better-Auth, Cloudinary-backed document and media management with automatic legacy file cleanup, automated database seeding, and performance-tuned Server Actions.

Inspired by the [NextJS Full Course Tutorial by PedroTech](https://youtu.be/vCIsrOGNhas) and extended with enterprise cloud storage, strict cookie-size sanitization, client-side hydration guards, and production database patterns.

---


## 🎯 Overview

**Jobright** is a full-stack job application tracker designed to simplify and organize the job-hunting process.

Searching for a new job often means managing dozens of applications, remembering interview stages, tracking recruiters, and maintaining notes across different platforms.

Traditional spreadsheets can quickly become difficult to maintain as the number of applications grows.

Jobright provides a centralized workspace where job seekers can:

- Track job opportunities from initial interest to final decisions.
- Organize applications using a visual Kanban board.
- Move applications between recruitment stages with drag-and-drop.
- Store important details about companies, positions, and salaries.
- Maintain notes, job descriptions, and application links.
- Monitor application activity through a personalized dashboard.
- Securely access their own job application data.

The platform combines a modern user interface with persistent database storage and session-based authentication.

### 🌐 Live Application

Experience the application here:

**[https://jobright.janithwijethunga.me/]**

---

## ✨ Key Features

### 📋 1. Job Application Management

Manage the complete lifecycle of job applications from a single dashboard.

- **Create applications:** Add new job opportunities with relevant details.
- **Edit applications:** Update existing application information.
- **Delete applications:** Remove opportunities that are no longer needed.
- **Persistent storage:** Save application records in MongoDB.
- **Personalized data:** Associate applications with authenticated users.

### 🗂️ 2. Interactive Kanban Board

The central feature of Jobright is a visual application management board powered by **dnd-kit**.

Applications appear as cards grouped by recruitment stage.

Users can:

- Drag application cards between columns.
- Reorder applications within a column.
- Move applications using the card action menu.
- Create new applications directly inside columns.
- View application counts for each stage.
- Track changes without manually updating spreadsheets.

### 📊 3. Dashboard & Application Insights

A personalized dashboard provides quick visibility into the current job search.

Implemented dashboard metrics include:

- **Total Applications:** Number of applications stored on the user's board.
- **Active Interviews:** Applications in interview-related stages.
- **Offers Received:** Applications assigned to offer-related stages.

Metrics are calculated from the current board data, allowing the dashboard to reflect application activity.

### 🔐 4. Authentication & User Accounts

Jobright uses **Better Auth** for authentication and session management.

Supported authentication functionality includes:

- Email and password registration.
- Email and password sign-in.
- Session-based authentication.
- Sign-out functionality.
- Authenticated dashboard access.
- Automatic board initialization when a new account is created.
- User-specific application records.

Better Auth integrates with MongoDB through its MongoDB adapter.

### 📝 5. Detailed Application Cards

Each application card provides a compact overview of an opportunity.

Cards support:

- Company name and job position.
- Location information.
- Salary details.
- Technology and skill tags.
- Job description previews.
- Personal notes.
- Direct links to original job postings.
- Editing and deletion.
- Moving applications to another recruitment stage.

This enables job seekers to keep important information accessible throughout the recruitment process.

### ⚡ 6. Responsive User Experience

The application uses a modern UI architecture with:

- Responsive page layouts.
- Tailwind CSS utility classes.
- Reusable UI components.
- Accessible interface primitives.
- Lucide icons.
- Interactive dialogs and dropdown menus.
- Loading states and skeleton components.
- Light and dark interface styling.
- Client-side drag-and-drop interactions.

### 🚀 7. Optimistic Board Interactions

The Kanban interface updates local application state when users move cards.

The client then invokes a server action to persist the change.

This approach enables responsive interactions while keeping application data in MongoDB.

---

## 🛠️ Technology Stack

Jobright uses a unified **Next.js App Router** architecture, with frontend components and backend functionality in the same application.

It does not require separate Express.js or React development servers.

### Frontend

| Technology | Version | Purpose |
|---|---|---|
| [Next.js](https://nextjs.org/) | 16.3.5 | React framework and App Router |
| [React](https://react.dev/) | 19.2.8 | Component-based user interfaces |
| [TypeScript](https://www.typescriptlang.org/) | 5.x | Static typing and developer tooling |
| [Tailwind CSS](https://tailwindcss.com/) | 4.x | Utility-first styling |
| [shadcn](https://ui.shadcn.com/) | 4.21.x | UI component tooling |
| [Base UI](https://base-ui.com/) | 1.8.x | Accessible UI primitives |
| [Lucide React](https://lucide.dev/) | 1.45.x | Icon library |
| [dnd-kit](https://dndkit.com/) | 6.x / 10.x | Drag-and-drop and sorting |
| [Class Variance Authority](https://cva.style/) | 0.7.x | Component styling variants |

### Backend

| Technology | Purpose |
|---|---|
| Next.js Server Components | Server-rendered application data |
| Next.js Server Actions | Application create, update, and delete operations |
| Node.js | JavaScript server runtime |
| TypeScript | Typed server-side application logic |
| Better Auth | Authentication and session management |

### Database

| Technology | Purpose |
|---|---|
| MongoDB | Document database |
| Mongoose | Schema modeling and application data access |
| MongoDB Node.js Driver | Native MongoDB connection used by Better Auth |

### Authentication

- Better Auth
- Better Auth MongoDB adapter
- Email/password authentication
- Cookie-based sessions
- Server-side session validation

### Styling & UI

- Tailwind CSS v4
- Base UI components
- shadcn component tooling
- Lucide React icons
- `tw-animate-css`
- Geist and Geist Mono fonts

### Additional Integrations

| Technology | Purpose |
|---|---|
| Cloudinary | Included as a dependency for cloud media functionality |
| Vercel | Hosting platform used for the live deployment |
| ESLint | Static code analysis |
| PostCSS | CSS processing |
| tsx | Execution of TypeScript utility scripts |

**Note:** Cloudinary is installed as a dependency, but its complete runtime integration and configuration requirements are not established by the reviewed application paths. It is not required for the core local setup described below.

---


### Application Data Flow

**1. Authentication**

Users register or sign in through Better Auth.

**2. Board Initialization**

After successful account creation, the application initializes a default job search board and its recruitment columns.

**3. Data Retrieval**

The authenticated dashboard retrieves the user's board, populates its columns, and loads associated job applications.

**4. User Interaction**

Users create, update, delete, and move applications using React components.

**5. Server-Side Operations**

Server actions validate the user session and interact with Mongoose models.

**6. Database Persistence**

MongoDB stores application data and its relationships to boards, columns, and users.

**7. UI Refresh**

Server actions trigger dashboard revalidation after supported mutations.

---


### Important Files

| File | Responsibility |
|---|---|
| `app/page.tsx` | Public landing page |
| `app/dashboard/page.tsx` | Dashboard, board retrieval, and summary metrics |
| `components/kanban-board.tsx` | Drag-and-drop board interactions |
| `components/job-application-card.tsx` | Application cards and management dialogs |
| `components/create-job-dialog.tsx` | Job application creation form |
| `lib/actions/job-applications.ts` | Authenticated job application mutations |
| `lib/auth/auth.ts` | Authentication and user initialization |
| `lib/db.ts` | Cached Mongoose connection |
| `lib/mongodb.ts` | Native MongoDB client |
| `lib/models/` | MongoDB application schemas |
| `lib/init-user-board.ts` | Initial Kanban pipeline creation |
| `lib/hooks/useBoards.ts` | Client board state management |
| `scripts/seed.ts` | Development sample records |
| `proxy.ts` | Authentication-page redirect logic |

---



## 📁 Project Structure

```text
job-application-tracker/
├── app/
│   ├── (auth)/
│   │   ├── sign-in/page.tsx         # User authentication login
│   │   └── sign-up/page.tsx         # User registration
│   ├── api/
│   │   └── auth/[...all]/route.ts   # Better-Auth wildcard endpoint handler
│   ├── dashboard/
│   │   └── page.tsx                 # Kanban dashboard with SSR session & board query
│   ├── profile/
│   │   ├── actions.ts               # Cloudinary upload, CV management & avatar cleanup actions
│   │   └── page.tsx                 # Profile management (Name, Avatar, CV Vault)
│   ├── layout.tsx                   # Root layout with hydration mismatch guards
│   └── page.tsx                     # Landing page with interactive preview tabs
├── components/
│   ├── ui/                          # Radix / Shadcn reusable design primitives
│   ├── create-job-dialog.tsx        # Add new job application modal form
│   ├── job-application-card.tsx     # Draggable card item with quick moves & deletion
│   ├── kanban-board.tsx             # Droppable column surface & DnD orchestrator
│   └── kanban-skeleton.tsx          # Suspense fallback skeleton
├── lib/
│   ├── actions/
│   │   └── job-applications.ts      # CRUD server actions for job cards
│   ├── auth/
│   │   ├── auth.ts                  # Server-side Better-Auth instance & session getters
│   │   └── auth-client.ts           # Client-side Better-Auth methods (useSession, updateUser)
│   ├── hooks/
│   │   └── useBoards.ts             # Optimistic drag-and-drop state manager hook
│   ├── models/
│   │   ├── board.ts                 # Mongoose Board schema
│   │   ├── column.ts                # Mongoose Column schema
│   │   ├── job-application.ts       # Mongoose Job Application schema
│   │   └── models.types.ts          # Central TypeScript interfaces
│   ├── cloudinary.ts                # Cloudinary SDK client configuration
│   ├── db.ts                        # Globally cached Mongoose connection instance
│   ├── mongodb.ts                   # Globally cached native MongoClient instance
│   └── init-user-board.ts           # Post-signup automated pipeline initialization
├── scripts/
│   └── seed.ts                      # High-throughput mock data seeding script
└── public/
    └── hero-images/                 # Static landing page assets & graphics

```

---
 
**[🌐 Live Demo](https://jobright.janithwijethunga.me)** ·
**[💻 Source Code](https://github.com/janithwijethunga/Job-Application-Tracker)** ·


### Example Job Application

```json
{
  "company": "Example Technologies",
  "position": "Frontend Developer",
  "location": "Remote",
  "status": "applied",
  "salary": "$80,000 - $100,000",
  "jobUrl": "https://example.com/careers/frontend",
  "tags": [
    "React",
    "TypeScript",
    "Next.js"
  ],
  "description": "Develop responsive web applications.",
  "notes": "Applied through the company careers page.",
  "order": 0
}
```

The example illustrates application content. Database references and ownership information are managed by the application.

---

## 🔑 Environment Configuration

Environment variables store database connection information and authentication configuration.

Create a `.env.local` file in the project root.

### Example `.env.local`

```dotenv

MONGODB_URI= 
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

```

---

## ⭐ Support the Project

If you find Jobright useful, consider supporting the project by:

- Giving the repository a ⭐ on GitHub.
- Reporting bugs and suggesting improvements.
- Contributing fixes and enhancements.
- Sharing the project with other developers.

Your support helps improve the project and encourages continued development.

---

## 👨‍💻 Author

<div align="center">

### Janith Wijethunga 

**Software Developer | Full-Stack Development**

Building modern web applications with a focus on clean interfaces, maintainable code, and practical user experiences.

[![GitHub](https://img.shields.io/badge/GitHub-janithwijethunga-181717?style=for-the-badge&logo=github)](https://github.com/janithwijethunga)

</div>



<div align="center">

### 🚀 Track Smarter. Stay Organized. Land Your Next Opportunity.

**Built with Next.js, React, TypeScript, and MongoDB.**

</div>