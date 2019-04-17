import { IGeneric } from '@/interfaces/IGenericComponent';
import styled from '@/theme/styled';

export const Grid = styled.section<IGeneric>`
  width: 100%;
  margin: 0 auto;
  height: ${props => (props.fullHeight ? '100%' : 'auto')};
`;

Grid.displayName = 'Grid';
