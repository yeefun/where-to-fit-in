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
1. 在根目錄下，安裝套件：
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

### 如何部署到 GitHub Pages
1. 在根目錄下，創建 `vue.config.js`，寫上：
```javascript
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/<my-project-name>/' : '/'
}
```
2. 在終端機打上：
```
npm run build
cd dist
git init
git add -A
git commit -m 'deploy'
git push -f https://github.com/<username>/<repo>.git master:gh-pages
```
3. 回根目錄，創建自動化部署腳本 `deploy.sh`，寫上：
```shell
#!/usr/bin/env sh

# 發生錯誤時停止
set -e

# 構建
echo Building...
npm run build

# 進入構建輸出的目錄下
cd dist

# 提交至本地倉庫
echo Deploying...
git init
git add -A
git commit -m 'deploy'

# 上傳至 https://github.com/<username>/<repo>.git 專案的 gh-pages 分支，即部署至 https://<username>.github.io/<repo>
git push -f https://github.com/<username>/<repo>.git master:gh-pages

cd -
```

4. 在終端機啟動自動化部署腳本：
```
bash deploy.sh
```
