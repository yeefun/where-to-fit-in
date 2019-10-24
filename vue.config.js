module.exports = {
  chainWebpack: config => {
    config.module.rule('pug')
      .test(/\.pug$/)
      .use('pug-html-loader')
      .loader('pug-html-loader')
      .end()
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/where-to-fit-in/' : '/',
  pages: {
    'index-desktop': {
      entry: 'src/main.js',
      template: 'public/index-desktop.html',
      filename: 'index-desktop.html'
    },
    'report1-desktop': {
      entry: 'src/main.js',
      template: 'public/report1/index-desktop.html',
      filename: 'report1/index-desktop.html'
    },
    'report2-desktop': {
      entry: 'src/main.js',
      template: 'public/report2/index-desktop.html',
      filename: 'report2/index-desktop.html'
    },
    'report3-desktop': {
      entry: 'src/main.js',
      template: 'public/report3/index-desktop.html',
      filename: 'report3/index-desktop.html'
    },
    'report4-desktop': {
      entry: 'src/main.js',
      template: 'public/report4/index-desktop.html',
      filename: 'report4/index-desktop.html'
    },
    'report5-desktop': {
      entry: 'src/main.js',
      template: 'public/report5/index-desktop.html',
      filename: 'report5/index-desktop.html'
    }
  }
}
