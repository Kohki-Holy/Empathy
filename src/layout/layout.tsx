import React from 'react';
import styled from 'styled-components';

import GlobalStyle from '../theme/GlobalStyle';
import Navigation from './Navigation';
import { md } from 'styled-bootstrap-responsive-breakpoints';

import SocialMediaLinks from '../components/socialMediaLinks';

const ContentContainer = styled.div`
  padding: 2vw;
  margin-right: 250px;

  @media screen and (max-width: ${md}px) {
    margin-right: 0;
  }
`;

const Foot = styled.div`
  padding-top: 20vh;
  font-size: 0.75em;
  text-align: center;
`;

const getCopyrightYear = (y?: number): string => {
  const t: string = `${new Date().getFullYear()}`;
  return y ? `${y} - ${t}` : t;
};

const Layout: React.FC<any> = ({ children }) => {
  return (
    <React.Fragment>
      <GlobalStyle />
      <Navigation />
      <ContentContainer>
        {children}
        <Foot>
          <SocialMediaLinks />
          Built by <a href='http://www.gatsbyjs.org'>Gatsby</a>.
          <p>&copy; Copyright {getCopyrightYear()}, Empathy</p>
        </Foot>
      </ContentContainer>
    </React.Fragment>
  );
};

export default Layout;
