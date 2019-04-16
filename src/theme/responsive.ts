import { IResponsive } from '@/interfaces/IResponsive';
import { css } from './styled';

export const responsive = css<IResponsive>`
  width: 100%;
  ${props =>
    Object.keys(props)
      .filter(def => props.theme.grid.breakpoints[def])
      .sort((a, b) => props.theme.grid.breakpoints[a] - props.theme.grid.breakpoints[b])
      .map(
        size => `
        @media only screen and (min-width: ${props.theme.grid.breakpoints[size]}px) {
          flex-basis: ${(100 / props.theme.grid.size) * props[size]}%;
          max-width: ${(100 / props.theme.grid.size) * props[size]}%;
          width: ${(100 / props.theme.grid.size) * props[size]}%;
        }
      `
      )}
`;
