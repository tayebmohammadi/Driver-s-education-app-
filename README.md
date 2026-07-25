# Driver Education Platform

California DMV driver education app — theory study, 30-series curriculum, practice Q&A, driving school discovery, and instructor booking.

## Stack

- Next.js 15 (App Router) + TypeScript + React 19
- PostgreSQL + Prisma
- JWT sessions (HTTP-only cookies)
- Leaflet + OpenStreetMap (driving section map)

## Quick start

### Option A — Docker (recommended for sharing)

```bash
cp .env.example .env
docker compose up -d
npm install
npx prisma migrate deploy
ALLOW_DESTRUCTIVE_SEED=true npm run db:seed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Option B — Local PostgreSQL

Ensure PostgreSQL is running and `DATABASE_URL` in `.env` is correct, then:

```bash
cp .env.example .env
npm install
npm run db:migrate
ALLOW_DESTRUCTIVE_SEED=true npm run db:seed
npm run dev
```

Or run the all-in-one helper (macOS, downloads Node + Postgres into `.tools/`):

```bash
bash scripts/setup-local.sh
npm run dev
```

## Environment

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `JWT_SECRET` | Yes | Min. 32 characters |
| `APP_URL` | Yes | e.g. `http://localhost:3000` |
| `SMTP_*` | No | Email; links log to console if unset |
| `ENABLE_DEMO_AUTO_LOGIN` | No | Set `true` to allow auto-login outside production |
| `DEMO_STUDENT_EMAIL` | Demo only | Explicit demo account used by local auto-login |
| `ALLOW_DESTRUCTIVE_SEED` | Seed only | Must be `true` to run the destructive seed outside production |

## Demo account (after seed)

| Email | Password |
|-------|----------|
| `student@example.com` | `password123` |

## Production build

```bash
npm run build
npm start
```

If the dev server acts up after a production build, restart it with a clean cache:

```bash
rm -rf .next && npm run dev
```

## Student app

| Area | Routes |
|------|--------|
| Landing | `/` |
| Theory home | `/home` |
| 30 Series study | `/series`, `/series/[num]`, `/series/[num]/exam` |
| Topics | `/topics`, `/topics/[slug]` |
| Q&A practice | `/qna` |
| Progress | `/progress` |
| License journey | `/journey` |
| Profile | `/profile` |
| Driving / map | `/drive`, `/drive/instructors`, `/drive/about` |
| Legacy lessons | `/learn`, `/practice` |

Bottom navigation: **Theory · Driving · Profile**

## Admin

Promote a user:

```sql
UPDATE users SET role = 'ADMIN' WHERE email = 'you@example.com';
```

Admin routes: `/admin`, `/admin/courses`, `/admin/questions`, `/admin/users`

## Seed data

`ALLOW_DESTRUCTIVE_SEED=true npm run db:seed` loads:

- California Driver Education course (~46 lessons, quiz questions)
- 30 series with final exams
- Demo student account
- Achievements and practice exams

Course slug: `california-driver-education`

## API (authenticated unless noted)

- Auth: `/api/auth/register`, `/login`, `/logout`, `/me`
- Hub: `/api/home`, `/api/journey`, `/api/series`, `/api/qna`
- Drive: `/api/drive/setup`, `/api/drive/geocode`
- Progress: `/api/progress`, `/api/study-time`
