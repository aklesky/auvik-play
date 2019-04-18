import { IGeneric } from '@/interfaces/IGenericComponent';
import { elevation } from '@/theme/elevation';
import styled from '@/theme/styled';

export const Header = styled.header<IGeneric>`
  background: ${props => props.background || props.theme.colors.secondary};
  padding: ${props => props.theme.metrics.paddingVertical}px
    ${props => props.theme.metrics.paddingHorizontal}px;
  color: ${props => props.color || props.theme.colors.background};
  margin: ${props => props.theme.metrics.margin}px;
  ${elevation}
`;
