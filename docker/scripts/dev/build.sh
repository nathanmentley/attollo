#!/usr/bin/env bash

cd /home/web/src
npm install
nodejs ./node_modules/gulp/bin/gulp.js --Env $attolloenv

cd /home/web/dist/Server/Tools/DatabaseManager
nodejs DatabaseManager.min.js ensure