# TerpFinance

> A personal finance and budgeting web app designed for college students, taking money management from overwhelming to approachable.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## Overview

TerpFinance helps students track spending, set budgets, and plan toward savings goals without needing a finance background. It was taken from customer discovery through an MVP: we interviewed students, translated their needs into personas and user stories, designed the flows in Figma, and built out a working front-end prototype.

The app is a multi-page client-side experience with no backend required, data persists in the browser, so you can try every feature immediately.

## Features

- **Transaction tracking** — add income and expenses with a name, amount, type, and category; view recent activity or the full history, and delete with a confirmation step. Transactions persist in `localStorage`.
- **Budgets** — a main weekly budget with a live progress bar, plus short-term and long-term (savings) budgets. Cards change color as you approach or exceed a limit (on track, near limit, over budget), and every budget is editable and deletable.
- **Persona-based profiles** — tailored profile presets for different life stages (High School Student, College Student, Salary Worker, Freelance Worker, Retiree), each capturing the income and expense fields that matter for that persona.
- **Analytics view** — an overall trend summary (net gain/loss, estimated time to savings goal) with a visualization panel that toggles between line-graph and pie-chart views across Week / Month / Year / All-Time ranges.
- **Touch-friendly UI** — an on-screen keyboard surface appears on input focus, designed with a kiosk/touch prototype in mind.

## Tech Stack

| Area | Technology |
|------|------------|
| Structure | HTML5 (multi-page) |
| Styling | CSS3 |
| Logic | Vanilla JavaScript (no framework) |
| Persistence | Browser `localStorage` and `sessionStorage` |

> This is an MVP/prototype: it runs entirely on the front end. Analytics visualizations are presented as designed chart views, and the app ships with sample data so the experience is explorable out of the box.

## Project Structure

```
TerpFinance/
├── index.html         # Home: recent transactions + add/delete flow
├── budget.html        # Budgets: main, short-term, and long-term goals
├── analytics.html     # Trends summary + chart visualization toggle
├── profile.html       # Persona-based financial profiles
├── calendar.html      # Calendar view
├── css/               # Stylesheets (home, styles, etc.)
├── js/
│   ├── transactions.js # Transaction logic + localStorage persistence
│   └── main.js         # Budgets, profiles, analytics toggle logic
└── Icon-Images/       # Icons and chart/visualization assets
```

## Getting Started

TerpFinance is a static site, no build step or dependencies required.

```bash
# Clone the repo
git clone https://github.com/Potlur1/TerpFinance.git
cd TerpFinance
```

Then either:

- **Open `index.html` directly** in your browser, or
- **Serve it locally** (recommended, avoids any browser file restrictions):
  ```bash
  # Python 3
  python -m http.server 8000
  # then visit http://localhost:8000
  ```

You can also host it for free on **GitHub Pages** (Settings → Pages → deploy from branch) since it's fully static.

## My Role

I was the **Product Lead and primary contributor** on TerpFinance (the largest share of commits in the repo). I owned direction and scope, ran the customer discovery and user research, translated insights into personas, user stories, and a prioritized feature set, designed wireframes and UI mockups in Figma, and built out core features including transaction management and the budgeting experience.

## Team

TerpFinance was a collaborative project built by:

- **Arik Hasan** — Product Lead, research, front-end + feature development
- **Prithvi Potluri** ([@Potlur1](https://github.com/Potlur1)) — Development
- **Jed Ivan Valenzuela** — Development
- **Joshua Shen** — Development

## Author

**Arik Hasan** — [GitHub](https://github.com/arikhasan2210) · [LinkedIn](https://www.linkedin.com/in/arik-hasan) · [Portfolio](https://arikhasan.vercel.app/)
