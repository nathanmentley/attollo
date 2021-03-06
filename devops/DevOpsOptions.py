import argparse

class DevOpsOptions:
    def __init__(self):
        parser = argparse.ArgumentParser(description='')

        parser.add_argument('--env', action="store", dest='env', default='local')
        parser.add_argument('--command', action="store", dest='command', default='start')
        parser.add_argument('--arch', action="store", dest='arch', default='x86_64')
        results = parser.parse_args()

        self.command = results.command
        self.env = results.env
        self.arch = results.arch
        self.valid = True