# Project CHAGRA-NET

Solarpunk trilingual landing and strategy microsite for an Amazon ecotourism + digital nomad corridor across Colombia and Brazil.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS v4 (with custom CSS tokens)
- Framer Motion for interaction polish
- Local JSON content model for EN/ES/PT copy and project ideas

## Routes

- `/` redirects to `/en`
- `/en`, `/es`, `/pt` serve localized versions

## Key Sections

- Hero and value proposition
- Why now (regenerative social/economic thesis)
- Core ports: Leticia, La Pedrera, Manaus, Belem
- Interactive Amazon roadmap map with city hover/focus states
- Filterable idea bank (bio-economy, AI, IoT, Web3, HCI, partnership, connectivity)
- Biomimicry x Chagra framework section
- Meet the Team (CEO, CTO, CSO)
- Partner/resident call to action

## Content Files

- `src/content/site.en.json`
- `src/content/site.es.json`
- `src/content/site.pt.json`
- `src/content/ideas.json`

## Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Quality Checks

```bash
npm run lint
npm run build
```

## Notes

- Team photos are currently placeholders with LinkedIn profile links.
- Image sources and style references are tracked in `docs/image-attributions.md`.
- Roadmap staging details are documented in `docs/roadmap.md`.
