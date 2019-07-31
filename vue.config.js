module.exports = {
  chainWebpack: config => {
    config.module.rule('pug')
      .test(/\.pug$/)
      .use('pug-html-loader')
      .loader('pug-html-loader')
      .end()
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/where-to-fit-in/' : '/'
}
