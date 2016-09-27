class DockerDef:
    def __init__(self, dockerfile, imagename, instancename, ports, links, foreground):
        self.dockerfile = dockerfile
        self.imagename = imagename
        self.instancename = instancename
        self.ports = ports
        self.links = links
        self.foreground = foreground