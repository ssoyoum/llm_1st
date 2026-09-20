const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

export async function sendChat({ message, model }) {
  const response = await fetch(`${BASE_URL}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      model,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "오류가 발생했습니다.");
  }

  return data;
}
