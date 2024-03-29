import color from "./color.js"
import logger from "../lib/logger/logger.js";
import dotenv from "dotenv";
dotenv.config()

const log = logger.getLogger("app.js");

log.info(color)
log.error(color)
log.warn(color)
log.trace(color)
log.trace(color)
log.info("Data", color, "User:", color, "Sdf", "test")