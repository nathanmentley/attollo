import os

class VolumnDef:
    def __init__(self, host, guest):
        self.path = os.getcwd()
        self.host = self.path + host
        self.guest = guest