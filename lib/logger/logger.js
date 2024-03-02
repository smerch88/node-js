import config from "./config.js";
import { scoreLevel, level } from "./constants.js";
import * as appenderStrategy from "./appenders/appenderStrategy.js"

const logger = (category) => ({
    info: (message) => {
        executeLog(level.INFO, category, JSON.stringify(message))
    },
    warn: (message) => {
        executeLog(level.WARN, category, JSON.stringify(message))
    },
    error: (message) => {
        executeLog(level.ERROR, category, JSON.stringify(message))
    },
    debug: (message) => {
        executeLog(level.DEBUG, category, JSON.stringify(message))
    },
    trace: (message) => {
        executeLog(level.TRACE, category, JSON.stringify(message))
    },
});

const appender = appenderStrategy.getAppender();

function executeLog(level, category, message) {
    if (scoreLevel[level] <= config.scoreLevel) {
        appender.log(Date.now(), level, category, message);
    }
}

export default {
    getLogger(category) {
        return logger(category);
    }
};
