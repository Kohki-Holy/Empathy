require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: 'エンパシー',
    titleTemplate: '%s',
    siteUrl: 'https://empathy-holy.netlify.app/',
    description:
      '光合成だけで生きたいエンジニア・ホリイケの個人Webサイトです。',
    twitterUsername: '@holy_OTP',
    twitter: 'https://twitter.com/holy_OTP',
    github: 'http://www.github.com/kohki-holy',
    email: 'kohki.holy@gmail.com',
  },
  plugins: [
    'gatsby-plugin-typescript',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-styled-components',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_TRACKING_ID,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content`,
        name: 'posts',
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false,
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 590,
              backgroundColor: 'transparent',
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-graphql-codegen',
      options: {
        documentPaths: ['./src/**/*.{ts,tsx}'],
        fileName: 'types/graphql-types.d.ts',
      },
    },
  ],
};
