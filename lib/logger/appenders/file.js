import fs from "fs";
import { Readable, Writable } from "stream";
import config from "../config.js";

const LOG_FILE_PATH = config.logPath;
const LOG_FILE_ERROR_PATH = config.logErrorPath;

class Logger extends Writable {
    constructor(formatter) {
        super();
        this.formatter = formatter;
        this.logFileStream = fs.createWriteStream(LOG_FILE_PATH, { flags: 'a' });
        this.errorLogFileStream = fs.createWriteStream(LOG_FILE_ERROR_PATH, { flags: 'a' });
    }

    _write(chunk, encoding, callback) {
        callback();
    }

    async log(date, level, category, message) {
        const logMessage = this.formatter(date, level, category, message) + "\n";
        this.logFileStream.write(logMessage);

        if (level === "ERROR") {
            this.errorLogFileStream.write(logMessage);
        }

        this.emit('log', logMessage);
    }

    destroy() {
        this.logFileStream.end();
        this.errorLogFileStream.end();
    }
}

function init(formatter) {
    const logger = new Logger(formatter);
    logger.on('log', console.log.bind(console));
    return { log: logger.log.bind(logger) };
}

export default init;
