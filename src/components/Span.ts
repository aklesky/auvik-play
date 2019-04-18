import { IGeneric } from '@/interfaces/IGenericComponent';
import styled from '@/theme/styled';

export const Span = styled.span<IGeneric>`
  background: ${props => props.background || `transparent`};
  padding: ${props => props.theme.metrics.paddingVertical}px 0;
  color: ${props => props.color || props.theme.colors.white};
`;
