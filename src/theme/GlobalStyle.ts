import { createGlobalStyle } from 'styled-components';

const primaryDark = 'hsl(0, 0%, 10%)';
const secondaryDark = 'hsl(0, 0%, 13%)';

const primaryMid = 'hsl(0, 0%, 25%)';
const secondaryMid = 'hsl(0, 0%, 35%)';

const primaryLight = 'hsl(0, 0%, 80%)';
const secondaryLight = 'hsl(0, 0%, 85%)';

const white = 'hsl(0, 0%, 100%)';

const black = '#222222';
const lightWhite = '#FFFFFF';

const GlobalStyle = createGlobalStyle`
  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }
  
  body {
    --bg: ${white};
    --text: ${primaryDark};   
    --primary: ${primaryMid};  
    --navBg: ${secondaryDark};
    --navText: ${white};
    --semiDark: ${primaryMid};
    --codeBg: transparent;
    --shadow: ${black};
    --white: ${lightWhite};

    &.dark {
      --bg: ${primaryDark};
      --text: ${primaryLight};
      --primary: ${secondaryLight};
      --shadow: transparent;
      --codeBg: ${secondaryMid};
    }

    background-color: var(--bg);

    color: var(--text);

    font-family: 'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif;
    font-weight: 400;
    transition: background-color 0.3s ease-in-out;
    font-size: 1.0rem;

    text-rendering: optimizeLegibility;
    font-kerning: normal;

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-smooth: always;
  }

  h1, h2, h3, h4, h5 {
    font-family: 'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif;
    font-weight: 700;
    color: var(--primary);
  }

  h1 {
    font-size: 2rem;
  }

  a {
    font-weight: bold;
    text-decoration: underline;
    color: var(--primary);

    &:hover {
      text-decoration: none;
    }

  }
`;

export default GlobalStyle;
