# Enterprise Full-Stack Portfolio & Custom CMS Platform

A production-grade, highly performant **Personal Portfolio Website & Custom Headless Content Management System (CMS)** engineered with **React, Node.js/Express, PostgreSQL, Prisma ORM, and Tailwind CSS**.

---

## 🏛️ System Architecture

The application is structured into three cleanly separated subsystems:

```
                                  ┌───────────────────────────┐
                                  │   PostgreSQL (Port 5432)  │
                                  └─────────────▲─────────────┘
                                                │
                                                │ Prisma ORM
                                                │
                                  ┌─────────────▼─────────────┐
                                  │   Node/Express REST API   │
                                  │        (Port 5000)        │
                                  └───────▲───────────▲───────┘
                                          │           │
                     Public REST Endpoints│           │JWT-Guarded Admin APIs
                                          │           │
            ┌─────────────────────────────┴┐         ┌┴────────────────────────────┐
            │   Public Portfolio Frontend  │         │    Custom CMS Admin Panel   │
            │     (React + Vite : 5173)    │         │    (React + Vite : 5174)    │
            └──────────────────────────────┘         └─────────────────────────────┘
```

1. **Public Portfolio Frontend (`/frontend`)**: Responsive, dynamic Single Page Application (SPA) consuming portfolio content, projects, experience timeline, technical articles, and submitting contact inquiries to the Express backend.
2. **Backend REST API (`/backend`)**: Robust ES6 Express backend with PostgreSQL & Prisma ORM, JWT access/refresh token authentication, bcrypt password hashing, Multer image upload pipeline, Zod request validation, rate limiting, and centralized error handling.
3. **Custom CMS Admin Panel (`/admin`)**: Custom-built administrative dashboard with JWT session management, statistics telemetry, CRUD management for About, Skills, Projects, Blog posts, Experience history, Testimonials, Services, Media library, and Contact inquiries inbox.

---

## 🚀 Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Vite, Tailwind CSS, React Router 7, Axios, Lucide Icons |
| **Admin CMS** | React 18, Vite, Tailwind CSS, React Router 7, Axios, Lucide Icons |
| **Backend** | Node.js (ESM), Express.js, Prisma ORM, JWT, BcryptJS, Multer, Zod, Nodemailer, Helmet, Morgan |
| **Database** | PostgreSQL 17 (Relational Database) |

---

## 📂 Project Structure

```text
portfolio-project/
├── frontend/               # Public Portfolio Frontend
│   ├── src/
│   │   ├── components/     # Navbar, Hero, About, Skills, Projects, Experience, Services, Testimonials, BlogSection, Contact, Footer
│   │   ├── context/        # ThemeContext (Dark/Light Mode)
│   │   ├── pages/          # HomePage, BlogDetailPage, NotFoundPage
│   │   ├── services/       # api.js (Centralized Axios client)
│   │   ├── App.jsx         # Router & Theme Provider
│   │   ├── index.css       # Tailwind & Glassmorphism styles
│   │   └── main.jsx        # Entry point
│   ├── .env.example        # VITE_API_URL
│   └── package.json
│
├── backend/                # Express API & Prisma Backend
│   ├── prisma/
│   │   └── schema.prisma   # User, About, Skill, Project, Blog, Experience, Testimonial, Service, Message, Media
│   ├── src/
│   │   ├── config/         # env.js, db.js, cors.js, multer.js, email.js
│   │   ├── controllers/    # auth, about, skills, projects, blogs, experience, testimonials, services, contact, media, stats
│   │   ├── middleware/     # authMiddleware, validateMiddleware, errorMiddleware, rateLimiter
│   │   ├── prisma/         # seed.js (Database seeding script)
│   │   ├── routes/         # authRoutes, aboutRoutes, skillsRoutes, projectsRoutes, blogsRoutes, experienceRoutes, etc.
│   │   ├── uploads/        # Local disk storage for uploaded media
│   │   ├── utils/          # response.js, tokenUtils.js, slugify.js
│   │   ├── validators/     # Zod request validation schemas
│   │   ├── app.js          # Express app setup & middleware pipeline
│   │   └── server.js       # HTTP server entrypoint
│   ├── .env.example
│   └── package.json
│
├── admin/                  # Custom CMS Admin Suite
│   ├── src/
│   │   ├── components/     # Sidebar, Header, AdminLayout, ProtectedRoute, Modal, ConfirmDialog, Toast, MediaPickerModal
│   │   ├── context/        # AuthContext (JWT session management)
│   │   ├── pages/          # LoginPage, DashboardPage, AboutPage, SkillsPage, ProjectsPage, BlogsPage, ExperiencePage, TestimonialsPage, ServicesPage, MediaPage, MessagesPage, SettingsPage
│   │   ├── services/       # api.js (Axios with auto-token refresh)
│   │   ├── App.jsx         # Admin route hierarchy
│   │   └── main.jsx
│   ├── .env.example
│   └── package.json
│
├── package.json            # Monorepo orchestration scripts
└── README.md               # Full system documentation
```

