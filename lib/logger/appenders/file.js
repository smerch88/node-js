import fs from "fs";
const file = "./log.txt";

function log(date, level, category, message) {
    const formattedMessage = formatMessage(date, level, category, message) + "\n";

    fs.writeFile(file, formattedMessage, { flag: "a+" }, (err) => {
        if (err) {
            console.error("Error writing to file:", err);
        }
    });
}

function formatMessage(date, level, category, message) {
    return `Date: ${date}, category: ${category}, level: ${level}, message: ${JSON.stringify(message)}`;
}

export default { log };
