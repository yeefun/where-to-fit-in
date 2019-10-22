module.exports = {
  // configureWebpack: {
  //   optimization: {
  //     splitChunks: {
  //       minSize: 1
  //     }
  //   }
  // },
  chainWebpack: config => {
    config.module.rule('pug')
      .test(/\.pug$/)
      .use('pug-html-loader')
      .loader('pug-html-loader')
      .end()

    // const options = module.exports
    // const pages = options.pages
    // const pageKeys = Object.keys(pages)

    // // Long-term caching
    // const IS_VENDOR = /[\\/]node_modules[\\/]/

    // config.optimization
    //   .splitChunks({
    //     cacheGroups: {
    //       // vendors: {
    //       //   name: 'chunk-vendors',
    //       //   priority: -10,
    //       //   chunks: 'initial',
    //       //   minChunks: 2,
    //       //   test: IS_VENDOR,
    //       //   enforce: true,
    //       // },
    //       ...pageKeys.map(key => ({
    //         name: `chunk-${key}-vendors`,
    //         priority: -11,
    //         chunks: chunk => chunk.name === key,
    //         test: IS_VENDOR,
    //         enforce: true,
    //       })),
    //       common: {
    //         name: 'chunk-common',
    //         priority: -20,
    //         chunks: 'initial',
    //         minChunks: 2,
    //         reuseExistingChunk: true,
    //         enforce: true,
    //       },
    //     },
    //   })
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/where-to-fit-in/' : '/',
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      chunks: ['chunk-index-vendors', 'index']
    },
    report1: {
      entry: 'src/main.js',
      template: 'public/report1/index.html',
      filename: 'report1/index.html',
      chunks: ['chunk-report1-vendors', 'report1']
    },
    report2: {
      entry: 'src/main.js',
      template: 'public/report2/index.html',
      filename: 'report2/index.html',
      chunks: ['chunk-report2-vendors', 'report2']
    },
    report3: {
      entry: 'src/main.js',
      template: 'public/report3/index.html',
      filename: 'report3/index.html',
      chunks: ['chunk-report3-vendors', 'report3']
    },
    report4: {
      entry: 'src/main.js',
      template: 'public/report4/index.html',
      filename: 'report4/index.html',
      chunks: ['chunk-report4-vendors', 'report4']
    },
    report5: {
      entry: 'src/main.js',
      template: 'public/report5/index.html',
      filename: 'report5/index.html',
      chunks: ['chunk-report5-vendors', 'report5']
    },
    // desktop
    'index-d': {
      entry: 'src/d/main.js',
      template: 'public/index-d.html',
      filename: 'index-d.html',
      chunks: ['chunk-index-d-vendors', 'index-d']
    },
    'report1-d': {
      entry: 'src/d/main.js',
      template: 'public/report1/index-d.html',
      filename: 'report1/index-d.html',
      chunks: ['chunk-report1-d-vendors', 'report1-d']
    },
    'report2-d': {
      entry: 'src/d/main.js',
      template: 'public/report2/index-d.html',
      filename: 'report2/index-d.html',
      chunks: ['chunk-report2-d-vendors', 'report2-d']
    },
    'report3-d': {
      entry: 'src/d/main.js',
      template: 'public/report3/index-d.html',
      filename: 'report3/index-d.html',
      chunks: ['chunk-report3-d-vendors', 'report3-d']
    },
    'report4-d': {
      entry: 'src/d/main.js',
      template: 'public/report4/index-d.html',
      filename: 'report4/index-d.html',
      chunks: ['chunk-report4-d-vendors', 'report4-d']
    },
    'report5-d': {
      entry: 'src/d/main.js',
      template: 'public/report5/index-d.html',
      filename: 'report5/index-d.html',
      chunks: ['chunk-report5-d-vendors', 'report5-d']
    }
  }
}
