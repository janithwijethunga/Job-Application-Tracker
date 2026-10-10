# 💼 Jobright — Production Job Application Tracker & Pipeline Manager

A high-performance, full-stack job application tracking platform built with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS 4**, and **MongoDB**. Featuring an interactive Kanban interface with real-time drag-and-drop, secure authentication via Better-Auth, Cloudinary-backed document and media management with automatic legacy file cleanup, automated database seeding, and performance-tuned Server Actions.

Inspired by the [NextJS Full Course Tutorial by PedroTech](https://youtu.be/vCIsrOGNhas) and extended with enterprise cloud storage, strict cookie-size sanitization, client-side hydration guards, and production database patterns.

---

## 🌟 Key Features

- **Interactive Kanban Pipeline**: Drag and drop applications across customizable workflow stages (*Wish List*, *Applied*, *Interviewing*, *Offer*, *Rejected*) powered by `@dnd-kit` with collision detection algorithms and smooth drag overlays.
- **Enterprise Cloud Storage (Cloudinary)**:
  - **Avatars**: Automated face-detection centering, smart cropping, WebP conversion, and **automatic deletion of previous avatar assets** from Cloudinary (`jobright/avatars`) upon replacement to eliminate orphan files.
  - **Curriculum Vitae (CV) Vault**: Direct server-action streaming of raw PDF/DOCX documents to Cloudinary (`jobright/cvs`), with metadata stored in MongoDB and instant one-click download/delete support.
- **Robust Authentication**: Configured with **Better-Auth** using MongoDB native adapters, database lifecycle hooks for auto-provisioning pipelines, and cross-origin security (`trustedOrigins`).
- **Comprehensive Database Seeding**: Automated script that maps realistic sample applications directly to any user account's default board structure across all stages.
- **Performance & Scalability Guardrails**:
  - **Decoupled Binary Storage**: Zero Base64 bloat stored in MongoDB user documents, preventing session cookie overflow and eliminating slow Time To First Byte (TTFB).
  - **Connection Pooling**: Global caching of Mongoose and native MongoDB client instances to prevent connection spikes during hot reloads.
  - **SSR Hydration Resilient**: Clean primitive nesting (preventing nested `<button>` runtime DOM warnings) and hydration suppression for third-party browser extensions (Grammarly).
  - **Dynamic Route Fetching**: Direct server-side request evaluation (`await headers()`) ensuring real-time dashboard data synchronization without serving stale pre-rendered caches.
- **Pipeline Analytics**: Real-time statistical header computing total job applications, active interview stages, landed offers, and pipeline conversion rates.
- **Curated Career Launchpad**: Quick-access shortcuts to major hiring platforms (LinkedIn, Wellfound, Indeed, RemoteOK).

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework** | Next.js 16+ (App Router, Server Components & Server Actions) |
| **Language** | TypeScript |
| **Frontend & UI** | React 19, Tailwind CSS 4, Radix UI Primitives, Lucide React |
| **Drag & Drop** | `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities` |
| **Database** | MongoDB Atlas via native `mongodb` driver & Mongoose ODM |
| **Authentication** | Better-Auth (MongoDB Adapter) |
| **Media & File Storage** | Cloudinary SDK (Image Transformations & Raw Binary Deliveries) |

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

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.18 or higher (Node 20+ recommended)
- **MongoDB**: Active MongoDB Atlas cluster or local MongoDB instance
- **Cloudinary Account**: Free-tier account from [cloudinary.com](https://cloudinary.com)

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/your-username/job-application-tracker.git
cd job-application-tracker
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/jobright?retryWrites=true&w=majority

# Better-Auth Configuration
BETTER_AUTH_SECRET=your_generated_random_secret_string
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Cloudinary Storage
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

> **Note for Production:** Add your production domain to `BETTER_AUTH_URL` and `NEXT_PUBLIC_APP_URL`, and include it in the `trustedOrigins` array inside `lib/auth/auth.ts` to prevent `403 Invalid origin` errors.

---

## 🌱 Database Seeding

The repository includes a dedicated seed script (`scripts/seed.ts`) that populates your MongoDB pipeline with **15 realistic job applications** spread across all Kanban columns (Wish List, Applied, Interviewing, Offer, Rejected).

### How Seeding Works

1. Connects to your MongoDB instance using the cached database connector.
2. Identifies the user's **Job Hunt** board (or provisions it automatically if not yet created).
3. Cleans any existing applications for that user to prevent ID collisions.
4. Distributes items into the correct columns and updates parent array references.

### Running the Seed Script

Run the script by passing your logged-in user's MongoDB `_id`:

```bash
# Using the npm script with your user ID
SEED_USER_ID="your_mongodb_user_id_here" npm run seed:jobs

# Or run directly using tsx with environment variables loaded
SEED_USER_ID="your_mongodb_user_id_here" npx tsx --env-file=.env.local scripts/seed.ts
```

> **Tip:** You can find your user `_id` in your MongoDB Atlas/Compass `user` collection or directly from the session profile page.

---

## 💻 Development & Production

Run the development server:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

Build for production:

```bash
npm run build
npm run start
```

---

## 🏛️ Architecture & Implementation Notes

### 1. Cloud-Native Media Management

- **Zero Base64 in Database**: Raw Base64 binary strings are never stored in user documents. MongoDB stores only the secure Cloudinary HTTPS URL, file name, byte size, and `avatarPublicId`.
- **Automatic Asset Garbage Collection**: When updating an avatar, `uploadAvatarAction` queries the user record, identifies the previous image public ID, and calls `cloudinary.uploader.destroy(oldPublicId, { invalidate: true })` to delete the old asset from `jobright/avatars` and flush CDN caches.
- **Raw Document Streaming**: Resumes are uploaded using `resource_type: "raw"` to `jobright/cvs` to prevent PDF corruption and ensure direct file downloads using the HTML5 `download` attribute.

### 2. Database Connection Pooling

Serverless platforms create new instances on demand. `lib/db.ts` (Mongoose) and `lib/mongodb.ts` (native driver for Better-Auth) leverage `globalThis` connection caching to reuse active sockets across Server Actions and route handlers.

### 3. Drag-and-Drop Order Spacing Algorithm

Job cards within columns use a gap-ordering strategy (×100) inside `lib/actions/job-applications.ts`. Inserting a card between positions recalculates index offsets and shifts adjacent entries without triggering re-indexing cascades.

### 4. Hydration & SSR Safety

- Trigger elements inside `kanban-board.tsx` and `job-application-card.tsx` avoid invalid nested button hierarchies (`<button>` inside `<button>`), satisfying strict HTML5 DOM specifications.
- Layout-level attributes injected by browser extensions (e.g., Grammarly) are handled cleanly via `suppressHydrationWarning`.

---

## 📜 Available Scripts

| Script | Purpose |
| :--- | :--- |
| `npm run dev` | Runs the local development server at `localhost:3000` |
| `npm run build` | Compiles the production build with type checking |
| `npm run start` | Starts the production server |
| `npm run lint` | Runs Next.js ESLint verification |
| `npm run seed:jobs` | Seeds 15 mock job applications into MongoDB for a user |

---

## 📄 License

This project was built for educational and portfolio purposes, inspired by the tutorial series on YouTube. Free to use under the **MIT License**.