import * as constants from "../constants.js";
import defaultFormatter from "./default.js"
import jsonFormatter from "./json.js"
import csvFormatter from "./csv.js"

const formatters = {
    [constants.formatters.JSON]: jsonFormatter,
    [constants.formatters.CSV]: csvFormatter,
    [constants.formatters.DEFAULT]: defaultFormatter,
    [undefined]: defaultFormatter
}
function getFormatter(formatter) {
    return formatters[formatter];
}

export { getFormatter }