---

## ⚡ Quick Start Guide

### Prerequisites
- **Node.js**: v18.0.0+ (Tested on Node.js v22.16.0)
- **PostgreSQL**: 14+ running locally on port `5432`

---

### Step 1: Clone & Configure Environment Variables

Create `.env` in `backend/`:
```env
PORT=5000
NODE_ENV=development
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/portfolio_db?schema=public"

JWT_ACCESS_SECRET="your_secure_access_secret_key_here"
JWT_REFRESH_SECRET="your_secure_refresh_secret_key_here"
JWT_ACCESS_EXPIRES_IN="15m"
JWT_REFRESH_EXPIRES_IN="7d"

CLIENT_URL="http://localhost:5173"
ADMIN_URL="http://localhost:5174"
BASE_URL="http://localhost:5000"
UPLOAD_DIR="uploads"

# Optional Email SMTP notifications:
EMAIL_HOST=""
EMAIL_PORT=587
EMAIL_USER=""
EMAIL_PASSWORD=""
EMAIL_FROM="Portfolio Contact <noreply@portfolio.local>"
EMAIL_TO="admin@portfolio.local"
```

*(Note: If your database password contains special characters like `@`, URL-encode it, e.g. `Vamsi%40123`)*

Create `.env` in `frontend/`:
```env
VITE_API_URL=http://localhost:5000/api
```

Create `.env` in `admin/`:
```env
VITE_API_URL=http://localhost:5000/api
```

---

### Step 2: Install Dependencies & Initialize Database

Run from the project root:

```bash
# Install backend, frontend, and admin dependencies
npm run install:all

# Synchronize Prisma schema with PostgreSQL
npm run db:push

# Seed the database with realistic sample portfolio content & admin user
npm run db:seed
```

---

### Step 3: Run Development Servers

Open three terminal windows or execute the respective dev commands:

```bash
# Terminal 1: Backend API (Port 5000)
npm run dev:backend

# Terminal 2: Public Portfolio Website (Port 5173)
npm run dev:frontend

# Terminal 3: Custom CMS Admin Panel (Port 5174)
npm run dev:admin
```

---

## 🔑 Default Admin Credentials

Immediately after running `npm run db:seed`, use the following default credentials to log into the Custom CMS:

- **Admin URL**: `http://localhost:5174/admin/login`
- **Email**: `admin@portfolio.local`
- **Password**: `Admin@12345`

---

## 🌐 Application URLs

| Application | URL | Purpose |
| :--- | :--- | :--- |
| **Public Portfolio** | `http://localhost:5173` | Visitor-facing responsive developer portfolio |
| **Custom CMS Studio** | `http://localhost:5174` | Administrative content management panel |
| **Express REST API** | `http://localhost:5000/api` | Backend API endpoints & media serving |
| **API Health Check** | `http://localhost:5000/api/health` | Server status and uptime verification |

---

## 📡 REST API Reference

### 1. Authentication
- `POST /api/auth/login` — Authenticate admin, returns Access & Refresh tokens.
- `POST /api/auth/refresh` — Exchange refresh token for new access token.
- `POST /api/auth/logout` — Invalidate user session.
- `GET  /api/auth/me` — *(Auth Required)* Retrieve authenticated profile.
- `POST /api/auth/change-password` — *(Auth Required)* Update admin password.

### 2. About Profile
- `GET /api/about` — Retrieve dynamic about information, bio, metrics, and social links.
- `PUT /api/about` — *(Admin Only)* Update about profile details.

