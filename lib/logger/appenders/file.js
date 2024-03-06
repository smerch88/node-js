import fs from "fs";
import EventEmitter from "events";
import config from "../config.js";

const LOG_FILE_PATH = config.logPath;
const LOG_FILE_ERROR_PATH = config.logErrorPath;

class Logger extends EventEmitter {
    constructor(formatter) {
        super();
        this.formatter = formatter;
    }

    async log(date, level, category, message) {
        const logMessage = this.formatter(date, level, category, message) + "\n";
        await this.appendLog(logMessage);

        if (level === "ERROR") {
            await this.appendErrorFile(logMessage);
        }
    }

    async appendLog(message) {
        try {
            await fs.promises.appendFile(LOG_FILE_PATH, message);
        } catch (error) {
            console.error("Error appending log to file:", error);
        }
    }

    async appendErrorFile(message) {
        try {
            await fs.promises.appendFile(LOG_FILE_ERROR_PATH, message);
        } catch (error) {
            console.error("Error appending error log to file:", error);
        }
    }
}

function init(formatter) {
    const logger = new Logger(formatter);
    logger.on('log', console.log.bind(console));
    return { log: logger.log.bind(logger) };
}

export default init;
