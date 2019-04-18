import { IGeneric } from '@/interfaces/IGenericComponent';
import styled from '@/theme/styled';

export const Td = styled.td<IGeneric>`
  padding: ${props => props.theme.metrics.padding}px;
  text-align: center;
  display:inline-block;
  width: calc(45% - ${props => props.theme.metrics.padding}px);
`;
export const Th = styled.th<IGeneric>`
  padding: ${props => props.theme.metrics.padding}px;
  text-align: center;
  display:inline-block;
  font-weight: normal;
  width: calc(45% - ${props => props.theme.metrics.padding}px);
`;
