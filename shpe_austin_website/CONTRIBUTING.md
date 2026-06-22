# SHPE Austin Website — Developer Guide

This document is for future directors and contributors who will maintain or extend this website. Read this before touching any code.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Running Locally](#running-locally)
5. [How the Pages Work](#how-the-pages-work)
6. [How the Navbar Works](#how-the-navbar-works)
7. [Brand Guidelines](#brand-guidelines)
8. [Updating Content](#updating-content)
9. [Contentful CMS (Events)](#contentful-cms-events)
10. [Adding New Pages](#adding-new-pages)
11. [Deployment](#deployment)
12. [Director Handoff Checklist](#director-handoff-checklist)

---

## Project Overview

This is the official website for SHPE Austin Professional Chapter. It is a single-page React app that uses client-side routing (no backend). All pages are static except for the Events section, which will be powered by Contentful CMS so that marketing can manage events without touching code.

---

## Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| React | 18 | UI framework |
| Create React App | 5 | Build tooling (no config needed) |
| React Router | 7 | Client-side page routing |
| Tailwind CSS | 3 | Utility-first styling |
| Framer Motion | latest | Scroll animations, transitions |
| GSAP | 3 | Navbar animation |
| Contentful | (planned) | CMS for events |
| UntitledUI Icons | latest | Icon set |
| react-icons | latest | Social/misc icons |

---

## Project Structure

```
src/
├── assets/
│   ├── logos/
│   │   ├── SHPE_austin_horiz_logo.png   ← horizontal logo (used in navbar)
│   │   └── SHPE_stacked_logo_national.png
│   └── shpe_animated_video.mp4          ← intro video on home page
│
├── components/
│   ├── navbar/
│   │   ├── Navbar.js       ← defines nav items and passes them to CardNav
│   │   ├── CardNav.tsx     ← GSAP-animated dropdown navbar component
│   │   └── CardNav.css     ← navbar styles
│   └── base/
│       └── avatar/         ← UntitledUI avatar component (used on exec board)
│
├── lib/
│   └── utils.js            ← cn() helper for merging Tailwind classes
│
├── pages/
│   ├── Home.js             ← intro animation + 6 content sections + footer
│   ├── About.js            ← chapter info, stats, timelines, mission/vision
│   ├── ExecutiveBoard.js   ← board member cards + avatar group
│   ├── Events.js           ← stub (will become Contentful-driven)
│   ├── NationalPrograms.js ← stub
│   ├── Membership.js       ← stub
│   ├── Donations.js        ← stub
│   └── Sponsors.js         ← stub
│
├── App.js                  ← router setup, imports Navbar and all pages
└── index.css               ← Tailwind directives + CSS custom properties
```

---

## Running Locally

You need Node.js installed (v16 or higher).

```bash
# Install dependencies (only needed once, or after pulling new changes)
npm install

# Start the dev server
npm start
# Opens at http://localhost:3000

# Build for production
npm run build
```

If port 3000 is already in use, the terminal will ask if you want to use a different port — press Y.

---

## How the Pages Work

### App.js

This is the entry point. It wraps everything in a `HashRouter` (uses `#` in the URL, which works on static hosts like GitHub Pages without needing server config). The `Navbar` is rendered outside the `<Routes>` so it appears on every page.

To add a new route:
1. Create your page file in `src/pages/`
2. Import it in `App.js`
3. Add a `<Route path="/your-path" element={<YourPage />} />` inside `<Routes>`
4. Add a link to it in `Navbar.js`

### Home.js

The home page has two phases:

**Phase 1 — Intro (plays once per browser session):**
- Full-screen video plays at 1.5× speed
- Hat animation draws on a canvas
- "Bienvenido a SHPE Austin" text fades in above the hat logo
- `sessionStorage` key `introPlayed` is set so the intro does not replay on tab switch or refresh within the same session. It replays on a fresh browser open.

**Phase 2 — Main content (always visible after intro):**
- 6 sections scroll in with Framer Motion `whileInView` animations
- All content is hardcoded here for now (Events section will move to Contentful)

### About.js

- Sticky tab bar toggles between the About content and a Documents tab
- Stat counters use `IntersectionObserver` to count up when they scroll into view
- History sections have alternating timeline entries
- Mission and Vision are two side-by-side cards at the bottom

### ExecutiveBoard.js

- `board` array at the top of the file holds all member data — **this is where you update names, photos, bios, etc.**
- Avatar group in the hero: tap any avatar → profile modal opens
- The `+2` overflow button shows a dropdown of members not visible in the main row
- Below the hero: flip cards — tap to flip and see the bio

To add a photo for a board member:
1. Place the photo file in `src/assets/` (or a subfolder like `src/assets/board/`)
2. Import it at the top of `ExecutiveBoard.js`: `import susanaPhoto from '../assets/board/susana.jpg';`
3. Set `photo: susanaPhoto` on that member's object in the `board` array

---

## How the Navbar Works

`Navbar.js` defines the three nav groups (About, Programs, Get Involved) as an array of objects and passes them to `CardNav.tsx`. The `CardNav` component uses GSAP to animate the dropdown open/close. It also imports the horizontal SHPE Austin logo.

To add or rename a nav link:
- Open `src/components/navbar/Navbar.js`
- Edit the `navItems` array — each group has a `label`, `bgColor`, `textColor`, and a `links` array
- Each link needs a `label`, `href` (must match a route in `App.js`), and `ariaLabel`

---

## Brand Guidelines

**Colors — never deviate from these:**

| Name | Hex |
|------|-----|
| Navy | `#001F5B` |
| Blue | `#0070C0` |
| Light Blue | `#72A9BE` |
| Dark Orange-Red | `#D33A02` |
| Orange | `#FD652F` |

**Logo rules:**
- Never apply CSS `filter`, color overlays, or opacity changes to any SHPE logo
- Use the horizontal logo (`SHPE_austin_horiz_logo.png`) in the navbar
- Use the stacked national logo (`SHPE_stacked_logo_national.png`) where appropriate
- Logo colors are brand-regulated by SHPE National — any alteration violates brand guidelines

---

## Updating Content

### Executive Board members
Edit the `board` array in `src/pages/ExecutiveBoard.js`. Each entry has:
```js
{
  name: 'Full Name',
  position: 'Position Title',
  profession: 'Job Title',
  company: 'Employer Name',
  school: 'University Name',
  bio: 'Short bio paragraph.',
  photo: null,           // replace with imported image
  accent: '#001F5B',     // card accent color (use SHPE palette)
  gradient: 'linear-gradient(135deg, #001F5B 0%, #0a2a5e 100%)',
}
```

### About page stats
Find the `stats` array near the top of `src/pages/About.js` and update the values.

### Mission / Vision
Search for the Mission and Vision text strings in `src/pages/About.js` and update directly.

### Footer contact info
At the bottom of `src/pages/Home.js`, find the footer section and update the email, phone, address, and social media links.

---

## Contentful CMS (Events)

> This section describes the planned integration — not yet implemented.

The goal is to let the marketing director add and remove events from a web dashboard without touching code. The site will automatically pull the latest events.

### Setup steps (one-time, done by a developer)

1. Create a free account at [contentful.com](https://www.contentful.com)
2. Create a new Space called `shpe-austin`
3. Go to **Content Model** and create a Content Type called `event` with these fields:
   - `title` — Short text
   - `date` — Date & time
   - `description` — Long text
   - `flyer` — Media (image)
   - `registrationLink` — Short text (URL)
4. Go to **Settings → API Keys** and create a new API key. Copy the Space ID and Content Delivery API access token.
5. Create a `.env` file in the project root (never commit this file):
   ```
   REACT_APP_CONTENTFUL_SPACE_ID=your_space_id_here
   REACT_APP_CONTENTFUL_ACCESS_TOKEN=your_access_token_here
   ```
6. Install the SDK: `npm install contentful`
7. Create `src/lib/contentful.js`:
   ```js
   import { createClient } from 'contentful';

   export const client = createClient({
     space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
     accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN,
   });
   ```
8. Fetch events in the Events page or Home page like this:
   ```js
   const entries = await client.getEntries({ content_type: 'event', order: 'fields.date' });
   ```

### For the marketing director (non-technical)

Once the integration is live, you can manage events at [app.contentful.com](https://app.contentful.com):
1. Log in and open the SHPE Austin space
2. Go to **Content** → **Add Entry** → **Event**
3. Fill in the title, date, description, upload a flyer image, and paste the registration form link
4. Click **Publish** — the event will appear on the website within seconds (no code change needed)
5. To remove an event, open it and click **Unpublish** or **Delete**

---

## Adding New Pages

1. Create `src/pages/NewPage.js` with a default export
2. Add the route in `App.js`:
   ```jsx
   import NewPage from './pages/NewPage';
   // inside <Routes>:
   <Route path="/new-page" element={<NewPage />} />
   ```
3. Add the link in `src/components/navbar/Navbar.js` under the appropriate nav group
4. Start the page content with `<main style={{ paddingTop: '60px' }}>` so it clears the fixed navbar

---

## Deployment

The site builds to a `/build` folder with `npm run build`. This folder can be dropped into:

- **GitHub Pages** — push the `/build` output to the `gh-pages` branch, or use the `gh-pages` npm package
- **Netlify** — connect the repo, set build command to `npm run build`, publish directory to `build`
- **Any static host** — upload the `/build` folder contents

The `HashRouter` means all navigation uses `#` in the URL (e.g. `/#/about`), so no special server config is needed — everything routes through `index.html`.

---

## Director Handoff Checklist

When handing this project to the next Professional Development Director:

- [ ] Add them as a collaborator on the GitHub repo
- [ ] Share the Contentful account credentials (or transfer ownership)
- [ ] Share any `.env` file values through a secure channel (never email or Slack in plaintext)
- [ ] Walk them through this document and the README
- [ ] Update the `board` array in `ExecutiveBoard.js` with the new board member lineup
- [ ] Update the footer contact email if it changes
- [ ] Make sure they have Node.js installed and can run `npm start` locally before you hand off
