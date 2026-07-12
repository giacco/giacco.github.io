import { Global, css } from '@emotion/react';
import type { PortfolioTheme } from './theme';

export function GlobalStyles({ theme }: { theme: PortfolioTheme }) {
  return (
    <Global
      styles={css`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap');

        :root {
          font-family: ${theme.fonts.mono};
          color: ${theme.colors.text};
          background: ${theme.colors.background};
          font-synthesis: none;
          text-rendering: optimizeLegibility;
        }

        * { box-sizing: border-box; }

        html { scroll-behavior: smooth; }

        body {
          margin: 0;
          min-width: 320px;
          min-height: 100vh;
          overflow-x: hidden;
          background:
            radial-gradient(circle at 20% 10%, rgba(0, 255, 102, 0.08), transparent 34rem),
            linear-gradient(180deg, #020402 0%, ${theme.colors.background} 100%);
        }

        body::before {
          content: '';
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 100;
          opacity: 0.16;
          background: repeating-linear-gradient(
            0deg,
            rgba(255,255,255,0.025) 0,
            rgba(255,255,255,0.025) 1px,
            transparent 1px,
            transparent 4px
          );
        }

        a { color: inherit; }
        button, input { font: inherit; }
        ::selection { background: ${theme.colors.primary}; color: #001a08; }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
          }
        }
      `}
    />
  );
}
