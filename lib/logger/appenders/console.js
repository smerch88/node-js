import EventEmitter from 'events';

class Logger extends EventEmitter {
    constructor(formatter) {
        super();
        this.formatter = formatter;
    }

    log(date, level, category, message) {
        const formattedMessage = this.formatter(date, level, category, message);
        console.log(formattedMessage);
        this.emit('log', formattedMessage);
    }
}

function init(formatter) {
    const logger = new Logger(formatter);
    logger.on('log', console.log.bind(console));
    return { log: logger.log.bind(logger) };
}

export default init;
