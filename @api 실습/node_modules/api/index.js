import app from "./app.js";
import { config } from "./config/env.js";

const PORT = config.port;

app.listen(PORT, (error) => {
  if (error) {
    console.error(
      `포트 ${PORT}에서 서버를 시작하지 못했습니다:`,
      error.message,
    );
    return;
  }

  console.log(`✅ listening!! http://localhost:${PORT}`);
});
