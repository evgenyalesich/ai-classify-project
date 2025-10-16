import { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/classify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      alert("Ошибка при обращении к API");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && e.ctrlKey) {
      handleSubmit();
    }
  };

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html, body, #root {
          width: 100%;
          height: 100%;
          overflow-x: hidden;
        }

        @keyframes float {
          0%, 100% {
            transform: translate(0px, 0px) scale(1);
          }
          50% {
            transform: translate(50px, -50px) scale(1.1);
          }
        }

        @keyframes gradient-shift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .aurora {
          position: absolute;
          width: 60vw;
          height: 60vw;
          border-radius: 50%;
          filter: blur(120px);
          opacity: 0.3;
          animation: float 10s ease-in-out infinite alternate;
          pointer-events: none;
        }

        .aurora-cyan {
          background: radial-gradient(
            circle at 30% 30%,
            rgba(0, 255, 255, 0.3),
            transparent 70%
          );
          top: -10%;
          left: -10%;
          animation-delay: 0s;
        }

        .aurora-pink {
          background: radial-gradient(
            circle at 70% 70%,
            rgba(255, 0, 255, 0.25),
            transparent 70%
          );
          bottom: -10%;
          right: -10%;
          animation-delay: 3s;
        }

        .gradient-text {
          background: linear-gradient(
            90deg,
            rgb(34, 211, 238),
            rgb(217, 70, 239),
            rgb(244, 114, 182)
          );
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradient-shift 6s ease infinite;
        }

        .card-animated {
          animation: fadeInUp 0.6s ease-out;
        }

        .result-animated {
          animation: fadeInUp 0.5s ease-out;
        }

        .input-glow:focus {
          box-shadow: 0 0 20px rgba(0, 255, 255, 0.4);
        }
      `}</style>

      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgb(3, 7, 18)",
          overflow: "auto",
        }}
      >
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <div className="aurora aurora-cyan"></div>
          <div className="aurora aurora-pink"></div>
        </div>

        {/* Main Card */}
        <div
          className="card-animated"
          style={{
            position: "relative",
            zIndex: 10,
            width: "100%",
            maxWidth: "48rem",
            padding: "3rem",
            margin: "2rem",
            borderRadius: "3rem",
            backgroundColor: "rgba(17, 24, 39, 0.7)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(217, 70, 239, 0.4)",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <h1
            className="gradient-text"
            style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: "bold",
              marginBottom: "2.5rem",
              lineHeight: 1.2,
            }}
          >
            Классификатор текста на основе ИИ
          </h1>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1.5rem",
              width: "100%",
            }}
          >
            <textarea
              className="input-glow"
              style={{
                width: "100%",
                padding: "1.25rem",
                borderRadius: "2rem",
                backgroundColor: "rgba(31, 41, 55, 0.7)",
                border: "1px solid rgba(6, 182, 212, 0.2)",
                color: "white",
                resize: "none",
                transition: "all 0.3s",
                boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.3)",
                fontSize: "1rem",
                fontFamily: "inherit",
                outline: "none",
              }}
              rows="5"
              placeholder="Введите текст для классификации... (Ctrl+Enter для отправки)"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyPress}
            />

            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{
                background:
                  "linear-gradient(to right, rgb(6, 182, 212), rgb(217, 70, 239))",
                color: "white",
                fontWeight: "600",
                padding: "0.75rem 3rem",
                borderRadius: "9999px",
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "all 0.3s",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3)",
                fontSize: "1rem",
                opacity: loading ? 0.5 : 1,
                transform: "scale(1)",
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.target.style.transform = "scale(1.05)";
                  e.target.style.background =
                    "linear-gradient(to right, rgb(34, 211, 238), rgb(244, 114, 182))";
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.background =
                  "linear-gradient(to right, rgb(6, 182, 212), rgb(217, 70, 239))";
              }}
              onMouseDown={(e) => {
                if (!loading) e.target.style.transform = "scale(0.95)";
              }}
              onMouseUp={(e) => {
                if (!loading) e.target.style.transform = "scale(1.05)";
              }}
            >
              {loading ? "Обработка..." : "Классифицировать"}
            </button>
          </div>

          {result && (
            <div
              className="result-animated"
              style={{
                marginTop: "2rem",
                width: "100%",
                textAlign: "left",
                backgroundColor: "rgba(31, 41, 55, 0.7)",
                padding: "1.5rem",
                borderRadius: "2rem",
                border: "1px solid rgba(217, 70, 239, 0.3)",
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)",
              }}
            >
              <h2
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  marginBottom: "0.75rem",
                  color: "rgb(217, 70, 239)",
                }}
              >
                Результат:
              </h2>
              <pre
                style={{
                  backgroundColor: "rgba(17, 24, 39, 0.7)",
                  padding: "1rem",
                  borderRadius: "1rem",
                  overflowX: "auto",
                  fontSize: "0.875rem",
                  color: "rgb(103, 232, 249)",
                  fontFamily: "monospace",
                  whiteSpace: "pre-wrap",
                  wordWrap: "break-word",
                }}
              >
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
