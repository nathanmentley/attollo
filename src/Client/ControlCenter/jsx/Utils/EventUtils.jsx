import eventEmitter from 'event-emitter';

var emitter = eventEmitter({});

export default class EventUtils {
    static Listen(event, logic) {
        emitter.on(event, logic);
    }

    static Queue(event, value) {
        emitter.emit(event, value);
    }
}