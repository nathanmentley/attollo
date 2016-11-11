class DockerDef:
    def __init__(self, dockerfile, imagename, instancename, ports, links, volumns, foreground):
        self.dockerfile = dockerfile
        self.imagename = imagename
        self.instancename = instancename
        self.ports = ports
        self.links = links
        self.volumns = volumns
        self.foreground = foreground