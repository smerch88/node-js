import net from "net";
import config from "../config.js";

let client;

const log = formatter => (date, level, category, message) => {
    const data = formatter(date, level, category, message);
    if (client && client.writable) {
        client.write(data);
    }
};

function init(formatter) {
    if (!config.networkPort || !config.networkHostname) {
        throw new Error("Port and hostname must be specified in the config.");
    }

    client = net.connect({ port: config.networkPort, host: config.networkHostname }, () => {
        console.log("Connected");
    });

    process.on("exit", () => {
        if (client) {
            client.end();
        }
    });

    return { log: log(formatter) };
}

export default init;
