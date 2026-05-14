import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { getOpenAIApiKey } from "@/lib/openai-key";

export async function POST(request: NextRequest) {
  const apiKey = getOpenAIApiKey(request);
  if (!apiKey) {
    return NextResponse.json(
      { error: "Send Authorization: Bearer <your OpenAI API key> on each request." },
      { status: 401 },
    );
  }

  let body: {
    goal?: string;
    audience?: string;
    tone?: string;
    constraints?: string;
    model?: string;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { goal, audience, tone, constraints, model } = body;
  if (!goal?.trim()) {
    return NextResponse.json({ error: "Field `goal` is required." }, { status: 400 });
  }

  const client = new OpenAI({ apiKey });
  const usedModel = model?.trim() || "gpt-4o-mini";

  const system = `You are Neuron Prompt Forge, a senior prompt engineer. Output MUST be valid JSON with keys:
- refined_prompt: string (single best prompt)
- variants: string[] (2 alternate phrasings)
- checklist: string[] (5 quick QA checks before shipping)
- risk_notes: string[] (where the prompt could fail or be misinterpreted)
- suggested_system: string (optional system message for the downstream task)`;

  const user = `Goal:\n${goal}\n\nAudience:\n${audience || "general"}\n\nTone:\n${tone || "clear and direct"}\n\nConstraints / guardrails:\n${constraints || "none specified"}`;

  try {
    const completion = await client.chat.completions.create({
      model: usedModel,
      temperature: 0.4,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
    });

    const text = completion.choices[0]?.message?.content;
    if (!text) {
      return NextResponse.json({ error: "Empty model response." }, { status: 502 });
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(text);
    } catch {
      return NextResponse.json({ raw: text }, { status: 200 });
    }

    return NextResponse.json({ result: parsed, model: usedModel });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "OpenAI request failed";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
