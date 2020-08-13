const path = require('path')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions

  const blogPosts = await graphql(`
    {
      allMarkdownRemark(filter: { frontmatter: { type: { eq: "post" } } }) {
        edges {
          node {
            frontmatter {
              slug
            }
          }
        }
      }
    }
  `)

  const blogTemplate = path.resolve('src/layout/PostLayout.tsx')

  blogPosts.data.allMarkdownRemark.edges.forEach(edge => {
    const { slug } = edge.node.frontmatter
    createPage({
      path: `/blog/${slug}`,
      component: blogTemplate,
      context: {
        slug: slug
      }
    })
  })

  /*   const portfolioPages = await graphql(`
    {
      allMarkdownRemark(filter: { frontmatter: { type: { eq: "project" } } }) {
        edges {
          node {
            frontmatter {
              slug
            }
          }
        }
      }
    }
  `)

  const portfolioTemplate = path.resolve('src/layout/ProjectLayout.js')

  portfolioPages.data.allMarkdownRemark.edges.forEach(edge => {
    const { slug } = edge.node.frontmatter
    createPage({
      path: `/project/${slug}`,
      component: portfolioTemplate,
      context: {
        slug: slug
      }
    })
  }) */

  // Create redirects from old pages to new.
  /*
  createRedirect({
    fromPath: '/supprtbot-writeup',
    toPath: '/project/supprtbot',
    isPermanent: true
  })

  createRedirect({
    fromPath: '/freedom-genetics-llc-website',
    toPath: '/project/freedom-genetics-llc',
    isPermanent: true
  })

  createRedirect({
    fromPath: '/colorboxes-writeup',
    toPath: '/project/color-boxes',
    isPermanent: true
  })

  createRedirect({
    fromPath: '/nomadically-write-up',
    toPath: '/project/nomadically',
    isPermanent: true
  })

  createRedirect({
    fromPath: '/newsfeeder-writeup',
    toPath: '/project/newsfeeder',
    isPermanent: true
  })

  createRedirect({
    fromPath: '/building-a-basic-http-server-with-elixir-p1',
    toPath: '/blog/building-a-basic-http-server-with-elixir-p1',
    isPermanent: true
  })

  createRedirect({
    fromPath: '/building-a-basic-http-server-with-elixir-p2',
    toPath: '/blog/building-a-basic-http-server-with-elixir-p2',
    isPermanent: true
  })
  */
}
