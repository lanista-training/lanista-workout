const withCSS = require('@zeit/next-css')

const config = {
  target: "serverless",
  assetPrefix: "https://lanistaworkout.s3.amazonaws.com",
  experimental: {
    granularChunks: true
  }
};

module.exports = withCSS(config)
