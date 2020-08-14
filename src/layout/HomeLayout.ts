import styled from 'styled-components';

const HomeLayout = styled.header`
  height: 100vh;
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: auto auto 1fr;
  & h1 {
    display: flex;
    align-items: center;
    &[class^='SuperText-'] {
      padding: 0;
      vertical-align: middle;
    }
  }
`;

export default HomeLayout;