### 3. Skills
- `GET    /api/skills` — List skills (optional `?category=Frontend`).
- `GET    /api/skills/:id` — Get skill by ID.
- `POST   /api/skills` — *(Admin Only)* Create new skill.
- `PUT    /api/skills/:id` — *(Admin Only)* Update skill.
- `DELETE /api/skills/:id` — *(Admin Only)* Delete skill.

### 4. Projects
- `GET    /api/projects` — List projects (supports `?featured=true` and `?search=...`).
- `GET    /api/projects/:id` — Get project by ID or slug.
- `POST   /api/projects` — *(Admin Only)* Create project.
- `PUT    /api/projects/:id` — *(Admin Only)* Update project.
- `DELETE /api/projects/:id` — *(Admin Only)* Delete project.

### 5. Blogs
- `GET    /api/blogs` — List published blog posts (supports pagination `?page=1&limit=6`).
- `GET    /api/blogs/:id` — Get blog post by ID or slug.
- `POST   /api/blogs` — *(Admin Only)* Publish new blog post.
- `PUT    /api/blogs/:id` — *(Admin Only)* Update blog post.
- `DELETE /api/blogs/:id` — *(Admin Only)* Delete blog post.

### 6. Experience Timeline
- `GET    /api/experience` — List career milestone entries.
- `POST   /api/experience` — *(Admin Only)* Add work experience entry.
- `PUT    /api/experience/:id` — *(Admin Only)* Update work experience.
- `DELETE /api/experience/:id` — *(Admin Only)* Delete work experience.

### 7. Testimonials
- `GET    /api/testimonials` — List client endorsements.
- `POST   /api/testimonials` — *(Admin Only)* Add testimonial.
- `PUT    /api/testimonials/:id` — *(Admin Only)* Update testimonial.
- `DELETE /api/testimonials/:id` — *(Admin Only)* Delete testimonial.

### 8. Services
- `GET    /api/services` — List engineering and consulting services.
- `POST   /api/services` — *(Admin Only)* Add service.
- `PUT    /api/services/:id` — *(Admin Only)* Update service.
- `DELETE /api/services/:id` — *(Admin Only)* Delete service.

### 9. Contact Inquiries
- `POST   /api/contact` — *(Public)* Submit contact form inquiry (validated and saved to PostgreSQL).
- `GET    /api/contact/messages` — *(Admin Only)* List submitted inquiries (supports `?isRead=false`).
- `GET    /api/contact/messages/:id` — *(Admin Only)* View inquiry message details.
- `PATCH  /api/contact/messages/:id/read` — *(Admin Only)* Toggle message read status.
- `DELETE /api/contact/messages/:id` — *(Admin Only)* Delete inquiry.

### 10. Media Upload Pipeline
- `POST   /api/upload/image` — *(Admin Only)* Upload image file (`multipart/form-data`). Returns accessible public URL.
- `GET    /api/media` — *(Admin Only)* List uploaded media assets.
- `DELETE /api/media/:id` — *(Admin Only)* Remove file from disk and database record.

### 11. Dashboard Analytics
- `GET /api/stats` — *(Admin Only)* Aggregated metrics (Total projects, blogs, skills, inquiries, unread counts, recent activity).

---

## 🔒 Security Hardening

- **JWT Authentication & Rotation**: Short-lived access tokens (15m) paired with rotating refresh tokens (7d).
- **Password Hashing**: Industry-standard `bcryptjs` with salt rounds.
- **Header Protection**: `helmet` headers configured with cross-origin policies.
- **Granular CORS**: Configured to restrict requests strictly to approved client and admin origins.
- **Strict Input Validation**: All input schemas validated with `zod` prior to database queries.
- **Rate Limiting**: `express-rate-limit` guards against brute-force attacks on `/api/auth` and `/api/contact`.

---

## 📦 Production Deployment

1. **Build Static Assets**:
   ```bash
   npm run build:frontend
   npm run build:admin
   ```
2. **Configure Production Database**: Set `DATABASE_URL` to production PostgreSQL cluster.
3. **Run Migrations**: `npx prisma migrate deploy`
4. **Start Production Backend**: `NODE_ENV=production node backend/src/server.js`
5. **Serve Static Frontends**: Deploy `frontend/dist` and `admin/dist` via Nginx, Vercel, Cloudflare Pages, or AWS S3/CloudFront.
