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
            DockerDef(self.path + '/docker/dockerfiles/infrastructure/Dockerfile.psql', 'attollo/psql', 'attollo-psql', [PortMapDef(5432, 5432)], [], False),
            #DockerDef(self.path + '/docker/dockerfiles/infrastructure/Dockerfile.mongo', 'attollo/mongo', 'attollo-mongo', [], [], False),
            DockerDef(self.path + '/docker/dockerfiles/infrastructure/Dockerfile.rabbitmq', 'attollo/rabbitmq', 'attollo-rabbitmq', [], [], False),
            DockerDef(self.path + '/docker/dockerfiles/dev/Dockerfile.build', 'attollo/build', 'attollo-build', [], [LinkDef('attollo-psql', 'database')], True),
            DockerDef(self.path + '/docker/dockerfiles/web/Dockerfile.runner', 'attollo/runner', 'attollo-runner', [PortMapDef(80, 8080)], [], False),
            DockerDef(self.path + '/docker/dockerfiles/web/Dockerfile.runnerapi', 'attollo/runnerapi', 'attollo-runnerapi', [PortMapDef(80, 8081)], [LinkDef('attollo-psql', 'database')], False),
            DockerDef(self.path + '/docker/dockerfiles/web/Dockerfile.controlcenter', 'attollo/controlcenter', 'attollo-controlcenter', [PortMapDef(80, 8082)], [], False),
            DockerDef(self.path + '/docker/dockerfiles/web/Dockerfile.controlcenterapi', 'attollo/controlcenterapi', 'attollo-controlcenterapi', [PortMapDef(80, 8083)], [LinkDef('attollo-psql', 'database')], False),
            DockerDef(self.path + '/docker/dockerfiles/processor/Dockerfile.email', 'attollo/emailprocessor', 'attollo-emailprocessor', [], [LinkDef('attollo-psql', 'database')], False),
            DockerDef(self.path + '/docker/dockerfiles/task/Dockerfile.test', 'attollo/testtask', 'attollo-testtask', [], [LinkDef('attollo-psql', 'database')], False)
        ]
        if options.env == 'local':
            self.dockerfiles.append(DockerDef(self.path + '/docker/dockerfiles/dev/Dockerfile.dev', 'attollo/dev', 'attollo-dev', [], [], True));

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
                dockerSocket = ' ';
                if options.env == 'local': 
                    dockerSocket = ' -v /var/run/docker.sock:/var/run/docker.sock ';
                subprocess.call('docker run -it ' + ports + links + ' -v "' + self.path + '/dist":/home/web/dist' + dockerSocket + '-v "' + self.path + '/src":/home/web/src --name ' + dockerfile.instancename + ' ' + dockerfile.imagename, shell=True)
            else:
                subprocess.call('docker run -d ' + ports + links + ' -v "' + self.path + '/dist":/home/web/dist -v "' + self.path + '/logs":/home/web/logs -v "' + self.path + '/src":/home/web/src --name ' + dockerfile.instancename + ' ' + dockerfile.imagename, shell=True)
        return