'use strict'

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

module.exports = withBundleAnalyzer({
  async redirects() {
    return [
      // redirect the index page to our notion test suite
      {
        source: '/',
        destination: '/3d4717b3f7554c33823485884edee79c',
        // don't set permanent to true because it will get cached by browser
        // while developing on localhost
        permanent: false
      }
    ]
  }
})
