import { IGeneric } from '@/interfaces/IGenericComponent';
import { elevation } from '@/theme/elevation';
import styled from '@/theme/styled';
import { transform } from '@/theme/transform';

export const Button = styled.button<IGeneric>`
  width: 100%;
  margin: 10px 0;
  padding: 10px;
  border: none;
  white-space: nowrap;
  cursor: pointer;
  box-sizing: border-box;
  outline: 0;
  &:hover {
    ${transform}
  }
  ${elevation}
`;
