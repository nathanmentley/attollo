import os
import subprocess

class NativeProcessor:
    def __init__(self, options):
        self.options = options
        self.path = os.getcwd()

    def run(self):
        #change working dir
        os.chdir('./src')
        #npm install
        subprocess.call('npm install', shell=True)
        #build
        subprocess.call('nodejs ./node_modules/gulp/bin/gulp.js --Env ' + self.options.env, shell=True)
        #call db manager
        subprocess.call('nodejs ../dist/Server/Tools/DatabaseManager/app.js ', shell=True)
        #start web apps
        subprocess.Popen(['nodejs', '../dist/Server/Web/RunnerAPI/app.js'])
        subprocess.Popen(['nodejs', '../dist/Server/Web/ControlCenterAPI/app.js'])
        subprocess.Popen(['nodejs', '../dist/Server/Web/StaticWebServer/app.js', '../dist/Client/ControlCenter', '8082'])
        subprocess.Popen(['nodejs', '../dist/Server/Web/StaticWebServer/app.js', '../dist/Client/Runner', '8080'])
        #watch
        subprocess.call('nodejs ./node_modules/gulp/bin/gulp.js watch-native', shell=True)
        return