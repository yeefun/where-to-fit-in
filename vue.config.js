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
    },
    // desktop
    indexD: {
      entry: 'src/d/main.js',
      template: 'public/index-d.html',
      filename: 'index-d.html'
    },
    report1D: {
      entry: 'src/d/main.js',
      template: 'public/report1/index-d.html',
      filename: 'report1/index-d.html'
    },
    report2D: {
      entry: 'src/d/main.js',
      template: 'public/report2/index-d.html',
      filename: 'report2/index-d.html'
    },
    report3D: {
      entry: 'src/d/main.js',
      template: 'public/report3/index-d.html',
      filename: 'report3/index-d.html'
    },
    report4D: {
      entry: 'src/d/main.js',
      template: 'public/report4/index-d.html',
      filename: 'report4/index-d.html'
    },
    report5D: {
      entry: 'src/d/main.js',
      template: 'public/report5/index-d.html',
      filename: 'report5/index-d.html'
    }
  }
}
