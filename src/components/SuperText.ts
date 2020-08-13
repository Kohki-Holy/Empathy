import styled from 'styled-components';

const SuperText = styled.h1`
  font-size: 1.5rem;
  padding: 12.5em 0 20em 0;
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
