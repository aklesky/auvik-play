import { ITheme } from '@/interfaces/ITheme';
import * as styledComponents from 'styled-components';
import { ThemedStyledComponentsModule } from 'styled-components';

const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider,
  withTheme
} = styledComponents as ThemedStyledComponentsModule<ITheme>;

const { ServerStyleSheet } = styledComponents;

export { css, createGlobalStyle, keyframes, ThemeProvider, withTheme, ServerStyleSheet, styled };
export default styled;
