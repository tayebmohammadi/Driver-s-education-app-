# Import DMV Study Design into Figma

The **Figma MCP plugin is not connected** in this environment, so screens were exported as pixel-accurate HTML + design tokens for import.

## Option A — html.to.design (fastest, closest match)

1. Install the **[html.to.design](https://www.figma.com/community/plugin/1159128463884012350/html-to-design)** Figma plugin
2. In Figma: **Plugins → html.to.design → Import from file**
3. Import each file in `design/figma/screens/`:
   - `01-home.html` — Home hub
   - `02-journey.html` — Driver License Journey
   - `03-progress.html` — My Progress (combined)
   - `04-login.html` — Login
   - `05-series.html` — 30 Series grid
   - `06-series-detail.html` — Series detail (lessons + final exam)
   - `07-topics.html` — Study by Topic grid
   - `08-topic-detail.html` — Topic detail (lessons + mini quiz)
   - `09-qna.html` — Questions & Answers practice
4. Set frame width to **390px** (mobile) when prompted

## Option B — Connect Figma MCP (direct creation in Cursor)

1. In Cursor: **Settings → MCP → enable Figma plugin**
2. Open Figma desktop and ensure you're logged in
3. Ask the agent: *"Create Figma screens from design/figma/screens using use_figma"*

## Option C — Live app capture

If the dev server is running (`npm run dev`):

1. Open http://localhost:3000/home in Chrome
2. Use Figma plugin **html.to.design → Import from URL**
3. Capture: `/home`, `/journey`, `/progress`, `/series`, `/qna`, `/login`

## Design tokens

Import `tokens.json` manually into Figma Variables:

| Token | Hex |
|-------|-----|
| Background | `#f4f7fb` |
| Surface | `#ffffff` |
| Text | `#0f172a` |
| Muted | `#64748b` |
| Border | `#dbe3ef` |
| Primary | `#2563eb` |
| Success | `#059669` |

**Font:** Inter (Google Fonts)  
**Frame size:** 390 × 844 (iPhone 14)  
**Content max width:** 720px (hub pages)

## Screens checklist

- [x] Home (5 cards + journey banner)
- [x] License Journey (6 steps)
- [x] My Progress (study + performance + activity)
- [x] Login
- [x] Series grid (`05-series.html`)
- [x] Series detail (`06-series-detail.html`)
- [x] Study by Topic grid (`07-topics.html`)
- [x] Topic detail (`08-topic-detail.html`)
- [x] Q&A practice (`09-qna.html`)
- [ ] Certificate — import from live `/journey/certificate`

## Components to create in Figma

After import, convert repeated elements to components:

- Hub Header (back + logo + progress bar)
- Hub Card (5 color variants)
- Journey Step (complete / active / locked)
- Stat Pill
- Progress Bar
- Quiz Answer Option (default / selected / correct / wrong)
- Button (primary / secondary / sm)
