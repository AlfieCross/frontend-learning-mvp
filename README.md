# Frontend Learning (MVP)

A tiny, framework‑free web app to **learn frontend by doing**. Includes a sidebar app shell, localStorage progress, micro‑lessons, a code runner, a quiz, and basic theming.

## 🚀 Quick start
1. Download and unzip this project.
2. Open `index.html` in your browser.
3. Navigate with the sidebar. Your progress saves automatically.

> No build tools or servers required. Pure HTML/CSS/JS.

## ✨ Features (MVP)
- Routing via URL hash (`#/route`)
- Light/Dark theme (persists in `localStorage`)
- Learn modules (HTML/CSS/JS) with completion checkboxes
- Challenges page with an **in‑page HTML/CSS/JS runner**
- Quizzes with instant feedback and score storage
- Progress page with **export/import** (JSON)
- Accessible semantics + focus management

## 🗂️ File structure
```
frontend-learning-mvp/
├─ index.html      # App shell and landmarks
├─ styles.css      # Design tokens, layout, components, responsive rules
├─ app.js          # Router, views, localStorage, quiz engine, runner
└─ README.md
```

## 🧑‍💻 Development workflow
Recommended Git history (copy/paste as you work):

```bash
git init
git add .
git commit -m "feat(shell): add app frame, routing, and theme toggle"

# (Optional) tweak styles, then:
git add styles.css
git commit -m "style(ui): polish cards, focus states, responsive sidebar"

# Add lessons content
git add app.js
git commit -m "feat(learn): add html/css/js micro-lessons with completion"

# Add code runner challenges
git add app.js
git commit -m "feat(challenges): add in-page HTML/CSS/JS runner and reset"

# Add quiz engine + explanations
git add app.js
git commit -m "feat(quizzes): add HTML basics quiz with scoring and review"

# Add progress export/import
git add app.js
git commit -m "feat(progress): add export/import and summary"

# Docs
git add README.md
git commit -m "docs: add README with setup and roadmap"
```

## 🌐 Deploy to GitHub Pages
```bash
# create repo on GitHub first (empty)
git remote add origin https://github.com/USERNAME/frontend-learning-mvp.git
git branch -M main
git push -u origin main

# Enable GitHub Pages: Settings → Pages → Source = Deploy from a branch → main /(root)
```

## ♿ Accessibility checklist (MVP)
- Landmarks: `<aside>`, `<main>`, `<nav>`
- `aria-current="page"` on active nav link
- Move focus to `#app` on route change
- Visible focus outlines on interactive elements
- `aria-live="polite"` on main content
- Reduced motion support can be added later

## 🗺️ Roadmap (next)
- Add real lesson content + examples
- 3 documented challenges with pass criteria (track completion)
- CSS & JS quizzes
- Badges & streak logic (daily goal)
- Import/Export settings + progress visualization
- Project briefs with rubrics + links to templates

---

© 2025-08-20 Alfie Cross. MIT License.
# frontend-learning-mvp
