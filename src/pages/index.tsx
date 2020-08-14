import React from 'react';
import { graphql } from 'gatsby';
import { Link } from 'gatsby';
import styled from 'styled-components';

import Layout from '../layout/layout';
import Container from '../layout/Container';
import HomeLayout from '../layout/HomeLayout';

import SuperTitle from '../components/SuperTitle';
import SuperText from '../components/SuperText';
import SEO from '../components/SEO';
import PostListing from '../components/PostListing';

import { PagesIndexQuery } from '../../types/graphql-types';

type Props = {
  data: PagesIndexQuery;
};

const PortfolioContainer = styled.section`
  padding-top: 20vh;
  min-height: 80vh;
  text-align: left;

  .title {
    font-size: 2rem;
    padding: 0 0 1em;
    &::before {
      content: '<title=';
    }
  }
`;
const RecentPostsContainer = PortfolioContainer;

const IndexPage: React.FC<Props> = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => (
  <Layout>
    <Container>
      <SEO title='エンパシー' />
      <HomeLayout>
        <SuperTitle>エンパシー</SuperTitle>
        <SuperTitle>堀池幸輝</SuperTitle>
        <SuperText>empathy</SuperText>
      </HomeLayout>
      <div>
        <PortfolioContainer id='past-projects'>
          <SuperText className='title'>Past.Projects</SuperText>
          <h2>このサイト</h2>
          <p>
            GatsbyJS という React.js を使用した静的サイトジェネレーターで制作。
          </p>
          <p>
            デザインは
            <a href='https://www.gatsbyjs.org/showcase/www.matthewsecrist.net'>
              Gatsby上で配布されているテーマ
            </a>
            を元に、伊藤計劃の小説『ハーモニー』を意識してアレンジしている。
          </p>
          <h2>メモアプリ</h2>
          <p>React.jsの勉強のために制作した。Google Keepの改造版。</p>
        </PortfolioContainer>
        <RecentPostsContainer id='recent-articles'>
          <SuperText className='title'>Recent.Articles</SuperText>
          <div id='recent-posts'>
            {edges.map((post: any) => (
              <PostListing key={post.node.id} {...post.node.frontmatter} />
            ))}
          </div>
          <p style={{ textAlign: 'left', textIndent: '1em' }}>
            <Link to='/blog'>記事一覧へ</Link>
          </p>
        </RecentPostsContainer>
        <PortfolioContainer id='about-owner'>
          <SuperText className='title'>About.Owner</SuperText>
          <p>ホリイケ コウキ</p>
          <p>1994年生まれ。Web制作実務 7年。</p>
          <p>
            元々興味があったプログラミングを独学で学んでいたところ、運良くWeb制作会社に拾われる。そこからコーディング、CMS構築、ECショップ制作・運営、Webデザインを中心に3社経験し現在へ至る。
          </p>
          <p>
            興味・好奇心を全ての行動原理としており、それによりデザインや写真撮影といった本来の業務ではない仕事にも参加させてもらう。好奇心が悪い方に働くことも多く、本来の目的を忘れて暴走してし遠回りになってしまうこともあるが、本人は満足している。
          </p>
          <p>
            趣味はゲームと酒と映画。休日はウイスキー片手にeSports観戦している。
          </p>
        </PortfolioContainer>
      </div>
    </Container>
  </Layout>
);

export default IndexPage;

export const pageQuery = graphql`
query PagesIndex {
    allMarkdownRemark(
      limit: 3
      filter: {fileAbsolutePath: {regex: "/(\/content\/posts)/.*\\.md$/"}}, 
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
