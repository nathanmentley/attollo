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
            self.getPsqlDockerDef(),
            self.getRedisDockerDef(),
            self.getRabbitMQDockerDef(),

            self.getBuildDockerDef(),
            
            self.getRunnerDockerDef(),
            self.getRunnerApiDockerDef(),
            self.getControlCenterDockerDef(),
            self.getControlCenterApiDockerDef()
        ]
        if options.env == 'local':
            self.dockerfiles.append(self.getDevDockerDef());

    def getRedisDockerDef(self):
        dockerFile = self.path + '/docker/dockerfiles/' + self.options.arch + '/infrastructure/Dockerfile.redis';
        imageName = 'attollo/redis';
        containerName = 'attollo-redis';
        ports = [PortMapDef(6379, 6379)];
        links = [];
        volumes = [
            VolumnDef('/keys', '/home/web/keys'),
            VolumnDef('/dist', '/home/web/dist'),
            VolumnDef('/logs', '/home/web/logs'),
            VolumnDef('/src', '/home/web/src')
        ];
        foreground = False;
        return DockerDef(dockerFile, imageName, containerName, ports, links, volumes, foreground);

    def getPsqlDockerDef(self):
        dockerFile = self.path + '/docker/dockerfiles/' + self.options.arch + '/infrastructure/Dockerfile.psql';
        imageName = 'attollo/psql';
        containerName = 'attollo-psql';
        ports = [PortMapDef(5432, 5432)];
        links = [];
        volumes = [
            VolumnDef('/storage/database', '/var/lib/postgresql/data'),
            VolumnDef('/keys', '/home/web/keys'),
            VolumnDef('/dist', '/home/web/dist'),
            VolumnDef('/logs', '/home/web/logs'),
            VolumnDef('/src', '/home/web/src')
        ];
        foreground = False;
        return DockerDef(dockerFile, imageName, containerName, ports, links, volumes, foreground);

    def getRabbitMQDockerDef(self):
        dockerFile = self.path + '/docker/dockerfiles/' + self.options.arch + '/infrastructure/Dockerfile.rabbitmq';
        imageName = 'attollo/rabbitmq';
        containerName = 'attollo-rabbitmq';
        ports = [PortMapDef(5672, 5672)];
        links = [];
        volumes = [
            VolumnDef('/keys', '/home/web/keys'),
            VolumnDef('/dist', '/home/web/dist'),
            VolumnDef('/logs', '/home/web/logs'),
            VolumnDef('/src', '/home/web/src')
        ];
        foreground = False;
        return DockerDef(dockerFile, imageName, containerName, ports, links, volumes, foreground);

    def getBuildDockerDef(self):
        dockerFile = self.path + '/docker/dockerfiles/' + self.options.arch + '/dev/Dockerfile.build';
        imageName = 'attollo/build';
        containerName = 'attollo-build';
        ports = [];
        links = [
            LinkDef('attollo-psql', 'database'),
            LinkDef('attollo-redis', 'redis'),
            LinkDef('attollo-rabbitmq', 'rabbitmq')
        ];
        volumes = [
            VolumnDef('/keys', '/home/web/keys'),
            VolumnDef('/dist', '/home/web/dist'),
            VolumnDef('/logs', '/home/web/logs'),
            VolumnDef('/src', '/home/web/src'),
            VolumnDef('/', '/home/web/git')
        ];
        foreground = True;
        return DockerDef(dockerFile, imageName, containerName, ports, links, volumes, foreground);
        
    def getDevDockerDef(self):
        dockerFile = self.path + '/docker/dockerfiles/' + self.options.arch + '/dev/Dockerfile.dev';
        imageName = 'attollo/dev';
        containerName = 'attollo-dev';
        ports = [];
        links = [
            LinkDef('attollo-psql', 'database'),
            LinkDef('attollo-redis', 'redis'),
            LinkDef('attollo-rabbitmq', 'rabbitmq')
        ];
        volumes = [
            VolumnDef('/keys', '/home/web/keys'),
            VolumnDef('/dist', '/home/web/dist'),
            VolumnDef('/logs', '/home/web/logs'),
            VolumnDef('/src', '/home/web/src'),
            VolumnDef('/', '/home/web/git')
        ];
        foreground = True;
        return DockerDef(dockerFile, imageName, containerName, ports, links, volumes, foreground);
        
    def getRunnerDockerDef(self):
        dockerFile = self.path + '/docker/dockerfiles/' + self.options.arch + '/web/Dockerfile.runner';
        imageName = 'attollo/runner';
        containerName = 'attollo-runner';
        ports = [PortMapDef(80, 8080), PortMapDef(443, 8443)];
        links = [
            LinkDef('attollo-psql', 'database'),
            LinkDef('attollo-redis', 'redis'),
            LinkDef('attollo-rabbitmq', 'rabbitmq')
        ];
        volumes = [
            VolumnDef('/keys', '/home/web/keys'),
            VolumnDef('/dist', '/home/web/dist'),
            VolumnDef('/logs', '/home/web/logs'),
            VolumnDef('/src', '/home/web/src')
        ];
        foreground = False;
        return DockerDef(dockerFile, imageName, containerName, ports, links, volumes, foreground);

    def getRunnerApiDockerDef(self):
        dockerFile = self.path + '/docker/dockerfiles/' + self.options.arch + '/web/Dockerfile.runnerapi';
        imageName = 'attollo/runnerapi';
        containerName = 'attollo-runnerapi';
        ports = [PortMapDef(80, 8081), PortMapDef(443, 8444)];
        links = [
            LinkDef('attollo-psql', 'database'),
            LinkDef('attollo-redis', 'redis'),
            LinkDef('attollo-rabbitmq', 'rabbitmq')
        ];
        volumes = [
            VolumnDef('/keys', '/home/web/keys'),
            VolumnDef('/dist', '/home/web/dist'),
            VolumnDef('/logs', '/home/web/logs'),
            VolumnDef('/src', '/home/web/src')
        ];
        foreground = False;
        return DockerDef(dockerFile, imageName, containerName, ports, links, volumes, foreground);

    def getControlCenterDockerDef(self):
        dockerFile = self.path + '/docker/dockerfiles/' + self.options.arch + '/web/Dockerfile.controlcenter';
        imageName = 'attollo/controlcenter';
        containerName = 'attollo-controlcenter';
        ports = [PortMapDef(80, 8082), PortMapDef(443, 8445)];
        links = [
            LinkDef('attollo-psql', 'database'),
            LinkDef('attollo-redis', 'redis'),
            LinkDef('attollo-rabbitmq', 'rabbitmq')
        ];
        volumes = [
            VolumnDef('/keys', '/home/web/keys'),
            VolumnDef('/dist', '/home/web/dist'),
            VolumnDef('/logs', '/home/web/logs'),
            VolumnDef('/src', '/home/web/src')
        ];
        foreground = False;
        return DockerDef(dockerFile, imageName, containerName, ports, links, volumes, foreground);

    def getControlCenterApiDockerDef(self):
        dockerFile = self.path + '/docker/dockerfiles/' + self.options.arch + '/web/Dockerfile.controlcenterapi';
        imageName = 'attollo/controlcenterapi';
        containerName = 'attollo-controlcenterapi';
        ports = [PortMapDef(80, 8083), PortMapDef(443, 8446)];
        links = [
            LinkDef('attollo-psql', 'database'),
            LinkDef('attollo-redis', 'redis'),
            LinkDef('attollo-rabbitmq', 'rabbitmq')
        ];
        volumes = [
            VolumnDef('/keys', '/home/web/keys'),
            VolumnDef('/dist', '/home/web/dist'),
            VolumnDef('/logs', '/home/web/logs'),
            VolumnDef('/src', '/home/web/src')
        ];
        foreground = False;
        return DockerDef(dockerFile, imageName, containerName, ports, links, volumes, foreground);

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
                subprocess.call('docker run -d --restart=always ' + ports + links + volumns + ' --name ' + dockerfile.instancename + ' ' + dockerfile.imagename, shell=True)
        return