import { IGeneric } from '@/interfaces/IGenericComponent';
import { elevation } from '@/theme/elevation';
import styled from '@/theme/styled';

export const Header = styled.header<IGeneric>`
  background: ${props => props.theme.colors.secondary};
  padding: ${props => props.theme.metrics.paddingVertical}px
    ${props => props.theme.metrics.paddingHorizontal}px;
  ${elevation}
`;
