import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.GOOGLE_AI_STUDIO;

if (!apiKey) {
  throw new Error("GOOGLE_AI_STUDIO 환경변수가 없습니다.");
}

export const config = {
  apiKey,
  port: Number(process.env.PORT) || 3001,
  defaultModel: "gemini-3.1-flash-lite",
};
