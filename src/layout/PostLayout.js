import React from 'react';
import styled from 'styled-components';
import Layout from './layout';
import { graphql } from 'gatsby';

import GoBack from '../components/GoBack';
import SEO from '../components/SEO';
import moment from 'moment';

const PostContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;

  .gatsby-highlight {
    max-width: 800px;
    margin: 0 auto;
    padding: 10px 0px 10px 0px;
  }
`;

const PostLayout = ({
  data: {
    markdownRemark: {
      frontmatter: { slug, title, description, date },
      html,
    },
  },
}) => {
  return (
    <Layout>
      <SEO
        title={`${title} - Matthew Secrist`}
        description={description}
        pathname={`/blog/${slug}`}
      />
      <GoBack to='/blog' name='Blog' />
      <h1>{title}</h1>
      <sub>{moment(date).format('LL')}</sub>
      <PostContainer dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  );
};

export default PostLayout;

export const query = graphql`
  query postBySlug($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        slug
        title
        description
        date
      }
      html
    }
  }
`;
