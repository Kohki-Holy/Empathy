import styled from 'styled-components';

const SuperText = styled.h1`
  font-size: 2.5rem;
  padding: 2.5em 0 5em 0;
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
