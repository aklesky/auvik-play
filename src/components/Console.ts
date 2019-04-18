import { IGeneric } from '@/interfaces/IGenericComponent';
import { elevation } from '@/theme/elevation';
import styled from '@/theme/styled';

export const Console = styled.div<IGeneric>`
  background: ${props => props.background || props.theme.colors.background};
  padding: ${props => props.theme.metrics.paddingVertical}px
    ${props => props.theme.metrics.paddingHorizontal}px;
  margin: ${props => props.theme.metrics.margin}px;
  border: 1px solid ${props => props.theme.colors.lightgray};
  max-height: 700px;
  min-height: 200px;
  overflow-y: scroll;
  ${elevation}
`;
