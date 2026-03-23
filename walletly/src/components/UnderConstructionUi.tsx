export default function UnderConstruction() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Georgia', serif",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <style>{`
        @keyframes crane-swing {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        @keyframes hook-swing {
          0%, 100% { transform: translateX(-8px); }
          50% { transform: translateX(8px); }
        }
        @keyframes bob1 {
          0%, 100% { transform: translate(0px, 0px); }
          50% { transform: translate(0px, -6px); }
        }
        @keyframes bob2 {
          0%, 100% { transform: translate(0px, 0px); }
          50% { transform: translate(0px, -6px); }
        }
        @keyframes hammer {
          0%, 100% { transform: rotate(0deg); }
          40% { transform: rotate(-40deg); }
        }
        @keyframes float-dust {
          0% { opacity: 0; transform: translateY(0) scale(0.5); }
          50% { opacity: 0.4; }
          100% { opacity: 0; transform: translateY(-30px) scale(1.5); }
        }
        @keyframes flicker {
          0%, 100% { opacity: 1; }
          92% { opacity: 1; }
          93% { opacity: 0.4; }
          94% { opacity: 1; }
          96% { opacity: 0.6; }
          97% { opacity: 1; }
        }
        .crane { animation: crane-swing 4s ease-in-out infinite; transform-origin: 397px 370px; }
        .hook { animation: hook-swing 4s ease-in-out infinite; transform-origin: 265px 60px; }
        .worker1-g { animation: bob1 2s ease-in-out infinite; }
        .worker2-g { animation: bob2 2.4s ease-in-out infinite 0.3s; }
        .hammer-arm { animation: hammer 0.8s ease-in-out infinite; transform-origin: 103px 187px; }
        .dust1 { animation: float-dust 2s ease-out infinite 0s; }
        .dust2 { animation: float-dust 2s ease-out infinite 0.7s; }
        .dust3 { animation: float-dust 2s ease-out infinite 1.4s; }
        .title { animation: flicker 5s ease-in-out infinite; }
      `}</style>

      <svg
        width="520"
        height="390"
        viewBox="0 0 520 390"
        style={{ filter: "drop-shadow(0 20px 60px rgba(155,75,194,0.2))" }}
      >
        {/* === BUILDING === */}
        <rect
          x="130"
          y="260"
          width="200"
          height="100"
          fill="#1a1a1a"
          stroke="#333"
          strokeWidth="1.5"
        />
        <rect
          x="130"
          y="200"
          width="200"
          height="65"
          fill="#1e1e1e"
          stroke="#333"
          strokeWidth="1.5"
        />
        <rect
          x="130"
          y="150"
          width="200"
          height="55"
          fill="#222"
          stroke="#444"
          strokeWidth="1.5"
        />

        {[155, 195, 235, 275, 305].map((x, i) => (
          <rect
            key={`w1-${i}`}
            x={x}
            y="270"
            width="22"
            height="30"
            fill={i % 2 === 0 ? "#1a0a2e" : "#1a1a1a"}
            stroke="#444"
            strokeWidth="1"
          />
        ))}
        {[155, 195, 235, 275, 305].map((x, i) => (
          <rect
            key={`w2-${i}`}
            x={x}
            y="210"
            width="22"
            height="25"
            fill={i % 3 !== 1 ? "#1a0a2e" : "#1a1a1a"}
            stroke="#444"
            strokeWidth="1"
          />
        ))}

        <rect
          x="145"
          y="110"
          width="170"
          height="45"
          fill="none"
          stroke="#555"
          strokeWidth="1.5"
          strokeDasharray="8,4"
        />
        {[160, 185, 210, 235, 260, 285].map((x, i) => (
          <line
            key={`r-${i}`}
            x1={x}
            y1="108"
            x2={x}
            y2="88"
            stroke="#888"
            strokeWidth="3"
            strokeLinecap="round"
          />
        ))}
        <line
          x1="150"
          y1="100"
          x2="310"
          y2="100"
          stroke="#777"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* === SCAFFOLDING LEFT === */}
        <line
          x1="128"
          y1="150"
          x2="128"
          y2="360"
          stroke="#9b4bc2"
          strokeWidth="2.5"
          opacity="0.8"
        />
        <line
          x1="108"
          y1="150"
          x2="108"
          y2="360"
          stroke="#9b4bc2"
          strokeWidth="2.5"
          opacity="0.8"
        />
        {[170, 210, 260, 310, 355].map((y, i) => (
          <line
            key={`sl-${i}`}
            x1="108"
            y1={y}
            x2="128"
            y2={y}
            stroke="#9b4bc2"
            strokeWidth="2"
            opacity="0.7"
          />
        ))}
        <line
          x1="108"
          y1="170"
          x2="128"
          y2="210"
          stroke="#9b4bc2"
          strokeWidth="1"
          opacity="0.4"
        />
        <line
          x1="128"
          y1="210"
          x2="108"
          y2="260"
          stroke="#9b4bc2"
          strokeWidth="1"
          opacity="0.4"
        />

        {/* === SCAFFOLDING RIGHT === */}
        <line
          x1="332"
          y1="150"
          x2="332"
          y2="360"
          stroke="#9b4bc2"
          strokeWidth="2.5"
          opacity="0.8"
        />
        <line
          x1="352"
          y1="150"
          x2="352"
          y2="360"
          stroke="#9b4bc2"
          strokeWidth="2.5"
          opacity="0.8"
        />
        {[170, 210, 260, 310, 355].map((y, i) => (
          <line
            key={`sr-${i}`}
            x1="332"
            y1={y}
            x2="352"
            y2={y}
            stroke="#9b4bc2"
            strokeWidth="2"
            opacity="0.7"
          />
        ))}
        <line
          x1="332"
          y1="170"
          x2="352"
          y2="210"
          stroke="#9b4bc2"
          strokeWidth="1"
          opacity="0.4"
        />
        <line
          x1="352"
          y1="210"
          x2="332"
          y2="260"
          stroke="#9b4bc2"
          strokeWidth="1"
          opacity="0.4"
        />

        {/* === CRANE === */}
        <g className="crane">
          <rect
            x="390"
            y="80"
            width="14"
            height="280"
            fill="#2a2a2a"
            stroke="#9b4bc2"
            strokeWidth="1.5"
          />
          {[100, 140, 180, 220, 260, 300].map((y, i) => (
            <line
              key={`cb-${i}`}
              x1="390"
              y1={y}
              x2="404"
              y2={y + 20}
              stroke="#9b4bc2"
              strokeWidth="1"
              opacity="0.5"
            />
          ))}
          <line
            x1="397"
            y1="82"
            x2="255"
            y2="58"
            stroke="#9b4bc2"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <line
            x1="397"
            y1="82"
            x2="452"
            y2="68"
            stroke="#9b4bc2"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <rect x="442" y="62" width="20" height="14" fill="#9b4bc2" rx="2" />
          <line
            x1="397"
            y1="82"
            x2="320"
            y2="55"
            stroke="#888"
            strokeWidth="1.5"
          />
          <line
            x1="320"
            y1="55"
            x2="255"
            y2="60"
            stroke="#888"
            strokeWidth="1.5"
          />
        </g>

        {/* === HOOK === */}
        <g className="hook">
          <line
            x1="265"
            y1="60"
            x2="265"
            y2="112"
            stroke="#aaa"
            strokeWidth="1.5"
          />
          <path
            d="M 260 112 Q 255 120 260 126 Q 267 132 273 126"
            fill="none"
            stroke="#9b4bc2"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <rect
            x="250"
            y="126"
            width="30"
            height="20"
            fill="#7b2d8b"
            stroke="#9b4bc2"
            strokeWidth="1.5"
            rx="2"
          />
          <line
            x1="250"
            y1="136"
            x2="280"
            y2="136"
            stroke="#9b4bc2"
            strokeWidth="1"
            opacity="0.6"
          />
        </g>

        {/* === WORKER 1 — left scaffold === */}
        <g className="worker1-g">
          <rect x="87" y="183" width="16" height="20" fill="#7b2d8b" rx="2" />
          <circle cx="95" cy="179" r="7" fill="#f5cba7" />
          <ellipse cx="95" cy="174" rx="9" ry="4" fill="#9b4bc2" />
          <rect x="88" y="174" width="14" height="3" fill="#9b4bc2" />
          <rect x="89" y="201" width="5" height="12" fill="#2c3e50" rx="1" />
          <rect x="96" y="201" width="5" height="12" fill="#2c3e50" rx="1" />
          <g className="hammer-arm">
            <line
              x1="103"
              y1="187"
              x2="118"
              y2="179"
              stroke="#f5cba7"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <rect x="116" y="175" width="10" height="7" fill="#7f8c8d" rx="1" />
          </g>
        </g>

        {/* Dust */}
        <circle
          className="dust1"
          cx="122"
          cy="178"
          r="3"
          fill="#9b4bc2"
          opacity="0"
        />
        <circle
          className="dust2"
          cx="128"
          cy="173"
          r="2"
          fill="#c084e0"
          opacity="0"
        />
        <circle
          className="dust3"
          cx="119"
          cy="175"
          r="2"
          fill="#888"
          opacity="0"
        />

        {/* === WORKER 2 — right scaffold === */}
        <g className="worker2-g">
          <rect x="355" y="218" width="16" height="20" fill="#4a1a6b" rx="2" />
          <circle cx="363" cy="214" r="7" fill="#f5cba7" />
          <ellipse cx="363" cy="209" rx="9" ry="4" fill="#c084e0" />
          <rect x="356" y="209" width="14" height="3" fill="#c084e0" />
          <rect x="357" y="236" width="5" height="12" fill="#2c3e50" rx="1" />
          <rect x="364" y="236" width="5" height="12" fill="#2c3e50" rx="1" />
          {/* Blueprint */}
          <rect
            x="341"
            y="220"
            width="16"
            height="12"
            fill="#ecf0f1"
            stroke="#bdc3c7"
            strokeWidth="1"
            rx="1"
          />
          <line
            x1="343"
            y1="224"
            x2="355"
            y2="224"
            stroke="#9b4bc2"
            strokeWidth="0.8"
          />
          <line
            x1="343"
            y1="227"
            x2="353"
            y2="227"
            stroke="#9b4bc2"
            strokeWidth="0.8"
          />
          <line
            x1="343"
            y1="230"
            x2="351"
            y2="230"
            stroke="#9b4bc2"
            strokeWidth="0.8"
          />
        </g>

        {/* === GROUND === */}
        <rect x="80" y="358" width="320" height="8" fill="#222" rx="2" />
        <rect x="60" y="363" width="360" height="5" fill="#1a1a1a" rx="2" />
        {[80, 120, 160, 200, 240, 280, 320, 360].map((x, i) => (
          <rect
            key={`gs-${i}`}
            x={x}
            y="358"
            width="20"
            height="8"
            fill={i % 2 === 0 ? "#9b4bc2" : "#1a1a1a"}
            opacity="0.8"
          />
        ))}

        {/* Sand pile */}
        <ellipse
          cx="175"
          cy="361"
          rx="30"
          ry="8"
          fill="#8B4513"
          opacity="0.5"
        />
        <ellipse
          cx="175"
          cy="356"
          rx="22"
          ry="6"
          fill="#A0522D"
          opacity="0.6"
        />

        {/* Bricks */}
        {[0, 1, 2].map((row) =>
          [0, 1, 2].map((col) => (
            <rect
              key={`b-${row}-${col}`}
              x={68 + col * 17 + (row % 2) * 8}
              y={351 - row * 7}
              width="14"
              height="6"
              fill="#7b2d8b"
              stroke="#9b4bc2"
              strokeWidth="0.5"
              rx="1"
            />
          )),
        )}

        {/* Cement mixer */}
        <circle
          cx="432"
          cy="344"
          r="18"
          fill="#1e1e1e"
          stroke="#444"
          strokeWidth="1.5"
        />
        <ellipse
          cx="432"
          cy="344"
          rx="10"
          ry="12"
          fill="#2a2a2a"
          stroke="#555"
          strokeWidth="1"
        />
        <line
          x1="432"
          y1="326"
          x2="432"
          y2="359"
          stroke="#555"
          strokeWidth="1.5"
        />
        <rect x="420" y="358" width="24" height="8" fill="#2a2a2a" rx="2" />
      </svg>

      {/* Text */}
      <div style={{ textAlign: "center", marginTop: "4px", zIndex: 10 }}>
        <div
          className="title"
          style={{
            fontSize: "13px",
            letterSpacing: "6px",
            color: "#9b4bc2",
            textTransform: "uppercase",
            marginBottom: "12px",
            fontFamily: "monospace",
          }}
        >
          ⚠ Dashboard ⚠
        </div>

        <h1
          style={{
            fontSize: "42px",
            fontWeight: "900",
            color: "#f0f0f0",
            margin: "0 0 8px 0",
            letterSpacing: "-1px",
            fontFamily: "'Georgia', serif",
            lineHeight: 1,
          }}
        >
          Under Construction
        </h1>

        <p
          style={{
            color: "#666",
            fontSize: "15px",
            margin: "0 0 28px 0",
            letterSpacing: "1px",
            fontFamily: "monospace",
          }}
        >
          Our best workers are on it. Check back soon.
        </p>
      </div>
    </div>
  );
}
