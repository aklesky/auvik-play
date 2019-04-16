import { createGlobalStyle } from './styled';

export default createGlobalStyle<{
  theme: any;
}>`
body {
  padding: 0;
  margin: 0;
  width: 100%;
  background: ${props => props.theme.colors.background};
  font-family: "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
}
.wf-active {
  & body {
    font-family: Roboto;
  }
}
html, body, #root, main {
  height: 100%;
  min-height: 100%;
}
#root {
  display: flex;
  flex-direction: column;
}
*:focus {
  outline: none;
}
`;
