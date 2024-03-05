import dotenv from "dotenv";
dotenv.config()
import fs from "fs";
import path from "path";
import * as constants from "./constants.js";

const defaultConfig = {
    logLevel: constants.level.INFO,
    scoreLevel: constants.scoreLevel[constants.level.INFO],
    appender: [constants.appender.CONSOLE],
    formatter: constants.formatters.DEFAULT,
    logPath: constants.logPath.LOG_FILE_PATH,
    logErrorPath: constants.logPath.LOG_FILE_ERROR_PATH,
    delimeter: constants.delimeter
}

function enrichConfig(config) {
    config.scoreLevel = constants.scoreLevel[config.logLevel]
}

const pathToLogger = path.resolve(process.env.LOG_CONFIG_FILE, "logger.json");
const configFileData = fs.readFileSync(pathToLogger, 'utf-8');

function initConfig() {
    const config = defaultConfig;

    const logLevel = process.env?.LOG_LEVEL?.toUpperCase();
    const appender = process.env?.LOG_APPENDER?.toUpperCase().split(",");
    const formatter = process.env.LOG_OUTPUT_FORMAT?.toUpperCase();
    const logLevelFile = configFileData?.logLevel?.toUpperCase();
    const appenderFile = configFileData?.appender?.toUpperCase().split(",");
    const formatterFile = configFileData?.formatter?.toUpperCase();

    const logPath = process.env.LOG_FILE_PATH?.toLowerCase();
    const logErrorPath = process.env.LOG_FILE_ERROR_PATH?.toLowerCase();
    const logPathFile = configFileData?.logPath?.toLowerCase();
    const logErrorPathFile = configFileData?.logErrorPath?.toLowerCase();

    const delimeter = process.env.LOG_DELIMETER?.toUpperCase();
    const delimeterFile = configFileData?.delimeter?.toUpperCase();

    const logLevelFinal = logLevel || logLevelFile;
    const appenderFinal = appender.length === 0 ? appenderFile : appender;
    const formatterFinal = formatter || formatterFile;
    const logPathFileFinal = logPath || logPathFile;
    const logErrorPathFileFinal = logErrorPath || logErrorPathFile;
    const delimeterFinal = delimeter || delimeterFile;

    if (logLevelFinal) {
        config.logLevel = logLevelFinal
    }

    if (appenderFinal) {
        config.appender = appenderFinal
    }

    if (formatterFinal) {
        config.formatter = formatterFinal;
    }

    if (logPathFileFinal) {
        config.logPath = logPathFileFinal;
    }

    if (logErrorPathFileFinal) {
        config.logErrorPath = logErrorPathFileFinal;
    }

    if (delimeterFinal) {
        config.delimeter = delimeterFinal;
    }

    enrichConfig(config);

    return config;
}

const config = initConfig();
export default config;
