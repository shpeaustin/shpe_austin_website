# Contentful Integration — Events Section

This document captures the plan for integrating Contentful CMS into the Upcoming Events section of the SHPE Austin website. Review before implementing.

---

## Why Contentful

The events array in `Home.js` is currently hardcoded. Contentful lets us add, edit, and delete events (including flyer images) from a web dashboard without touching code or redeploying.

---

## Packages

| Package | Purpose |
|---|---|
| `contentful` | Official Contentful Delivery API client — fetches published entries directly from the browser |

No backend or build-time plugin needed. The Delivery API is CORS-enabled, so the React app calls it at runtime.

---

## Contentful Setup (one-time)

1. Create an account at [contentful.com](https://contentful.com) (free tier is enough)
2. Create a **Space** — e.g. "SHPE Austin"
3. Create a **Content Type** named `event` with these fields:

| Field name | Type | Notes |
|---|---|---|
| `title` | Short text | Event name |
| `date` | Short text | e.g. "June 18th · 6:00 PM CT" |
| `tag` | Short text | e.g. "Social Event", "Virtual Event" |
| `description` | Long text | Body copy shown on the card |
| `rsvp` | Short text | RSVP link URL |
| `flyer` | Media (image) | The event flyer photo |
| `borderColor` | Short text | Hex color for the card accent, e.g. `#FD652F` |
| `tagBg` | Short text | CSS color string for the tag background, e.g. `rgba(253,101,47,0.1)` |
| `tagColor` | Short text | Hex for the tag text color |
| `order` | Integer | Controls card sort order on the page |

4. Add event entries and upload flyer images as Assets
5. **Publish** each entry — only published entries are returned by the Delivery API

---

## API Keys

Go to **Settings → API Keys** in Contentful and create a key. You need:

- `Space ID`
- `Content Delivery API - access token` (read-only; safe to ship in frontend JS)

### Local development

Create a `.env` file at the project root (CRA auto-loads it; it is already gitignored):

```
REACT_APP_CONTENTFUL_SPACE_ID=your_space_id
REACT_APP_CONTENTFUL_ACCESS_TOKEN=your_access_token
```

`npm start` will pick these up automatically — no proxy or backend needed.

### Production (GitHub Pages)

The keys go into **GitHub → Settings → Secrets and Variables → Actions → Variables** (Variables, not Secrets, since these are public read-only keys).

The deploy workflow already reads `REACT_APP_*` env vars during `npm run build`.

---

## How It Integrates Into the Code

Replace the hardcoded `events` array in `Home.js` with a `useEffect` that fetches from Contentful on mount:

```js
// pseudocode — not final
const [events, setEvents] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const client = createClient({
    space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
    accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN,
  });

  client.getEntries({ content_type: 'event', order: 'fields.order' })
    .then(res => {
      setEvents(res.items.map(item => ({
        title: item.fields.title,
        date: item.fields.date,
        tag: item.fields.tag,
        description: item.fields.description,
        rsvp: item.fields.rsvp,
        flyer: item.fields.flyer?.fields.file.url ?? null,
        border: item.fields.borderColor,
        tagBg: item.fields.tagBg,
        tagColor: item.fields.tagColor,
      })));
    })
    .finally(() => setLoading(false));
}, []);
```

The card components in the JSX stay unchanged — they already accept a `flyer` field.

### Loading state

Show a skeleton (or spinner) while `loading === true`. If the fetch fails, fall back to an empty array with a friendly "check back soon" message, or optionally keep the hardcoded events as a fallback.

---

## Local Testing

1. Fill in `.env` with real keys
2. `npm start` — events render from Contentful
3. To test draft content: add a `REACT_APP_CONTENTFUL_PREVIEW_TOKEN` and swap to the Preview API host (`preview.contentful.com`) — lets you see unpublished entries before going live

---

## Production on GitHub Pages

Since the site is a client-side SPA, events are fetched **at runtime in the browser**, not at build time. This means:

- Adding or editing an event in Contentful is live immediately on page load — **no redeploy needed**
- Deleting an event in Contentful removes it on next page load — **no redeploy needed**

The only reason to redeploy is if the JS code itself changes.

---

## Auto-Redeploy Webhook (optional)

If we want GitHub Pages to redeploy automatically when content changes (e.g. for cache headers or just keeping the build fresh):

### Flow

```
Contentful publish/unpublish
    └─→ Contentful Webhook (HTTP POST → GitHub API)
            └─→ GitHub Actions: repository_dispatch trigger
                    └─→ npm run build
                            └─→ deploy to gh-pages branch
```

### Steps

1. **Contentful**: Settings → Webhooks → Add webhook
   - URL: `https://api.github.com/repos/shpeaustin/shpe_austin_website/dispatches`
   - Method: POST
   - Headers: `Authorization: token <github_pat>`, `Content-Type: application/json`
   - Body: `{ "event_type": "contentful_publish" }`
   - Triggers: Entry published, Entry unpublished

2. **GitHub Actions**: add `.github/workflows/contentful-deploy.yml`

```yaml
name: Deploy on Contentful publish

on:
  repository_dispatch:
    types: [contentful_publish]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
      - run: npm ci
      - run: npm run build
        env:
          REACT_APP_CONTENTFUL_SPACE_ID: ${{ vars.REACT_APP_CONTENTFUL_SPACE_ID }}
          REACT_APP_CONTENTFUL_ACCESS_TOKEN: ${{ vars.REACT_APP_CONTENTFUL_ACCESS_TOKEN }}
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./build
```

3. Create a fine-grained GitHub PAT with `contents: write` permission and store it in Contentful as the webhook auth token.

---

## Open Questions (discuss before implementing)

- Do we already have a Contentful account / space set up?
- Do we want the auto-redeploy webhook, or is runtime fetch enough?
- Should we show a loading skeleton, spinner, or silent fallback while events load?
- Who will manage content in Contentful (add/delete events)?
