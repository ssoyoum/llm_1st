import { useEffect, useRef, useState } from "react";
import "./App.css";
import { sendChat } from "./api/chat.js";

const MODEL_OPTIONS = [
  {
    value: "gemini-3.1-flash-lite",
    label: "3.1 FLASH-LITE",
    description: "LOW COST",
  },
  {
    value: "gemini-3.5-flash",
    label: "3.5 FLASH",
    description: "HIGH QUALITY",
  },
];

const INITIAL_MESSAGE = {
  id: "system-ready",
  role: "assistant",
  content:
    "NEXUS 인터페이스가 연결되었습니다.\n분석할 질문이나 문장을 입력하세요.",
  timestamp: Date.now(),
};

const SESSION_ID = Math.random().toString(16).slice(2, 10).toUpperCase();

function MetricBar({ label, value, max, color }) {
  const width = max > 0 ? Math.max(3, Math.round((value / max) * 100)) : 0;

  return (
    <div className="metric">
      <div className="metric__label">
        <span>{label}</span>
        <strong style={{ color }}>{value}</strong>
      </div>
      <div className="metric__track">
        <span style={{ width: `${width}%`, background: color }} />
      </div>
    </div>
  );
}

function Message({ message }) {
  const isUser = message.role === "user";

  return (
    <article className={`message message--${message.role}`}>
      <div className="message__meta">
        <span className="status-dot" />
        <strong>{isUser ? "사용자" : "NEXUS-7"}</strong>
        <time>
          {new Date(message.timestamp).toLocaleTimeString("ko-KR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </time>
      </div>
      <div className="message__body">{message.content}</div>
    </article>
  );
}

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [model, setModel] = useState("gemini-3.1-flash-lite");
  const [usage, setUsage] = useState({
    inputTokens: 0,
    outputTokens: 0,
    thinkingTokens: 0,
    totalTokens: 0,
  });
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  const selectedModel = MODEL_OPTIONS.find((item) => item.value === model);
  const maxMetric = Math.max(
    usage.inputTokens,
    usage.outputTokens,
    usage.thinkingTokens,
    1,
  );

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    const content = message.trim();

    if (!content || loading) {
      return;
    }

    const userMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content,
      timestamp: Date.now(),
    };

    setMessages((current) => [...current, userMessage]);
    setMessage("");
    setLoading(true);

    try {
      const data = await sendChat({ message: content, model });

      setMessages((current) => [
        ...current,
        {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: data.answer,
          timestamp: Date.now(),
        },
      ]);
      setUsage(data.usage);
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          id: `error-${Date.now()}`,
          role: "error",
          content: error.message || "API 호출에 실패했습니다.",
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="nexus-shell">
      <div className="crt-overlay" aria-hidden="true" />

      <header className="topbar">
        <div className="brand">
          <span className="brand__mark">■</span>
          <strong>NEXUS</strong>
          <span className="brand__divider" />
          <small>LLM INTERFACE v1.0.0</small>
        </div>

        <div className="topbar__status">
          <span className="live-dot" />
          <span>세션 진행 중</span>
          <span className="session-id">ID: {SESSION_ID}</span>
        </div>
      </header>

      <div className="workspace">
        <aside className="sidebar">
          <section>
            <p className="eyebrow">// MODEL PROFILE</p>
            <label className="model-selector">
              <span>ACTIVE MODEL</span>
              <select value={model} onChange={(event) => setModel(event.target.value)}>
                {MODEL_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
            <div className="model-badge">
              <span>{selectedModel?.description}</span>
              <strong>{selectedModel?.label}</strong>
            </div>
          </section>

          <section className="sidebar__section">
            <p className="eyebrow">// TOKEN TELEMETRY</p>
            <MetricBar
              label="입력"
              value={usage.inputTokens}
              max={maxMetric}
              color="#00d4ff"
            />
            <MetricBar
              label="출력"
              value={usage.outputTokens}
              max={maxMetric}
              color="#e50914"
            />
            <MetricBar
              label="추론"
              value={usage.thinkingTokens}
              max={maxMetric}
              color="#ffb300"
            />
          </section>

          <section className="sidebar__section session-data">
            <p className="eyebrow">// SESSION DATA</p>
            <dl>
              <div>
                <dt>교환 횟수</dt>
                <dd>{Math.max(0, messages.length - 1)}회</dd>
              </div>
              <div>
                <dt>전체 토큰</dt>
                <dd>{usage.totalTokens}</dd>
              </div>
              <div>
                <dt>연결 상태</dt>
                <dd className="online">ONLINE</dd>
              </div>
              <div>
                <dt>포트</dt>
                <dd>3001</dd>
              </div>
            </dl>
          </section>

          <div className="sidebar__warning">
            <span>⚠ NOTICE</span>
            API 응답과 토큰 사용량은 세션에 기록됩니다.
          </div>
        </aside>

        <main className="chat-panel">
          <div className="chat-panel__heading">
            <div>
              <p className="eyebrow">// LIVE CONVERSATION</p>
              <h1>인지 인터페이스</h1>
            </div>
            <span className="encrypted">● ENCRYPTED CHANNEL</span>
          </div>

          <div className="message-list" aria-live="polite">
            {messages.map((item) => (
              <Message key={item.id} message={item} />
            ))}

            {loading && (
              <div className="typing">
                <div className="message__meta">
                  <span className="status-dot" />
                  <strong>NEXUS-7</strong>
                </div>
                <div className="typing__body">
                  처리 중<span className="typing__dots">...</span>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          <div className="composer">
            <div className="composer__row">
              <span className="prompt-mark">›</span>
              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="자유롭게 입력하세요..."
                rows={1}
                disabled={loading}
                aria-label="Gemini에게 보낼 메시지"
              />
              <button
                type="button"
                onClick={sendMessage}
                disabled={!message.trim() || loading}
              >
                {loading ? "전송 중" : "전송"}
              </button>
            </div>
            <div className="composer__hint">
              <span>ENTER 전송 · SHIFT+ENTER 줄바꿈</span>
              <span>모든 입력이 기록되고 있습니다</span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
