import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { Link } from 'gatsby';

type Props = {
  slug: string;
  title: string;
  description: string;
  date: string;
};

const PostTitle = styled.h1`
  padding-bottom: 0;
  margin-bottom: 0;
`;

const PostListing: React.FC<Props> = ({ slug, title, description, date }) => {
  return (
    <React.Fragment key={`${slug}`}>
      <Link to={`/blog/${slug}`}>
        <PostTitle>{title}</PostTitle>
      </Link>
      <sub>{moment(date).format('LL')}</sub>
      <p>{description}</p>
    </React.Fragment>
  );
};
export default PostListing;
