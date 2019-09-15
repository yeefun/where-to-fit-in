module.exports = {
  chainWebpack: config => {
    config.module.rule('pug')
      .test(/\.pug$/)
      .use('pug-html-loader')
      .loader('pug-html-loader')
      .end()
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/where-to-fit-in/' : '/'
  // pages: {
  //   index: {
  //     entry: 'src/index/main.js',
  //     template: 'public/index.html',
  //     filename: 'index.html'
  //   },
  //   report1: {
  //     entry: 'src/report1/main.js',
  //     template: 'public/report1/index.html',
  //     filename: 'report1/index.html'
  //   }
  // }
}
