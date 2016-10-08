import argparse

class DevOpsOptions:
    def __init__(self):
        parser = argparse.ArgumentParser(description='')

        parser.add_argument('--env', action="store", dest='env', default='local')
        parser.add_argument('--command', action="store", dest='command', default='start')
        results = parser.parse_args()

        self.command = results.command
        self.env = results.env
        self.valid = True