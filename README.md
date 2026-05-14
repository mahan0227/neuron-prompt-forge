# Neuron Prompt Forge

Turn a rough goal into a **structured prompt pack** you can paste into any LLM workflow: one refined prompt, alternates, a QA checklist, risk notes, and an optional system message.

## What it is

A small Next.js app with a single API route that calls OpenAI in **JSON mode** and returns a consistent object shape. Your API key stays in the browser (sent as `Authorization: Bearer` only to your deployment).

## Why it’s useful

- Saves iteration time before you wire prompts into code or agents.
- Surfaces **failure modes** (where the prompt can be misread) before users hit them.
- Gives **variants** for A/B testing or fallback phrasing.
- Ships a **checklist** so PMs and engineers agree on “done” for prompt quality.

## Where you can use it

- **Product & AI teams** — shaping prompts for support bots, internal copilots, or RAG apps.
- **Consultancies** — quick client workshops to align on tone and guardrails.
- **Engineering** — documenting the “v1” prompt next to a feature flag or eval harness.
- **Education** — teaching prompt structure without exposing a shared vendor account (BYOK).

## Stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · OpenAI Chat Completions (JSON mode)

## Quick start

```bash
npm install
npm run dev
```

1. Paste your OpenAI API key in the bar (stored in `localStorage` in your browser only).
2. Set goal, audience, tone, constraints → **Forge prompt pack**.

## Production check

```bash
npm run build
npm run start
```

## API

`POST /api/forge` with header `Authorization: Bearer <OPENAI_API_KEY>`.

Body (JSON): `goal` (required), optional `audience`, `tone`, `constraints`, `model` (default `gpt-4o-mini`).

## Deploy

Vercel, Netlify, or any Node host. No server-side API keys required; use HTTPS in production.

## Suite brochure

Static overview of all Neuron tools: [`docs/neuron-suite-brochure.html`](docs/neuron-suite-brochure.html) · square graphic: [`docs/neuron-suite-ig-square.svg`](docs/neuron-suite-ig-square.svg).

## License

MIT
