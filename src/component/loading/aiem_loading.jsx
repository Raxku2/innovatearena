import React from 'react';

const AiemSnakeLoader = ({
  color = "#00f3ff",
  speed = "4s",
  strokeWidth = 4,
  glowOpacity = 0.9
}) => {
  return (
    <div className="aiem-container">
      {/* Scope styles specifically to this component instance */}
      <style>{`
        .aiem-container {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
        }

        .snake-svg {
          width: 100%;
          height: 100%;
          display: block;
        }

        .snake-path {
          fill: none;
          stroke: ${color};
          stroke-width: ${strokeWidth};
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 600 400;
          animation: snake-run ${speed} linear infinite;
          filter: drop-shadow(0 0 12px ${color}${Math.floor(glowOpacity * 255).toString(16)});
        }

        @keyframes snake-run {
          from { stroke-dashoffset: 1000; }
          to { stroke-dashoffset: 0; }
        }
      `}</style>

      <svg
        viewBox="0 0 297 297"
        preserveAspectRatio="xMidYMid meet"
        className="snake-svg"
      >
        <path
          className="snake-path"
          pathLength="1000"
          d="M -6.6432775,155.84485 H 62.86016 l -6.92228,-23.19899 -5.425573,17.3057 H 35.919394 L 47.425345,116.08851 H 64.543958 L 82.08352,168.09916 H 44.852875 l -4.022405,12.81557 h 51.003292 v -11.84599 h 9.921878 v -41.40729 h -9.723442 v -11.57552 h 34.395832 v 11.50938 h -9.525 v 41.60572 h 9.39271 v 11.57339 h 54.898 v -12.39463 h -42.47205 l 0.003,-52.29126 h 42.46913 V 128.717 h -27.31494 v 11.085 h 25.35051 v 12.53494 h -25.44414 v 9.12058 h 39.99578 v -45.39239 h 17.57825 l 13.18473,32.54079 13.12713,-32.47063 h 17.53956 v 49.53173 h -15.03725 v -28.13346 l -10.82776,28.08668 h -10.45357 l -10.83599,-28.10099 v 43.32533 h 95.58715"
        />
      </svg>
    </div>
  );
};

export default AiemSnakeLoader;

