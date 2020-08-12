import styled from 'styled-components';

const SuperText = styled.h1`
  @media screen and (max-width: 350px) {
    font-size: 2.5rem;
  }

  @media screen and (min-width: 350px) {
    font-size: 3.5rem;
  }

  @media screen and (min-width: 700px) {
    font-size: 5rem;
  }

  padding: 2vh 0 10vh 0;
  margin: 0;
  &::before {
    content: '<';
    color: var(--text);
  }
  &::after {
    content: ' />';
    color: var(--text);
  }
`;

export default SuperText;
