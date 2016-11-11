import os
import subprocess

from Models.DockerDef import DockerDef
from Models.PortMapDef import PortMapDef
from Models.LinkDef import LinkDef
from Models.VolumnDef import VolumnDef

class DockerProcessor:
    def __init__(self, options):
        self.options = options
        self.path = os.getcwd()
        self.dockerfiles = [
            #, VolumnDef('/storage/database', '/var/run/postgresql')
            DockerDef(self.path + '/docker/dockerfiles/infrastructure/Dockerfile.psql', 'attollo/psql', 'attollo-psql', [PortMapDef(5432, 5432)], [], [VolumnDef('/dist', '/home/web/dist'), VolumnDef('/logs', '/home/web/logs'), VolumnDef('/src', '/home/web/src')], False),
            #DockerDef(self.path + '/docker/dockerfiles/infrastructure/Dockerfile.mongo', 'attollo/mongo', 'attollo-mongo', [], [], [VolumnDef('/dist', '/home/web/dist'), VolumnDef('/logs', '/home/web/logs'), VolumnDef('/src', '/home/web/src')], False),
            DockerDef(self.path + '/docker/dockerfiles/infrastructure/Dockerfile.rabbitmq', 'attollo/rabbitmq', 'attollo-rabbitmq', [], [], [VolumnDef('/dist', '/home/web/dist'), VolumnDef('/logs', '/home/web/logs'), VolumnDef('/src', '/home/web/src')], False),
            DockerDef(self.path + '/docker/dockerfiles/dev/Dockerfile.build', 'attollo/build', 'attollo-build', [], [LinkDef('attollo-psql', 'database')], [VolumnDef('/dist', '/home/web/dist'), VolumnDef('/logs', '/home/web/logs'), VolumnDef('/src', '/home/web/src')], True),
            DockerDef(self.path + '/docker/dockerfiles/web/Dockerfile.runner', 'attollo/runner', 'attollo-runner', [PortMapDef(80, 8080)], [], [VolumnDef('/dist', '/home/web/dist'), VolumnDef('/logs', '/home/web/logs'), VolumnDef('/src', '/home/web/src')], False),
            DockerDef(self.path + '/docker/dockerfiles/web/Dockerfile.runnerapi', 'attollo/runnerapi', 'attollo-runnerapi', [PortMapDef(80, 8081)], [LinkDef('attollo-psql', 'database')], [VolumnDef('/dist', '/home/web/dist'), VolumnDef('/logs', '/home/web/logs'), VolumnDef('/src', '/home/web/src')], False),
            DockerDef(self.path + '/docker/dockerfiles/web/Dockerfile.controlcenter', 'attollo/controlcenter', 'attollo-controlcenter', [PortMapDef(80, 8082)], [], [VolumnDef('/dist', '/home/web/dist'), VolumnDef('/logs', '/home/web/logs'), VolumnDef('/src', '/home/web/src')], False),
            DockerDef(self.path + '/docker/dockerfiles/web/Dockerfile.controlcenterapi', 'attollo/controlcenterapi', 'attollo-controlcenterapi', [PortMapDef(80, 8083)], [LinkDef('attollo-psql', 'database')], [VolumnDef('/dist', '/home/web/dist'), VolumnDef('/logs', '/home/web/logs'), VolumnDef('/src', '/home/web/src')], False),
            #DockerDef(self.path + '/docker/dockerfiles/processor/Dockerfile.email', 'attollo/emailprocessor', 'attollo-emailprocessor', [], [LinkDef('attollo-psql', 'database')], [VolumnDef('/dist', '/home/web/dist'), VolumnDef('/logs', '/home/web/logs'), VolumnDef('/src', '/home/web/src')], False),
            DockerDef(self.path + '/docker/dockerfiles/task/Dockerfile.test', 'attollo/testtask', 'attollo-testtask', [], [LinkDef('attollo-psql', 'database')], [VolumnDef('/dist', '/home/web/dist'), VolumnDef('/logs', '/home/web/logs'), VolumnDef('/src', '/home/web/src')], False)
        ]
        if options.env == 'local':
            self.dockerfiles.append(DockerDef(self.path + '/docker/dockerfiles/dev/Dockerfile.dev', 'attollo/dev', 'attollo-dev', [], [], [VolumnDef('/dist', '/home/web/dist'), VolumnDef('/logs', '/home/web/logs'), VolumnDef('/src', '/home/web/src')], True));

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
                ports += ' -p ' + str(portmap.host) + ':' + str(portmap.guest) + ' '
            links = ''
            for linkmap in dockerfile.links:
                links += ' --link ' + str(linkmap.name) + ':' + str(linkmap.alias) + ' '
            volumns = ''
            for volumnmap in dockerfile.volumns:
                volumns += ' -v "' + str(volumnmap.host) + '":"' + str(volumnmap.guest) + '" '
            
            if dockerfile.foreground:
                dockerSocket = ' ';
                if self.options.env == 'local': 
                    dockerSocket = ' -v /var/run/docker.sock:/var/run/docker.sock ';
                subprocess.call('docker run -it ' + ports + links + volumns + dockerSocket + ' --name ' + dockerfile.instancename + ' ' + dockerfile.imagename, shell=True)
            else:
                #
                subprocess.call('docker run -d ' + ports + links + volumns + ' --name ' + dockerfile.instancename + ' ' + dockerfile.imagename, shell=True)
        return