import { IGeneric } from '@/interfaces/IGenericComponent';
import { elevation } from '@/theme/elevation';
import styled from '@/theme/styled';

export const Tr = styled.tr<IGeneric>`
  display: block;
  width: 100%;
  &:nth-of-type(odd) {
    background: #eee;
  }
  ${elevation}
`;
