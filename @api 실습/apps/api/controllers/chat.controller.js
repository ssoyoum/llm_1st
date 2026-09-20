import { generateAnswer } from "../services/gemini.service.js";

export async function postChat(req, res) {
  try {
    const { message, model } = req.body;

    if (!message) {
      return res.status(400).json({
        error: "message가 없습니다.",
      });
    }

    const result = await generateAnswer({ message, model });

    res.json(result);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Gemini 응답 생성 중 오류가 발생했습니다.",
    });
  }
}
