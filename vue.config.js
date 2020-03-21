module.exports = {
  chainWebpack: (config) => {
    config.module.rule('pug')
      .test(/\.pug$/)
      .use('pug-html-loader')
      .loader('pug-html-loader')
      .end()
  },
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    },
    report1: {
      entry: 'src/main.js',
      template: 'public/report1/index.html',
      filename: 'report1/index.html'
    },
    report2: {
      entry: 'src/main.js',
      template: 'public/report2/index.html',
      filename: 'report2/index.html'
    },
    report3: {
      entry: 'src/main.js',
      template: 'public/report3/index.html',
      filename: 'report3/index.html'
    },
    report4: {
      entry: 'src/main.js',
      template: 'public/report4/index.html',
      filename: 'report4/index.html'
    },
    report5: {
      entry: 'src/main.js',
      template: 'public/report5/index.html',
      filename: 'report5/index.html'
    }
  }
}
