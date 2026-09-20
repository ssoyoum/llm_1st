import { GoogleGenAI } from "@google/genai";

import { config } from "../config/env.js";

const ai = new GoogleGenAI({ apiKey: config.apiKey });

export async function generateAnswer({ message, model }) {
  const selectedModel = model || config.defaultModel;

  const response = await ai.models.generateContent({
    model: selectedModel,
    contents: message,
  });

  const metadata = response.usageMetadata;

  return {
    model: selectedModel,
    answer: response.text,
    usage: {
      inputTokens: metadata?.promptTokenCount ?? 0,
      outputTokens: metadata?.candidatesTokenCount ?? 0,
      thinkingTokens: metadata?.thoughtsTokenCount ?? 0,
      totalTokens: metadata?.totalTokenCount ?? 0,
    },
  };
}
