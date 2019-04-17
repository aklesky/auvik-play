import { IGeneric } from '@/interfaces';
import { responsive } from '@/theme/responsive';
import styled from '@/theme/styled';

export const Column = styled.div<IGeneric>`
  ${responsive}
  ${props =>
    props.fullHeight
      ? `@media only screen and (min-width: ${props.theme.grid.breakpoints.md}px) { height: 100%;}`
      : `height: auto;`}
`;

Column.displayName = 'Column';
