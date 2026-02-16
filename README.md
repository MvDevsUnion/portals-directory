# Portals Directory

Search-first directory for official and commonly used Maldives portals.

## MVP Features

- Search across title, description, tags, and ministry/authority.
- Ministry/authority filter.
- Tag browsing chips.
- Portal cards with direct external links.
- Detail page for each portal with related links.
- JSON-first data model for simple curation and static-friendly deployment.

## Local Development

```bash
bun install
bun dev
```

Open `http://localhost:3000`.

## Data Editing

All content is JSON-first:

- Ministries/authorities: `src/data/ministries.json`
- Portals: `src/data/portals.json`

For each portal entry keep:

- `id` (stable slug)
- `url`
- `title`
- `ministryId` (must match a ministry `id`)
- `tags` (lowercase keywords)
- `description`
- `status` (`active` or `deprecated`)
- `lastVerified` (`YYYY-MM-DD`)
