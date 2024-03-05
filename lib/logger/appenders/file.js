import fs from "fs";
import config from "../config.js";

const LOG_FILE_PATH = config.logPath;
const LOG_FILE_ERROR_PATH = config.logErrorPath;

const log = formatter => async (date, level, category, message) => {
    const logMessage = formatter(date, level, category, message) + "\n";
    await appendLog(logMessage);

    if (level === "ERROR") {
        await appendErrorFile(logMessage);
    }
}

async function appendLog(message) {
    try {
        await fs.promises.appendFile(LOG_FILE_PATH, message);
    } catch (error) {
        console.error("Error appending log to file:", error);
    }
}

async function appendErrorFile(message) {
    try {
        await fs.promises.appendFile(LOG_FILE_ERROR_PATH, message);
    } catch (error) {
        console.error("Error appending error log to file:", error);
    }
}

function init(formatter) {
    return {
        log: log(formatter)
    }
}

export default init;
