import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';

const SEO = ({ title, description, pathname, article }) => (
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
        title: title || defaultTitle,
        description: description || defaultDescription,
        url: `${siteUrl}${pathname || '/'}`,
      };

      return (
        <React.Fragment>
          <Helmet title={seo.title} titleTemplate={titleTemplate}>
            <meta name='description' content={seo.description} />
            <meta propery='og:locale' content='en' />
            {seo.url && <meta property='og:url' content={seo.url} />}
            {article && <meta property='og:type' content='article' />}
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
            <meta
              name='keywords'
              content={`web developer, web developer in boone iowa, front end developer, elixir, react, javascript, matthew secrist, matthewsecrist`}
            />
          </Helmet>
        </React.Fragment>
      );
    }}
  />
);

export default SEO;

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  pathname: PropTypes.string,
  article: PropTypes.bool,
};

SEO.defaultProps = {
  title: null,
  description: null,
  pathname: null,
  article: false,
};

const query = graphql`
  query SEO {
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
