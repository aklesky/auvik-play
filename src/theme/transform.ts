import { css } from './styled';

export const transform = css`
  transform: translate3d(0, 0, 0);
  transition: background 0.4s cubic-bezier(0.25, 0.8, 0.25, 1),
    box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
  &:hover {
    transform: scale(1.02);
  }
`;
