import config from "../config.js";

export default function formatMessage(date, level, category, message, newRow = true) {
    return `Date: ${date}, category:${category}, level:${level}, message:${message
        .map((el) => JSON.stringify(el))
        .join(config.delimeter)}${newRow ? '\n' : ''}`;
}
