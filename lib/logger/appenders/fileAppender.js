import fs from "fs";
import dotenv from "dotenv";
dotenv.config()

const LOG_FILE_PATH = process.env.LOG_FILE_PATH;
const LOG_FILE_ERROR_PATH = process.env.LOG_FILE_ERROR_PATH;

const log = formatter => (date, level, category, message) => {
    const logMessage = formatter(date, level, category, message) + "\n";
    appendLog(logMessage);

    if (level === "ERROR") {
        appendErrorFile(logMessage);
    }
}

function appendLog(message) {
    fs.appendFile(LOG_FILE_PATH, message, (err) => {
        if (err) {
            console.error("Error appending to log file:", err);
        }
    });
}

function appendErrorFile(message) {
    fs.appendFile(LOG_FILE_ERROR_PATH, message, (err) => {
        if (err) {
            console.error("Error appending to error log file:", err);
        }
    });
}

function init(formatter) {
    return {
        log: log(formatter)
    }
}

export default init;
