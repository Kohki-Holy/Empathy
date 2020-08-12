import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import Layout from '../layout/layout';

import Container from '../layout/Container';
import SuperText from '../components/SuperText';
import SEO from '../components/SEO';
import PostListing from '../components/PostListing';

const RecentPostsContainer = styled.div`
  padding-top: 20vh;
  text-align: left;

  .title {
    font-size: 2em;
    color: var(--text);
  }
`;

const IndexPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => (
  <Layout>
    <Container>
      <SEO title='Matthew Secrist' />
      <SuperText>Hello</SuperText>
      <div>
        <h1>ホリイケのWebサイトです。</h1>
        <p>
          ポートフォリオサイトも兼ねています。現在制作中なので、そのうちコンテンツを追加していきます。
        </p>

        <RecentPostsContainer>
          <h1 className='title'>Recent Posts</h1>
          <div id='recent-posts'>
            {edges.map((post) => (
              <PostListing key={post.node.id} {...post.node.frontmatter} />
            ))}
          </div>
        </RecentPostsContainer>
      </div>
    </Container>
  </Layout>
);

export default IndexPage;

export const pageQuery = graphql`
  {
    allMarkdownRemark(
      limit: 3
      filter:{fileAbsolutePath: {regex: "/(\/content\/posts)/.*\\.md$/"}}, 
      sort: { fields: frontmatter___date, order: DESC }
    ) {
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
