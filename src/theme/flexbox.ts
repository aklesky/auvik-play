import { IFlexbox } from '@/interfaces/IFlexbox';
import { css } from './styled';

export const flexbox = css<IFlexbox>`
  display: flex;
  flex-direction: ${props => (props.direction ? props.direction : 'column')};
  justify-content: ${props => (props.justifyContent ? props.justifyContent : 'flex-start')};
  align-items: ${props => (props.alignItems ? props.alignItems : 'flex-start')};
`;
