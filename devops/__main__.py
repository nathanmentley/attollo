import sys

from DevOpsOptions import DevOpsOptions
from Processors.DockerProcessor import DockerProcessor

def main():
    options = DevOpsOptions();
    dockerProcessor = DockerProcessor(options)

    if options.command == 'start':
        dockerProcessor.build()
        dockerProcessor.run()
    elif options.command == 'stop':
        dockerProcessor.stop()
    elif options.command == 'build':
        dockerProcessor.build()
    elif optionscommand == 'run':
        dockerProcessor.run()
    return

if __name__ == "__main__":
    main()