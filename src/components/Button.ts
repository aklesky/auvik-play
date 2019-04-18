import { IGeneric } from '@/interfaces/IGenericComponent';
import { elevation } from '@/theme/elevation';
import { flexbox } from '@/theme/flexbox';
import styled from '@/theme/styled';
import { transform } from '@/theme/transform';

export const Button = styled.button<IGeneric>`
  ${flexbox}
  justify-content: center;
  align-items: center;
  height: 100%;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.metrics.padding}px;
  margin-top: ${props => props.theme.metrics.margin}px;
  margin-bottom: ${props => props.theme.metrics.margin}px;
  cursor: pointer;
  width: calc(100% - ${props => props.theme.metrics.margin}px);
  ${elevation};
  color: ${props => props.theme.colors.white};
  &:visited,
  &:hover,
  &:visited {
    color: ${props => props.theme.colors.white};
  }
  &:hover {
    ${transform};
  }
`;
