import * as constants from "../constants.js";
import config from "../config.js";
import consoleAppender from "./console.js"
import fileAppender from "./file.js"
import networkAppender from "./networkAppender.js"
import { getFormatter } from "../formatters/formatterStrategy.js";

const appenders = {
    [constants.appender.CONSOLE]: consoleAppender,
    [constants.appender.FILE]: fileAppender,
    [constants.appender.NETWORK]: networkAppender,
    [undefined]: consoleAppender
}

function getAppender() {
    const outputFormat = getFormatter(config.formatter);
    const chosenAppenders = [];

    for (let i = 0; i < config.appender.length; i++) {
        const appenderFunction = appenders[config.appender[i]];
        if (appenderFunction) {
            chosenAppenders.push(appenderFunction(outputFormat));
        }
    }

    return chosenAppenders;
}

export { getAppender }
