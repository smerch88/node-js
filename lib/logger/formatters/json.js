import config from "../config.js";

export default function formatMessage(date, level, category, message) {
    const data = {
        date,
        category,
        level,
        message: message.map((el) => JSON.stringify(el)).join(config.delimeter),
    };
    return JSON.stringify(data, null, 2) + ',';
}
