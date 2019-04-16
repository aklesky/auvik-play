import { ITheme } from '@/interfaces/ITheme';
import { colors } from './colors';

export const theme: ITheme = {
  colors,
  grid: {
    gutterWidth: 1,
    size: 12,
    breakpoints: {
      xs: 320,
      sm: 425,
      md: 768,
      lg: 1024,
    }
  },
};
