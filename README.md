# SHPE Austin Website

Official website for the **Society of Hispanic Professional Engineers – Austin Professional Chapter**.

Built with React (Create React App), React Router, Tailwind CSS v3, and Framer Motion.

---

## What's Done

### Pages
- **Home** — Animated intro sequence (video → hat animation → "Bienvenido a SHPE Austin" gradient text), 6 content sections (Mission, Values, Events, Membership, Sponsor, Donate), and footer with contact info and social links
- **About** — Hero, sticky tabs (About / Documents), animated stat counters, SHPE national & Austin history with timelines, Mission & Vision callout cards
- **Executive Board** — Hero with clickable stacked avatar group (tap any avatar to open a profile modal), flip cards grid with name, position, profession, company, school, and bio for all 10 board members
- **Stub pages** — NationalPrograms, Events, Membership, Donations, Sponsors (headings only, ready to fill in)

### Components
- **Navbar** (`CardNav`) — GSAP-animated hamburger dropdown with grouped nav cards (About, Programs, Get Involved) and SHPE Austin horizontal logo
- **ShpeHatAnimation** — Canvas-based SHPE hat draw animation used in the home intro
- **Avatar** (UntitledUI) — Installed at `src/components/base/avatar/`, used on the Executive Board page

### Infrastructure
- React Router v7 with `HashRouter` (GitHub Pages compatible)
- Tailwind CSS v3 with SHPE brand color palette
- Framer Motion scroll-triggered animations throughout
- TypeScript support via `tsconfig.json` (for `.tsx` navbar components)
- `@untitledui/icons` and `react-aria-components` installed

---

## TODO

### High Priority

#### Contentful CMS — Events Integration
- [ ] Create a Contentful space and define a `Event` content model with fields:
  - `title` (Short text)
  - `date` (Date & time)
  - `description` (Long text)
  - `flyer` (Media — image)
  - `registrationLink` (Short text — URL to Google Form or similar)
- [ ] Install Contentful SDK: `npm install contentful`
- [ ] Create `src/lib/contentful.js` client using env vars (`REACT_APP_CONTENTFUL_SPACE_ID`, `REACT_APP_CONTENTFUL_ACCESS_TOKEN`)
- [ ] Build `src/components/EventCard.js` to display flyer, title, date/time, description, and registration link button
- [ ] Wire `Events` page to fetch and render live events from Contentful
- [ ] Wire the Home page **Upcoming Events** section to pull the 2 most recent events from Contentful automatically
- [ ] Add `.env.example` file with the required env var keys documented
- [ ] Test adding and removing events in Contentful and confirming they appear/disappear on the site

### Content to Fill In
- [ ] **Executive Board** — Add real photos, companies, schools, and bios for all 10 members (replace placeholder `Company Name`, `School Name`, and bio text in `src/pages/ExecutiveBoard.js`)
- [ ] **National Programs** page — Add content for SHPE national programs (LEAH, Gen-E, etc.)
- [ ] **Membership** page — Add membership tiers, benefits, and link to join
- [ ] **Donations** page — Add donation tiers, impact statement, and payment link
- [ ] **Sponsors** page — Add current sponsors with logos and tier levels
- [ ] **Documents tab (About)** — Replace placeholder IRS 990 links with real PDF URLs
- [ ] **Events page** — Will be replaced by Contentful integration (see above)
- [ ] **Footer** — Confirm social media handles and update links

### Future Enhancements
- [ ] Add LinkedIn links to executive board member cards
- [ ] Mobile nav refinement — review card nav behavior on small screens
- [ ] SEO — add `<title>` and `<meta description>` tags per page
- [ ] Favicon — replace CRA default with SHPE Austin icon
- [ ] Google Analytics or similar for traffic tracking
- [ ] Contact form (replace `mailto:` with a real form submission)
- [ ] Dark mode support (CSS custom properties are already wired up in `index.css`)

---

## Local Development

```bash
npm install
npm start       # dev server at http://localhost:3000
npm run build   # production build
```

---

## Deployment

The build outputs to `/build`. Deploy to GitHub Pages, Netlify, or any static host.
For GitHub Pages with HashRouter, the homepage in `package.json` should be set to the repo URL.

---

## Brand Colors

| Name | Hex |
|------|-----|
| Navy | `#001F5B` |
| Blue | `#0070C0` |
| Light Blue | `#72A9BE` |
| Dark Orange-Red | `#D33A02` |
| Orange | `#FD652F` |

> Logo colors are brand-regulated. Never apply CSS filters or color overrides to the SHPE Austin logo.
