# where-to-fit-in

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 如何使用 Pug
1. 安裝套件：
```
npm install --save-dev pug pug-html-loader pug-plain-loader
```
2. 創建 `vue.config.js`，寫上：
```javascript
module.exports = {
  chainWebpack: config => {
    config.module.rule('pug')
      .test(/\.pug$/)
      .use('pug-html-loader')
      .loader('pug-html-loader')
      .end()
  }
}
```
3. 在 `<template>` 加上 `lang="pug"`：
```html
<template lang="pug">
</template>
```