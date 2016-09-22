import os
import subprocess

from Models.DockerDef import DockerDef
from Models.PortMapDef import PortMapDef

class DockerProcessor:
    def __init__(self):
        self.path = os.getcwd()
        self.dockerfiles = [
            DockerDef(self.path + '/docker/Dockerfile.build', 'portfolio/build', 'portfolio-build', [], True),
            DockerDef(self.path + '/docker/Dockerfile.dev', 'portfolio/dev', 'portfolio-dev', [], False),
            #DockerDef(self.path + '/docker/Dockerfile.mongo', 'portfolio/mongo', 'portfolio-mongo', [], False),
            DockerDef(self.path + '/docker/Dockerfile.psql', 'portfolio/psql', 'portfolio-psql', [], False),
            DockerDef(self.path + '/docker/Dockerfile.rabbitmq', 'portfolio/rabbitmq', 'portfolio-rabbitmq', [], False),
            DockerDef(self.path + '/docker/web/Dockerfile.runner', 'portfolio/runner', 'portfolio-runner', [PortMapDef(80, 8080)], False),
            DockerDef(self.path + '/docker/web/Dockerfile.runnerapi', 'portfolio/runnerapi', 'portfolio-runnerapi', [PortMapDef(80, 8081)], False),
            DockerDef(self.path + '/docker/web/Dockerfile.controlcenter', 'portfolio/controlcenter', 'portfolio-controlcenter', [PortMapDef(80, 8082)], False),
            DockerDef(self.path + '/docker/web/Dockerfile.controlcenterapi', 'portfolio/controlcenterapi', 'portfolio-controlcenterapi', [PortMapDef(80, 8083)], False),
            DockerDef(self.path + '/docker/processor/Dockerfile.email', 'portfolio/emailprocessor', 'portfolio-emailprocessor', [], False),
            DockerDef(self.path + '/docker/task/Dockerfile.test', 'portfolio/testtask', 'portfolio-testtask', [], False)
        ]

    def stop(self):
        for dockerfile in self.dockerfiles:
            subprocess.call('docker rm -f ' + dockerfile.instancename, shell=True)
        return

    def build(self):
        self.stop()
        for dockerfile in self.dockerfiles:
            subprocess.call('docker build -f ' + dockerfile.dockerfile + ' -t ' + dockerfile.imagename + ' ' + self.path, shell=True)
        return

    def run(self):
        for dockerfile in self.dockerfiles:
            ports = ''
            for portmap in dockerfile.ports:
                ports += ' -p ' + str(portmap.host) + ':' + str(portmap.guest)
            
            if dockerfile.foreground:
                subprocess.call('docker run -it ' + ports + ' -v "' + self.path + '/dist":/home/web/dist -v "' + self.path + '/src":/home/web/src --name ' + dockerfile.instancename + ' ' + dockerfile.imagename, shell=True)
            else:
                subprocess.call('docker run -d ' + ports + ' -v "' + self.path + '/dist":/home/web/dist -v "' + self.path + '/src":/home/web/src --name ' + dockerfile.instancename + ' ' + dockerfile.imagename, shell=True)
        return