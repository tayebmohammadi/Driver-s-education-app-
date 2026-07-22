# California Driver Education — Curriculum

Structured learning content derived **exclusively** from:

**California Driver's Handbook (DL 600, Rev. 6/2025)**  
Source file: `8-11-25-DL-600-R6-2025-WWW.pdf`

## Seed the database

```bash
npm run db:seed
```

## Data location

```
prisma/data/
├── types.ts                          # Curriculum TypeScript types
└── california/
    ├── index.ts                      # Course export
    ├── units-01-03.ts                # Sections 1–3
    ├── units-04-07.ts                # Sections 4–6
    ├── unit-07-laws.ts               # Section 7 (full)
    ├── units-08-10.ts                # Sections 8–10
    └── units-11-13.ts                # Sections 11–13
```

## Course structure

| Unit | Handbook Section | Topic |
|------|-------------------|-------|
| 1 | Section 1 | The California Driver's License |
| 2 | Section 2 | Instruction Permit & Driver's License |
| 3 | Section 3 | The Testing Process |
| 4 | Section 4 | Changing, Replacing, Renewing License |
| 5 | Section 5 | Introduction to Driving |
| 6 | Section 6 | Navigating the Roads |
| 7 | Section 7 | Laws and Rules of the Road |
| 8 | Section 8 | Safe Driving |
| 9 | Section 9 | Alcohol and Drugs |
| 10 | Section 10 | Financial Responsibility & Collisions |
| 11 | Section 11 | Vehicle Registration |
| 12 | Section 12 | Driver Safety |
| 13 | Section 13 | Seniors and Driving |

Each lesson includes:
- Structured content blocks (headings, paragraphs, callouts, checklists, quotes)
- 3–5 DMV-style multiple choice / true-false questions with handbook-based explanations

## JSON export

To export curriculum as JSON for external use:

```bash
npx tsx prisma/scripts/export-curriculum-json.ts
```

Output: `prisma/data/california-handbook.json`
