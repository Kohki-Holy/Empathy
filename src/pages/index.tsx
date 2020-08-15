import React from 'react';
import { graphql } from 'gatsby';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { md } from 'styled-bootstrap-responsive-breakpoints';

import Layout from '../layout/layout';
import Container from '../layout/Container';
import HomeLayout from '../layout/HomeLayout';

// import SuperTitle from '../components/SuperTitle';
import SuperText from '../components/SuperText';
import SEO from '../components/SEO';
import PostListing from '../components/PostListing';

import { PagesIndexQuery } from '../../types/graphql-types';

type Props = {
  data: PagesIndexQuery;
};

const RecentPostsContainer = styled.section`
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

const PortfolioContainer = styled(RecentPostsContainer)`
  & h2 {
    padding-top: 1em;
  }
  & table {
    width: 100%;
  }
  & tr:nth-child(2n) {
    background-color: #eee;
  }
  & th,
  td {
    padding: 1em 0em 1em 1em;
  }
  & th {
    width: 20%;
  }

  @media screen and (max-width: ${md}px) {
    & tr:nth-child(2n) {
      background-color: transparent;
    }
    & th,
    td {
      display: block;
    }
    & th {
      width: auto;
      background-color: #eee;
    }
  }
`;

const IndexPage: React.FC<Props> = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => (
  <Layout>
    <Container>
      <SEO title='エンパシー' />
      <HomeLayout>
        <SuperText>empathy</SuperText>
        <p>
          ホリイケのブログ兼ポートフォリオサイト的な個人Webサイトです。
          <br />
          Web制作をメインに業務に携わってきたので技術面では未熟です。技術に対する好奇心だけで突っ走っています。
        </p>
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
          <p>
            使用技術：HTML、CSS in
            js、TypeScript、React.js、GatsbyJS、Linux（WSL2／Ubuntu18.04）
          </p>
          <h2>ESLint + Prettierの設定</h2>
          <p>
            当サイトのブログ記事。あまりに会心の出来で、解決したときが気持ちよすぎたので制作事例として載せてしまった。
          </p>
          <p>使用技術：Google検索、英語を読む心構え、Visual Studio Code</p>
          <p>
            <Link to='/blog/7a8u9ezf8fy23'>
              VSCode + ESLint + Prettier
              の設定を完全に理解した【公式の英語ドキュメントに結論書いてた】
            </Link>
          </p>
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
          <h2>成分</h2>
          <table>
            <tr>
              <th>できる</th>
              <td>日本語、HTML、CSS、JavaScript、bootstrap</td>
            </tr>
            <tr>
              <th>さわれる（実務経験アリ）</th>
              <td>PHP、VBA</td>
            </tr>
            <tr>
              <th>勉強中</th>
              <td>React.js、TypeScript、Laravel</td>
            </tr>
            <tr>
              <th>趣味</th>
              <td>ウイスキー、ゲーム、音楽、技術・心理学の勉強</td>
            </tr>
            <tr>
              <th>得意</th>
              <td>興味あること</td>
            </tr>
            <tr>
              <th>苦手</th>
              <td>興味ないこと、力仕事</td>
            </tr>
          </table>
          <h2>人物</h2>
          <p>ホリイケ コウキ - 堀池 幸輝</p>
          <p>1994年生まれ。Web制作実務 7年。</p>
          <p>
            元々興味があったプログラミングを独学で学んでいたところ、運良くWeb制作会社に拾われる。そこからコーディング、CMS構築、ECショップ制作・運営、Webデザインを中心に3社経験し現在へ至る。
          </p>
          <p>
            興味・好奇心を全ての行動原理としており、それによりデザインや写真撮影といった本来の業務ではない仕事にも参加させてもらう。好奇心が悪い方に働くことも多く、本来の目的を忘れて暴走してし遠回りになってしまうこともあるが、本人は満足している。
          </p>
          <p>休日はウイスキー片手にeSports観戦しているらしい。</p>
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
