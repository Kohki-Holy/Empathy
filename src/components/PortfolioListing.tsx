import React from 'react';

import styled from 'styled-components';
import { Link } from 'gatsby';
import Img from 'gatsby-image';

type Props = {
  title: string;
  description: string;
  slug: string;
  preview: {
    childImageSharp: {
      fixed: any;
    };
  };
};

const Card = styled.div`
  height: 100%;
  width: 100%;
  background-size: cover;
  overflow: hidden;
  position: relative;

  & > .gatsby-image-wrapper {
    width: 100%;
    height: auto;
    display: block;
    filter: brightness(0.8) contrast(1.2);
  }

  & > .card-overlay {
    background: rgba(0, 0, 0, 0.7);
    position: absolute;
    height: 100%;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    opacity: 0;
    transition: all 0.5s ease-in-out 0s;

    & > .card-details {
      position: absolute;
      text-align: center;
      top: 0%;
      left: 50%;
      transform: translate(-50%, -50%);
      transition: all 0.2s ease-in-out 0s;
      opacity: 0;

      & > * {
        padding: 0;
        margin: 0;
      }

      p {
        color: white;
      }
    }
  }

  &:hover {
    box-shadow: 0 0 20px #000000;
    & > .gatsby-image-wrapper {
      filter: brightness(1) contrast(1);
    }
    & > .card-overlay {
      opacity: 1;
      & > .card-details {
        top: 50%;
        opacity: 1;
      }
    }
  }
`;

const PortfolioListing: React.FC<Props> = ({
  title,
  description,
  slug,
  preview: {
    childImageSharp: { fixed },
  },
}) => {
  return (
    <Link to={`/project/${slug}`}>
      <Card>
        <Img fixed={fixed} />
        <div className='card-overlay'>
          <div className='card-details'>
            <h3>{title}</h3>
            <p>{description}</p>
            <h4>View Project</h4>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default React.memo(PortfolioListing);
