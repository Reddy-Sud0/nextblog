# NextBlog - Next.js + Redux Blog Application

Built as a developer assignment project to demonstrate a production-style blog application with authentication, protected routes, SSR pages, Redux Toolkit state management, and Redux-Saga side effects.

---

## Point-by-Point Delivery Status

### ✅ What has been implemented

- Modern multi-page UI:
  - Home (`/`)
  - About (`/about`)
  - Contact (`/contact`)
  - Blog list (`/blog`)
  - Blog detail with comments (`/blog/[id]`)
  - Login (`/login`)
  - Signup (`/signup`)
  - Protected dashboard (`/dashboard`)
- Redux Toolkit store with slices for auth, posts, and comments.
- Redux-Saga flows for login/logout, posts fetch, and comments fetch.
- Axios API layer with request interceptor for auth token.
- Auth persistence using `localStorage` and cookie integration for middleware-protected dashboard route.
- Route protection via `middleware.ts` (redirects unauthenticated users from dashboard to login).
- Metadata support on blog detail pages.
- App-level loading, error, and not-found pages.
- Dark mode toggle in navigation.
- Build/lint validation passing locally (`npm run lint`, `npm run build`).

### 🚧 What is partially implemented (with explanation)

- Signup backend flow:
  - UI exists, but persistent real registration is not fully wired.
  - Reason: DummyJSON has limitations for realistic long-lived signup/login flow.
- Dashboard analytics/actions:
  - Current dashboard includes modern cards and mock activity/action data.
  - Reason: real analytics backend/data pipeline was out of scope.
- Full assignment parity for advanced extras:
  - Some advanced features from the long checklist (e.g., exhaustive reusable component library, full pagination/search UX polish everywhere) are represented in simplified form.
  - Reason: prioritized stable core functionality and deploy readiness.

### ❌ What could not be fully implemented (with reasons)

- Real persistent CRUD for posts/comments:
  - Reason: DummyJSON simulates API behavior and does not persist full production data lifecycle.
- Complete production auth system (refresh tokens, role APIs, account lifecycle):
  - Reason: no dedicated custom backend in this assignment.
- Google Doc sharing from agent:
  - Reason: external account operations (Google Drive sharing permissions) require your manual login/action.

---

## Repository and Live Links

- GitHub Repository: [https://github.com/Reddy-Sud0/nextblog](https://github.com/Reddy-Sud0/nextblog)
  - Note: keep the repository private and grant reviewer access as needed.
- Netlify Live Demo: [https://next-saga-blog.netlify.app/](https://next-saga-blog.netlify.app/)
- Vercel Live Demo: Add your Vercel deployment URL here
- GitHub Pages: Not recommended for Next.js SSR app (can be listed as N/A)
- Other hosting platform (optional): Add URL if deployed

---

## Project Description

NextBlog is a modern blog web app built with Next.js 14 App Router and TypeScript.  
It combines SSR content pages with client-side authenticated dashboards, and uses Redux Toolkit + Redux-Saga for predictable state and async flow handling.

---

## Setup Instructions (Local)

### Prerequisites

- Node.js 18+ (Node 20+ recommended)
- npm

### Installation and Run

```bash
git clone https://github.com/Reddy-Sud0/nextblog.git
cd nextblog
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`

### Production Build Check

```bash
npm run lint
npm run build
```

---

## Technologies Used

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Redux Toolkit
- Redux-Saga
- React-Redux
- Axios
- next-themes

---

## Features Implemented (Checklist)

- [x] Home page with modern hero section
- [x] About page
- [x] Contact form page (UI flow)
- [x] Blog list page (SSR data fetching)
- [x] Blog detail page with comments
- [x] Login page with API auth flow
- [x] Signup page UI
- [x] Dashboard page (protected)
- [x] Middleware-based route protection
- [x] Redux Toolkit store and slices
- [x] Redux-Saga async side effects
- [x] Axios client and token interceptor
- [x] Dark mode toggle
- [x] Custom loading, error, and not-found pages

---

## Screenshots / GIFs

Add screenshots or GIFs in this section:

- Home page
- Blog list
- Blog detail
- Login flow
- Dashboard
- Dark mode

Example markdown:

```md
![Home](./docs/screenshots/home.png)
![Login](./docs/screenshots/login.png)
```

---

## Challenges Faced and Solutions

- Next.js + Saga client bootstrapping:
  - Solved by centralizing provider setup and starting saga middleware once.
- Route protection in App Router:
  - Solved by middleware token check and redirect flow.
- Deployment lint failures:
  - Solved by removing unused imports and validating with local lint/build before redeploy.
- Balancing assignment breadth vs quality:
  - Solved by prioritizing stable core flows and modern UI consistency first.

---

## Future Improvements

- Add real backend (Supabase/Node API) for persistent CRUD.
- Implement full signup/account lifecycle.
- Add unit + integration tests (Jest/RTL + Playwright).
- Add richer dashboard analytics from real data.
- Expand search/filter/pagination UX with reusable component library.
- Add CI pipeline for lint/build/test on pull requests.
