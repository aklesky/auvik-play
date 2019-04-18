import { IGeneric } from '@/interfaces/IGenericComponent';
import { elevation } from '@/theme/elevation';
import styled from '@/theme/styled';

export const Tr = styled.tr<IGeneric>`
  display: block;
  width: 100%;
  background: ${props => props.theme.colors.gray200};
  color: ${props => props.theme.colors.white};
  &:nth-of-type(odd) {
    background: ${props => props.theme.colors.white};
    color: ${props => props.theme.colors.background};
  }
  ${elevation}
`;
