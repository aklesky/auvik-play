import { IGeneric } from '@/interfaces/IGenericComponent';
import { flexbox } from '@/theme/flexbox';
import styled from '@/theme/styled';

export const Row = styled.div<IGeneric>`
  ${flexbox}
  flex-flow: row wrap;
  flex: 0 1 auto;
  height: ${props => (props.fullHeight ? '100%' : 'auto')};
  width: 100%;
`;

Row.displayName = 'Row';
