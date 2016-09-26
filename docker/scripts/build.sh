#!/usr/bin/env bash

cd /home/web/src

printenv

npm install
nodejs ./node_modules/gulp/bin/gulp.js --Env $attolloenv