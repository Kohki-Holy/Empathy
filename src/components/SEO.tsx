import React from 'react';
import { Helmet } from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

type Props = {
  title?: string | null;
  description?: string | null;
  pathname?: string | null;
  article?: boolean;
};

const SEO: React.FC<Props> = (props) => (
  <StaticQuery
    query={query}
    render={({
      site: {
        siteMetadata: {
          defaultTitle,
          titleTemplate,
          defaultDescription,
          siteUrl,
          twitterUsername,
        },
      },
    }) => {
      const seo = {
        title: props.title || defaultTitle,
        description: props.description || defaultDescription,
        url: `${siteUrl}${props.pathname || '/'}`,
        article: props.article,
      };

      return (
        <React.Fragment>
          <Helmet title={seo.title} titleTemplate={titleTemplate}>
            <meta name='description' content={seo.description} />
            <meta property='og:locale' content='en' />
            {seo.url && <meta property='og:url' content={seo.url} />}
            {seo.article && <meta property='og:type' content='article' />}
            {seo.title && <meta property='og:title' content={seo.title} />}

            {seo.description && (
              <meta property='og:description' content={seo.description} />
            )}

            {twitterUsername && (
              <meta name='twitter:creator' content={twitterUsername} />
            )}
            {seo.title && <meta name='twitter:title' content={seo.title} />}
            {seo.description && (
              <meta name='twitter:description' content={seo.description} />
            )}
            <meta name='keywords' content={`empathy`} />
          </Helmet>
        </React.Fragment>
      );
    }}
  />
);

SEO.defaultProps = {
  title: null,
  description: null,
  pathname: null,
  article: false,
};

export default SEO;

const query = graphql`
  query componentsSEO {
    site {
      siteMetadata {
        defaultTitle: title
        defaultDescription: description
        siteUrl: siteUrl
        twitterUsername
        titleTemplate
      }
    }
  }
`;
