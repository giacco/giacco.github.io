import { useEffect, useState } from 'react';
import styled from '@emotion/styled';

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 999;
  display: grid;
  place-items: center;
  padding: 24px;
  background: #010301;
`;

const Screen = styled.div`
  width: min(760px, 100%);
  color: ${({ theme }) => theme.colors.primary};
  font-size: clamp(.78rem, 2vw, 1rem);
  line-height: 1.8;
  text-shadow: 0 0 14px ${({ theme }) => theme.colors.shadow};
  white-space: pre-wrap;
`;

const Cursor = styled.span`
  display: inline-block;
  width: .65em;
  height: 1em;
  margin-left: 4px;
  vertical-align: -.12em;
  background: currentColor;
  animation: blink .8s steps(1) infinite;

  @keyframes blink {
    50% { opacity: 0; }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const lines = [
  'BOOTING PORTFOLIO OS...',
  'Initializing React runtime... OK',
  'Loading TypeScript modules... OK',
  'Mounting portfolio sections... OK',
  'Starting interactive shell... OK',
  'Welcome, guest.',
];

export function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      onComplete();
      return;
    }

    const timers = lines.map((line, index) =>
      window.setTimeout(() => {
        setVisibleLines((current) => [...current, line]);

        if (index === lines.length - 1) {
          window.setTimeout(onComplete, 1450);
        }
      }, 360 * index),
    );

    return () => timers.forEach(window.clearTimeout);
  }, [onComplete]);

  return (
    <Overlay role="status" aria-live="polite" aria-label="Portfolio loading">
      <Screen>
        {visibleLines.join('\n')}
        <Cursor aria-hidden="true" />
      </Screen>
    </Overlay>
  );
}
