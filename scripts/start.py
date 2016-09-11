import sys
import subprocess
import os

command = sys.argv[1]
path = os.path.dirname(os.path.realpath(__file__))

class DockerDef:
    def __init__(self, dockerfile, imagename, instancename, ports, foreground):
        self.dockerfile = dockerfile
        self.imagename = imagename
        self.instancename = instancename
        self.ports = ports
        self.foreground = foreground

dockerfiles = [
    DockerDef('../docker/Dockerfile.build', 'portfolio/build', 'portfolio-build', [], True),
    DockerDef('../docker/Dockerfile.mongo', 'portfolio/mongo', 'portfolio-mongo', [], False),
    DockerDef('../docker/Dockerfile.psql', 'portfolio/psql', 'portfolio-psql', [], False),
    DockerDef('../docker/Dockerfile.rabbitmq', 'portfolio/rabbitmq', 'portfolio-rabbitmq', [], False),
    DockerDef('../docker/web/Dockerfile.runner', 'portfolio/runner', 'portfolio-runner', [], False),
    DockerDef('../docker/web/Dockerfile.runnerapi', 'portfolio/runnerapi', 'portfolio-runnerapi', [], False),
    DockerDef('../docker/web/Dockerfile.controlcenter', 'portfolio/controlcenter', 'portfolio-controlcenter', [], False),
    DockerDef('../docker/web/Dockerfile.controlcenterapi', 'portfolio/controlcenterapi', 'portfolio-controlcenterapi', [], False),
    DockerDef('../docker/processor/Dockerfile.email', 'portfolio/emailprocessor', 'portfolio-emailprocessor', [], False),
    DockerDef('../docker/task/Dockerfile.test', 'portfolio/testtask', 'portfolio-testtask', [], False)
]

def stop():
    for dockerfile in dockerfiles:
        subprocess.call('docker rm -f ' + dockerfile.instancename, shell=True)
    return

def build():
    stop()
    for dockerfile in dockerfiles:
        subprocess.call('docker build -f ' + dockerfile.dockerfile + ' -t ' + dockerfile.imagename + ' ../', shell=True)
    return

def run():
    for dockerfile in dockerfiles:
        if dockerfile.foreground:
            subprocess.call('docker run -it -v "' + path + '/../dist":/home/web/dist -v "' + path + '/../src":/home/web/src --name ' + dockerfile.instancename + ' ' + dockerfile.imagename, shell=True)
        else:
            subprocess.call('docker run -d -p 80:80 -p 443:443 -v "' + path + '/../dist":/home/web/dist -v "' + path + '/../src":/home/web/src --name ' + dockerfile.instancename + ' ' + dockerfile.imagename, shell=True)
    return

if command == 'start':
    build()
    run()
elif command == 'stop':
    stop()
elif command == 'build':
    build()
elif command == 'run':
    run()