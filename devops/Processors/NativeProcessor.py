import os
import subprocess

class NativeProcessor:
    def __init__(self, options):
        self.options = options
        self.path = os.getcwd()

    def run(self):
        subprocess.call('do')
        return