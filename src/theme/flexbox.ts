import { IFlexbox } from '@/interfaces/IFlexbox';
import { css } from './styled';

export const flexbox = css`
  display: flex;
  flex-direction: ${(props: IFlexbox) => (props.direction ? props.direction : 'column')};
  justify-content: ${(props: IFlexbox) => (props.justifyContent ? props.justifyContent : 'flex-start')};
  align-items: ${(props: IFlexbox) => (props.alignItems ? props.alignItems : 'flex-start')};
`;
