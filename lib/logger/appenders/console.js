import EventEmitter from 'events';
import { Transform } from 'stream';

class Logger extends EventEmitter {
    constructor(formatter, transformStream) {
        super();
        this.formatter = formatter;
        this.transformStream = transformStream;
    }

    log(date, level, category, message) {
        const formattedMessage = this.formatter(date, level, category, message);
        console.log(formattedMessage);
        this.emit('log', formattedMessage);
    }

    addTransform(transformStream) {
        this.transformStream = transformStream;
        this.transformStream.pipe(process.stdout);
    }
}

function init(formatter) {
    const transformStream = new Transform({
        transform(chunk, encoding, callback) {
            const filename = process.argv[1].split('/').pop();
            const transformedChunk = `[${filename}] ${chunk}`;
            callback(null, transformedChunk);
        }
    });

    const logger = new Logger(formatter, transformStream);
    logger.on('log', console.log.bind(console));

    return {
        log: logger.log.bind(logger),
        addTransform: logger.addTransform.bind(logger)
    };
}

export default init;
