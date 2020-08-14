import React, { useState } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { md } from 'styled-bootstrap-responsive-breakpoints';
import { MenuAltRight } from 'styled-icons/boxicons-regular/MenuAltRight';

const MobileNavMenu = styled(MenuAltRight)`
  position: fixed;
  top: 0;
  right: 0;
  color: ${(props) => (props.toggled ? 'var(--text)' : 'var(--primary)')};
  z-index: 100;
  @media screen and (min-width: ${md}px) {
    visibility: hidden;
  }
`;

const NavMenu = styled.div`
  top: 0;
  right: 0;
  justify-content: center;
  align-items: flex-end;
  flex-direction: column;
  display: flex;
  height: 100vh;
  width: 200px;
  background: var(--navBg);
  position: fixed;

  @media screen and (max-width: ${md}px) {
    position: fixed;
    z-index: 90;
    right: 0;
    width: 200px;
    border-left: 1px solid var(--primary);
    transition: transform 0.3s ease-in-out;
    transform: translateX(${(props) => (props.visible ? '0%' : '100%')});
  }
`;

const NavLinksContainer = styled.nav`
  text-align: center;
  width: 200px;
  &::before {
    font-size: 2rem;
    display: block;
    color: var(--white);
    content: 'Contents';
  }
  a {
    color: var(--white);
    padding: 10px 0px 10px 0px;
    text-decoration: none;
    font-weight: normal;

    &:hover {
      color: var(--white);
    }
    & .active {
      &::before {
        content: '{ ';
        color: var(--white);
      }
      &::after {
        content: ' }';
        color: var(--white);
      }
    }
  }
`;

const Navigation: React.FC = () => {
  const [navExpanded, toggleNavExpand] = useState(false);

  const NavLinks = () => (
    <NavLinksContainer>
      <h2>
        <Link to='/' activeClassName='active'>
          Home
        </Link>
      </h2>
      <h2>
        <Link to='/#past-projects' activeClassName='active'>
          Past.Projects
        </Link>
      </h2>
      <h2>
        <Link to='/#recent-articles' activeClassName='active'>
          Recent.Articles
        </Link>
      </h2>
      <h2>
        <Link to='/#about-owner' activeClassName='active'>
          About.Owner
        </Link>
      </h2>
    </NavLinksContainer>
  );

  return (
    <React.Fragment>
      <MobileNavMenu
        id='nav-menu-button'
        size={48}
        toggled={!navExpanded}
        onClick={() => toggleNavExpand(!navExpanded)}
      />
      <NavMenu id='nav' visible={navExpanded}>
        {NavLinks()}
      </NavMenu>
    </React.Fragment>
  );
};

export default Navigation;
