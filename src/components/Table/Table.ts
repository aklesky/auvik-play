import { IGeneric } from '@/interfaces/IGenericComponent';
import styled from '@/theme/styled';

export const Table = styled.table<IGeneric>`
  display: flex;

  border-collapse: collapse;
  width: calc(100% - 10px);
  flex-direction: column;
  margin: 0 auto;
`;
export const TBody = styled.tbody<IGeneric>`
  width: 100%;
  height: 350px;
  overflow-y: scroll;
  display:block;
`;
export const THead = styled.thead<IGeneric>`
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
`;
