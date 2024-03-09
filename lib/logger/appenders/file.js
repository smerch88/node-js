import fs from "fs";
import { Writable } from "stream";
import config from "../config.js";

const LOG_FILE_PATH = config.logPath;
const LOG_FILE_ERROR_PATH = config.logErrorPath;

const logStream = fs.createWriteStream(LOG_FILE_PATH, { flags: "a" });
const errorLogStream = fs.createWriteStream(LOG_FILE_ERROR_PATH, { flags: "a" });

class LogWritable extends Writable {
    constructor(options) {
        super(options);
    }

    _write(chunk, encoding, callback) {
        logStream.write(chunk, encoding);

        const message = chunk.toString();
        if (message.includes("ERROR")) {
            errorLogStream.write(chunk, encoding);
        }

        callback();
    }
}

const logWritable = new LogWritable();

const log = formatter => (date, level, category, message) => {
    const logMessage = formatter(date, level, category, message) + "\n";
    logWritable.write(logMessage);
}

function init(formatter) {
    return {
        log: log(formatter)
    }
}

export default init;
