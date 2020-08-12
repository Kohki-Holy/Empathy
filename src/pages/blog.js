import React from 'react';
import Layout from '../layout/layout';
import { graphql } from 'gatsby';
import PostListing from '../components/PostListing';
import SuperText from '../components/SuperText';

import Container from '../layout/Container';
import SEO from '../components/SEO';

const BlogPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  return (
    <Layout>
      <SEO
        title='Blog - Matthew Secrist'
        description='Words and code.'
        pathname='/blog'
      />
      <Container>
        <SuperText>Blog</SuperText>
        {edges.map((post) => {
          return <PostListing key={post.node.id} {...post.node.frontmatter} />;
        })}
      </Container>
    </Layout>
  );
};

export default BlogPage;

export const pageQuery = graphql`
  {
    allMarkdownRemark(
      filter:{fileAbsolutePath: {regex: "/(\/content\/posts)/.*\\.md$/"}}, 
      sort: { fields: frontmatter___date, order: DESC }) {
      edges {
        node {
          id
          frontmatter {
            slug
            title
            description
            date
          }
        }
      }
    }
  }
`;
