import '@emotion/react';
import type { PortfolioTheme } from './theme';

declare module '@emotion/react' {
  export interface Theme extends PortfolioTheme {}
}
