# deploy.sh

#!/usr/bin/env sh

# 發生錯誤時終止
set -e

# 構建
echo Building
npm run build

# 進入到構建輸出的目錄下
cd dist

# 提交到本地倉庫
echo Deploying...
git init
git add -A
git commit -m 'deploy'

# 部署到 https://github.com/yeefun/where-to-fit-in.git 專案的 gh-pages 分支，即部署到 https://yeefun.github.io/where-to-fit-in
git push -f https://github.com/yeefun/where-to-fit-in.git master:gh-pages

cd -
