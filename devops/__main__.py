import sys

from DevOpsOptions import DevOpsOptions
from Processors.DockerProcessor import DockerProcessor

def main():
    options = DevOpsOptions();

    if options:
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
        else:
            print("unkonwn command.")
        return
    else:
        print("invalid options.")
        return

if __name__ == "__main__":
    main()