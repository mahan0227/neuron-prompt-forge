"use client";

import { useState } from "react";
import { ApiKeyBar, authHeaders, useOpenAISettings } from "@/components/ApiKeyBar";

export default function Home() {
  const settings = useOpenAISettings();
  const { apiKey, model } = settings;
  const [goal, setGoal] = useState(
    "Summarize a dense technical RFC for executives without losing critical risks.",
  );
  const [audience, setAudience] = useState("VP Engineering + Security");
  const [tone, setTone] = useState("Crisp, confident, no hype");
  const [constraints, setConstraints] = useState(
    "Must call out unknowns explicitly. No more than 7 bullets. End with a decision ask.",
  );
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState<string>("");
  const [error, setError] = useState<string>("");

  async function run() {
    setError("");
    setOutput("");
    if (!apiKey.trim()) {
      setError("Add your OpenAI API key above.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/forge", {
        method: "POST",
        headers: authHeaders(apiKey),
        body: JSON.stringify({ goal, audience, tone, constraints, model }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Request failed");
        return;
      }
      setOutput(JSON.stringify(data.result ?? data, null, 2));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-full max-w-5xl flex-col gap-8 px-4 py-10 md:px-8">
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-300/90">
          Neuron suite · 01
        </p>
        <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">
          Prompt Forge
        </h1>
        <p className="max-w-2xl text-lg text-zinc-400">
          Turn fuzzy intent into production-grade prompts: refined core, alternates, QA checklist,
          and risk radar — tuned to your audience and guardrails.
        </p>
      </header>

      <ApiKeyBar settings={settings} accent="from-violet-500 to-fuchsia-500" />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
          <label className="block space-y-2 text-sm">
            <span className="text-zinc-300">Goal / task</span>
            <textarea
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              rows={4}
              className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:border-violet-400/60"
            />
          </label>
          <label className="block space-y-2 text-sm">
            <span className="text-zinc-300">Audience</span>
            <input
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:border-violet-400/60"
            />
          </label>
          <label className="block space-y-2 text-sm">
            <span className="text-zinc-300">Tone</span>
            <input
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:border-violet-400/60"
            />
          </label>
          <label className="block space-y-2 text-sm">
            <span className="text-zinc-300">Constraints</span>
            <textarea
              value={constraints}
              onChange={(e) => setConstraints(e.target.value)}
              rows={3}
              className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:border-violet-400/60"
            />
          </label>
          <button
            type="button"
            disabled={loading}
            onClick={run}
            className="w-full rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/30 transition hover:brightness-110 disabled:opacity-50"
          >
            {loading ? "Forging…" : "Forge prompt pack"}
          </button>
        </div>

        <div className="flex min-h-[420px] flex-col gap-3 rounded-2xl border border-white/10 bg-black/40 p-5 font-mono text-xs md:text-sm">
          <div className="flex items-center justify-between text-zinc-400">
            <span>Structured output</span>
            {error ? <span className="text-rose-400">Error</span> : null}
          </div>
          {error ? <p className="text-sm text-rose-300">{error}</p> : null}
          <pre className="flex-1 overflow-auto whitespace-pre-wrap text-zinc-100">{output}</pre>
        </div>
      </div>
    </div>
  );
}
