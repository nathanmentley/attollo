#!/usr/bin/env bash

rsync -avr --delete --exclude=**/Packages --exclude=**/.build --exclude=**/Common /home/web/src/SwiftServer /home/web/dist/

rsync -avr --delete /home/web/src/SwiftServer/Common /home/web/dist/SwiftServer/Tools/DatabaseManager/Sources/App/
rsync -avr --delete /home/web/src/SwiftServer/Common /home/web/dist/SwiftServer/Web/ControlCenterAPI/Sources/App/
rsync -avr --delete /home/web/src/SwiftServer/Common /home/web/dist/SwiftServer/Web/RunnerAPI/Sources/App/
rsync -avr --delete /home/web/src/SwiftServer/Common /home/web/dist/SwiftServer/Web/RunnerClientWebServer/Sources/App/
rsync -avr --delete /home/web/src/SwiftServer/Common /home/web/dist/SwiftServer/Web/StaticWebServer/Sources/App/

cd /home/web/dist/SwiftServer/Web/ControlCenterAPI
vapor build

cd /home/web/dist/SwiftServer/Web/RunnerAPI
vapor build

cd /home/web/dist/SwiftServer/Web/RunnerClientWebServer
vapor build

cd /home/web/dist/SwiftServer/Web/StaticWebServer
vapor build

cd /home/web/dist/SwiftServer/Tools/DatabaseManager
vapor build
vapor run