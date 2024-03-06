import config from "./config.js";
import { scoreLevel, level } from "./constants.js";
import * as appenderStrategy from "./appenders/appenderStrategy.js"

const logger = (category) => ({
    info: (...message) => {
        executeLog(level.INFO, category, message)
    },
    warn: (...message) => {
        executeLog(level.WARN, category, message)
    },
    error: (...message) => {
        executeLog(level.ERROR, category, message)
    },
    debug: (...message) => {
        executeLog(level.DEBUG, category, message)
    },
    trace: (...message) => {
        executeLog(level.TRACE, category, message)
    },
});

const appenders = appenderStrategy.getAppender();

function executeLog(logLevel, category, message) {
    if (scoreLevel[logLevel] <= config.scoreLevel) {
        appenders.forEach(appender => {
            appender.log(Date.now(), logLevel, category, message);
        });
    }
}

export default {
    getLogger(category) {
        return logger(category);
    }
};
