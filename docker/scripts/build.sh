#!/usr/bin/env bash

cd /home/web/src
npm install
nodejs ./node_modules/gulp/bin/gulp.js --Env $attolloenv

nodejs /home/web/dist/Server/Tools/DatabaseManager/app.js 