# Step 3A — Learning System Architecture

## Folder Structure

```
src/
├── app/
│   ├── api/
│   │   ├── courses/                    # Course endpoints
│   │   │   ├── route.ts                # GET /api/courses
│   │   │   └── [courseId]/
│   │   │       ├── route.ts            # GET /api/courses/:id
│   │   │       ├── navigation/route.ts # GET full sidebar tree + progress
│   │   │       └── units/route.ts      # GET /api/courses/:id/units
│   │   ├── units/[unitId]/
│   │   │   ├── route.ts
│   │   │   └── chapters/route.ts
│   │   ├── chapters/[chapterId]/
│   │   │   ├── route.ts
│   │   │   └── lessons/route.ts
│   │   ├── lessons/[lessonId]/route.ts
│   │   └── progress/
│   │       ├── route.ts                # GET overview, POST placeholder
│   │       ├── courses/[courseId]/route.ts
│   │       └── lessons/[lessonId]/route.ts
│   └── learn/                          # Learning UI (SSR pages)
│       ├── page.tsx                    # Course catalog
│       ├── [courseSlug]/page.tsx       # Redirect to first lesson
│       └── [courseSlug]/lessons/[lessonId]/page.tsx
├── components/learning/
│   ├── content-block-renderer.tsx      # Dynamic block engine
│   ├── course-sidebar.tsx              # Expandable navigation
│   ├── learning-layout.tsx             # Sidebar + main layout
│   ├── lesson-reader.tsx               # Lesson page shell
│   ├── progress-bar.tsx                # Progress UI placeholders
│   └── quiz-placeholder.tsx            # Quiz structure preview
├── lib/learning/
│   ├── course-service.ts               # Course hierarchy queries
│   └── progress-service.ts             # Progress infrastructure
└── types/learning.ts                   # DTOs & block payload types
```

## API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/courses` | List published courses |
| GET | `/api/courses/:courseId` | Single course |
| GET | `/api/courses/:courseId/navigation` | Full tree + progress |
| GET | `/api/courses/:courseId/units` | Units for course |
| GET | `/api/units/:unitId` | Single unit |
| GET | `/api/units/:unitId/chapters` | Chapters for unit |
| GET | `/api/chapters/:chapterId` | Single chapter |
| GET | `/api/chapters/:chapterId/lessons` | Lessons for chapter |
| GET | `/api/lessons/:lessonId` | Lesson + blocks + quiz |
| GET | `/api/progress` | User progress overview |
| POST | `/api/progress` | Update progress (placeholder) |
| GET | `/api/progress/courses/:courseId` | Course progress |
| GET/POST | `/api/progress/lessons/:lessonId` | Lesson progress |

All learning APIs require authentication.

## Setup

```bash
npm run db:migrate
npm run db:seed
npm run dev
```

Visit `/learn` after signing in.
