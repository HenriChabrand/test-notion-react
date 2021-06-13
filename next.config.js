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
        destination: '/8573f85704334e17839a33fc61dad200',
        // don't set permanent to true because it will get cached by browser
        // while developing on localhost
        permanent: false
      }
    ]
  }
})
