# Neuron Prompt Forge

Production-ready Next.js app that turns rough goals into **structured prompt packs**: a refined prompt, alternates, QA checklist, risk notes, and a suggested system message. Uses **your** OpenAI API key only — nothing is stored on the server.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4
- OpenAI SDK (Chat Completions, JSON mode)

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

1. Paste your OpenAI API key in the bar (stored in `localStorage` in your browser only).
2. Choose a model (`gpt-4o-mini` recommended for cost).
3. Describe the goal, audience, tone, and constraints — run **Forge prompt pack**.

## Environment

No server `.env` is required for the AI path: the browser sends `Authorization: Bearer <key>` to this app’s API route, which proxies a single hop to OpenAI. **Do not** commit keys or deploy without HTTPS.

## Deploy

Works on Vercel, Netlify, or any Node host. Set nothing secret in the dashboard — users supply keys in the UI.

## Scripts

- `npm run dev` — local development
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run lint` — ESLint

## License

MIT
