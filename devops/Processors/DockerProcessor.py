import os
import subprocess

from Models.DockerDef import DockerDef
from Models.PortMapDef import PortMapDef
from Models.LinkDef import LinkDef

class DockerProcessor:
    def __init__(self, options):
        self.options = options
        self.path = os.getcwd()
        self.dockerfiles = [
            DockerDef(self.path + '/docker/Dockerfile.psql', 'attollo/psql', 'attollo-psql', [], [], False),
            DockerDef(self.path + '/docker/Dockerfile.build', 'attollo/build', 'attollo-build', [], [LinkDef('attollo-psql', 'database')], True),
            DockerDef(self.path + '/docker/Dockerfile.dev', 'attollo/dev', 'attollo-dev', [], [], False),
            #DockerDef(self.path + '/docker/Dockerfile.mongo', 'attollo/mongo', 'attollo-mongo', [], [], False),
            DockerDef(self.path + '/docker/Dockerfile.rabbitmq', 'attollo/rabbitmq', 'attollo-rabbitmq', [], [], False),
            DockerDef(self.path + '/docker/web/Dockerfile.runner', 'attollo/runner', 'attollo-runner', [PortMapDef(80, 8080)], [], False),
            DockerDef(self.path + '/docker/web/Dockerfile.runnerapi', 'attollo/runnerapi', 'attollo-runnerapi', [PortMapDef(80, 8081)], [LinkDef('attollo-psql', 'database')], False),
            DockerDef(self.path + '/docker/web/Dockerfile.controlcenter', 'attollo/controlcenter', 'attollo-controlcenter', [PortMapDef(80, 8082)], [], False),
            DockerDef(self.path + '/docker/web/Dockerfile.controlcenterapi', 'attollo/controlcenterapi', 'attollo-controlcenterapi', [PortMapDef(80, 8083)], [LinkDef('attollo-psql', 'database')], False),
            DockerDef(self.path + '/docker/processor/Dockerfile.email', 'attollo/emailprocessor', 'attollo-emailprocessor', [], [LinkDef('attollo-psql', 'database')], False),
            DockerDef(self.path + '/docker/task/Dockerfile.test', 'attollo/testtask', 'attollo-testtask', [], [LinkDef('attollo-psql', 'database')], False)
        ]

    def stop(self):
        for dockerfile in self.dockerfiles:
            subprocess.call('docker rm -f ' + dockerfile.instancename, shell=True)
        return

    def build(self):
        self.stop()
        for dockerfile in self.dockerfiles:
            subprocess.call('docker build -f ' + dockerfile.dockerfile + ' --build-arg attolloenv=' + self.options.env + ' -t ' + dockerfile.imagename + ' ' + self.path, shell=True)
        return

    def run(self):
        for dockerfile in self.dockerfiles:
            ports = ''
            for portmap in dockerfile.ports:
                ports += ' -p ' + str(portmap.host) + ':' + str(portmap.guest)
            links = ''
            for linkmap in dockerfile.links:
                links += ' --link ' + str(linkmap.name) + ':' + str(linkmap.alias)
            
            if dockerfile.foreground:
                subprocess.call('docker run -it ' + ports + links + ' -v "' + self.path + '/dist":/home/web/dist -v "' + self.path + '/src":/home/web/src --name ' + dockerfile.instancename + ' ' + dockerfile.imagename, shell=True)
            else:
                subprocess.call('docker run -d ' + ports + links + ' -v "' + self.path + '/dist":/home/web/dist -v "' + self.path + '/logs":/home/web/logs -v "' + self.path + '/src":/home/web/src --name ' + dockerfile.instancename + ' ' + dockerfile.imagename, shell=True)
        return