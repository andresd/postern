/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: './src/index.ts',
  // Put your normal webpack config below here
  module: {
    rules: require('./webpack.rules')
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
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
      assert: false,
      buffer: false,
      crypto: false,
      events: false,
      fs: false,
      http: false,
      path: false,
      os: false,
      stream: false,
      url: false,
      zlib: false
    }
  }
}
