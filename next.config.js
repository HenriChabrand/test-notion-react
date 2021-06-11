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
        destination: '/d694391183b84f7abde2f8b6893bd087',
        // don't set permanent to true because it will get cached by browser
        // while developing on localhost
        permanent: false
      }
    ]
  }
})
