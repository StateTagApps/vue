#!/usr/bin/env sh

# abort on errors
set -e

yarn build

yes | cp -rf ./dist/css/app.css ./cdn
yes | cp -rf ./dist/js/app.js ./cdn

BUILD=`git rev-parse HEAD`
echo $BUILD
ex -s +%s/#stateTagAppVersion#/$BUILD/ge -cwq ./cdn/app.js

cd ./cdn
git add .
git commit -m 'deploy'
git push -f origin master

exit 0
