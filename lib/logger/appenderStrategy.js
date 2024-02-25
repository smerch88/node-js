import * as constants from "./constants.js";
import config from "./config.js";
import consoleAppender from "./appenders/console.js"
import fileAppender from "./appenders/file.js"

const appenders = {
    [constants.appender.CONSOLE]: consoleAppender,
    [constants.appender.FILE]: fileAppender,
    [undefined]: consoleAppender
}
function getAppender() {
    console.log('config.appender', config.appender)
    return appenders[config.appender];
}

export { getAppender }
