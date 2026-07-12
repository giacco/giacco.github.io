export const theme = {
  colors: {
    background: '#030603',
    surface: 'rgba(5, 15, 8, 0.88)',
    surfaceStrong: '#071109',
    primary: '#00ff66',
    primarySoft: '#73ffab',
    text: '#d9ffe5',
    muted: '#83aa8f',
    border: 'rgba(0, 255, 102, 0.28)',
    shadow: 'rgba(0, 255, 102, 0.16)',
  },
  fonts: {
    mono: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
  },
  breakpoints: {
    mobile: '680px',
    tablet: '960px',
  },
} as const;

export type PortfolioTheme = typeof theme;
