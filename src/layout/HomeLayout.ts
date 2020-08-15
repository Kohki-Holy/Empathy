import styled from 'styled-components';

const HomeLayout = styled.header`
  height: 100vh;
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: 1fr 1fr;
  & h1 {
    padding: 0;
    display: flex;
    align-items: flex-end;
  }
  & p {
    font-size: 1rem;
  }
`;

export default HomeLayout;
