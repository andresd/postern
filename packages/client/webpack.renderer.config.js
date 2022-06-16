/* eslint-disable @typescript-eslint/no-var-requires */
const rules = require('./webpack.rules')
const plugins = require('./webpack.plugins')
const path = require('path')

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
})

module.exports = {
  module: {
    rules
  },
  plugins: plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
    alias: {
      '@components': path.resolve(__dirname, './src/client/components/'),
      '@views': path.resolve(__dirname, './src/client/views/'),
      '@pages': path.resolve(__dirname, './src/client/pages/'),
      '@styles': path.resolve(__dirname, './src/client/styles/'),
      '@lib': path.resolve(__dirname, './src/lib/'),
      '@state': path.resolve(__dirname, './src/state/'),
      '@assets': path.resolve(__dirname, './src/assets/'),
      '@config': path.resolve(__dirname, './src/lib/config/'),
      '@types': path.resolve(__dirname, './src/lib/types/'),
      '@postern/engine': path.resolve(__dirname, '../engine/src/'),
      '@postern/core': path.resolve(__dirname, '../core/src/')
    },
    fallback: {
      assert: require.resolve('assert/'),
      buffer: require.resolve('buffer/'),
      crypto: require.resolve('crypto-browserify'),
      events: require.resolve('events/'),
      http: require.resolve('stream-http'),
      path: require.resolve('path-browserify'),
      stream: require.resolve('stream-browserify'),
      url: require.resolve('url/'),
      zlib: require.resolve('browserify-zlib')
    }
  }
}
