const { mergeWith } = require('docz-utils')
const fs = require('fs-extra')

let custom = {}
const hasGatsbyConfig = fs.existsSync('./gatsby-config.custom.js')

if (hasGatsbyConfig) {
  try {
    custom = require('./gatsby-config.custom')
  } catch (err) {
    console.error(
      `Failed to load your gatsby-config.js file : `,
      JSON.stringify(err),
    )
  }
}

const config = {
  pathPrefix: '/',

  siteMetadata: {
    title: 'Lanista Coach',
    description: 'Lanista website',
  },
  plugins: [
    {
      resolve: 'gatsby-theme-docz',
      options: {
        themeConfig: {},
        src: './',
        gatsbyRoot: null,
        themesDir: 'src',
        mdxExtensions: ['.md', '.mdx'],
        docgenConfig: {},
        menu: [],
        mdPlugins: [],
        hastPlugins: [],
        ignore: [],
        typescript: false,
        ts: false,
        propsParser: true,
        'props-parser': true,
        debug: false,
        native: false,
        openBrowser: null,
        o: null,
        open: null,
        'open-browser': null,
        root: '/Users/rafaeldiaz/Documents/development/lanista-workout/.docz',
        base: '/',
        source: './',
        'gatsby-root': null,
        files: '**/*.{md,markdown,mdx}',
        public: '/public',
        dest: '.docz/dist',
        d: '.docz/dist',
        editBranch: 'master',
        eb: 'master',
        'edit-branch': 'master',
        config: '',
        title: 'Lanista Coach',
        description: 'Lanista website',
        host: 'localhost',
        port: 3000,
        p: 3000,
        separator: '-',
        paths: {
          root: '/Users/rafaeldiaz/Documents/development/lanista-workout',
          templates:
            '/Users/rafaeldiaz/Documents/development/lanista-workout/node_modules/docz-core/dist/templates',
          docz: '/Users/rafaeldiaz/Documents/development/lanista-workout/.docz',
          cache:
            '/Users/rafaeldiaz/Documents/development/lanista-workout/.docz/.cache',
          app:
            '/Users/rafaeldiaz/Documents/development/lanista-workout/.docz/app',
          appPackageJson:
            '/Users/rafaeldiaz/Documents/development/lanista-workout/package.json',
          appTsConfig:
            '/Users/rafaeldiaz/Documents/development/lanista-workout/tsconfig.json',
          gatsbyConfig:
            '/Users/rafaeldiaz/Documents/development/lanista-workout/gatsby-config.js',
          gatsbyBrowser:
            '/Users/rafaeldiaz/Documents/development/lanista-workout/gatsby-browser.js',
          gatsbyNode:
            '/Users/rafaeldiaz/Documents/development/lanista-workout/gatsby-node.js',
          gatsbySSR:
            '/Users/rafaeldiaz/Documents/development/lanista-workout/gatsby-ssr.js',
          importsJs:
            '/Users/rafaeldiaz/Documents/development/lanista-workout/.docz/app/imports.js',
          rootJs:
            '/Users/rafaeldiaz/Documents/development/lanista-workout/.docz/app/root.jsx',
          indexJs:
            '/Users/rafaeldiaz/Documents/development/lanista-workout/.docz/app/index.jsx',
          indexHtml:
            '/Users/rafaeldiaz/Documents/development/lanista-workout/.docz/app/index.html',
          db:
            '/Users/rafaeldiaz/Documents/development/lanista-workout/.docz/app/db.json',
        },
      },
    },
  ],
}

const merge = mergeWith((objValue, srcValue) => {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue)
  }
})

module.exports = merge(config, custom)
