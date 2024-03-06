const level = {
    ERROR: "ERROR",
    WARN: "WARN",
    INFO: "INFO",
    DEBUG: "DEBUG",
    TRACE: "TRACE"
}

const scoreLevel = {
    [level.ERROR]: 1,
    [level.WARN]: 2,
    [level.INFO]: 3,
    [level.DEBUG]: 4,
    [level.TRACE]: 5
}

const appender = {
    CONSOLE: "CONSOLE",
    FILE: "FILE"
}

const logPath = {
    LOG_FILE_PATH: "./app.log",
    LOG_FILE_ERROR_PATH: "./app_error.log"
}

const formatters = {
    JSON: "JSON",
    CSV: "CSV",
    DEFAULT: "DEFAULT"
}

const delimeter = ","

export { level, scoreLevel, appender, formatters, logPath, delimeter }
