// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { getLoader, loaderByName } = require('@craco/craco')

// const packages = []
// packages.push(path.join(__dirname, '../shared'))

module.exports = {
  webpack: {
    // configure: (webpackConfig) => {
    //   const { isFound, match } = getLoader(webpackConfig, loaderByName('babel-loader'))
    //   if (isFound) {
    //     const include = Array.isArray(match.loader.include)
    //       ? match.loader.include
    //       : [match.loader.include]

    //     match.loader.include = include.concat(packages)
    //   }

    //   return webpackConfig
    // },
    alias: {
      '@components': path.resolve(__dirname, './src/components/'),
      '@views': path.resolve(__dirname, './src/views/'),
      '@pages': path.resolve(__dirname, './src/pages/'),
      '@styles': path.resolve(__dirname, './src/styles/'),
      '@lib': path.resolve(__dirname, './src/lib/'),
      '@state': path.resolve(__dirname, './src/state/'),
      '@assets': path.resolve(__dirname, './src/assets/'),
      '@config': path.resolve(__dirname, './src/lib/config/')
    }
  },
  jest: {
    configure: {
      moduleNameMapper: {
        '^@components/(.*)$': ['<rootDir>/src/components/$1'],
        '^@views/(.*)$': ['<rootDir>/src/views/$1'],
        '^@pages/(.*)$': ['<rootDir>/src/pages/$1'],
        '^@styles/(.*)$': ['<rootDir>/src/styles/$1'],
        '^@lib/(.*)$': ['<rootDir>/src/lib/$1'],
        '^@state/(.*)$': ['<rootDir>/src/state/$1'],
        '^@assets/(.*)$': ['<rootDir>/src/assets/$1'],
        '^@config/(.*)$': ['<rootDir>/src/lib/config/$1']
      }
    }
  }
}
