import { IGeneric } from '@/interfaces/IGenericComponent';
import styled from '@/theme/styled';

export const Table = styled.table<IGeneric>`
  display: flex;
  border-collapse: collapse;
  flex-direction: column;
  margin-left: ${props => props.theme.metrics.margin}px;
  margin-right: ${props => props.theme.metrics.margin}px;
`;
export const TBody = styled.tbody<IGeneric>`
  width: 100%;
  height: ${props => props.theme.metrics.tbody}px;
  overflow-y: scroll;
  display:block;
`;
export const THead = styled.thead<IGeneric>`
  width: 100%;
  margin-top: ${props => props.theme.metrics.marginVertical}px;
  margin-bottom: ${props => props.theme.metrics.marginVertical}px;
`;
