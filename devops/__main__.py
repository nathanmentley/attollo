import sys

from DevOpsOptions import DevOpsOptions
from Processors.DockerProcessor import DockerProcessor
from Processors.NativeProcessor import NativeProcessor

def main():
    options = DevOpsOptions();

    if options:
        dockerProcessor = DockerProcessor(options)
        nativeProcessor = NativeProcessor(options)

        if options.command == 'start':
            dockerProcessor.build()
            dockerProcessor.run()
        elif options.command == 'stop':
            dockerProcessor.stop()
        elif options.command == 'build':
            dockerProcessor.build()
        elif options.command == 'run':
            dockerProcessor.run()

        elif options.command == 'nativerun':
            nativeProcessor.run()
            
        else:
            print("unkonwn command.")
        return
    else:
        print("invalid options.")
        return

if __name__ == "__main__":
    main()