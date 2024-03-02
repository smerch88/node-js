import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import * as constants from "./constants.js";
dotenv.config()

const defaultConfig = {
    logLevel: constants.level.INFO,
    scoreLevel: constants.scoreLevel[constants.level.INFO],
    appender: constants.appender.CONSOLE
}

function enrichConfig(config) {
    config.scoreLevel = constants.scoreLevel[config.logLevel]
}

const pathToLogger = path.resolve(process.env.LOG_CONFIG_FILE, "logger.json");
const configFileData = fs.readFileSync(pathToLogger, 'utf-8');

function initConfig() {
    const config = defaultConfig;

    const logLevel = process.env?.LOG_LEVEL?.toUpperCase();
    const appender = process.env?.LOG_APPENDER?.toUpperCase();
    const logLevelFile = configFileData?.logLevel?.toUpperCase();
    const appenderFile = configFileData?.appender?.toUpperCase();

    const logLevelFinal = logLevel || logLevelFile;
    const appenderFinal = appender || appenderFile;

    if (logLevelFinal) {
        config.logLevel = logLevelFinal
    }

    if (appenderFinal) {
        config.appender = appenderFinal
    }

    enrichConfig(config);

    return config;
}

const config = initConfig();
export default config;
