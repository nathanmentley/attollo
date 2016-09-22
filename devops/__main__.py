import sys

from Processors.DockerProcessor import DockerProcessor

def main():
    command = sys.argv[1]
    dockerProcessor = DockerProcessor()

    if command == 'start':
        dockerProcessor.build()
        dockerProcessor.run()
    elif command == 'stop':
        dockerProcessor.stop()
    elif command == 'build':
        dockerProcessor.build()
    elif command == 'run':
        dockerProcessor.run()
    return

if __name__ == "__main__":
    main()