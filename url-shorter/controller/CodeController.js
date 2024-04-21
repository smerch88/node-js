import urlService from "../services/urlService.js";
import rateService from "../services/rateService.js";

async function getUrl(req, res) {
    const rateLimitExceeded = await rateService.checkURLRate(req.params.code);
    if (rateLimitExceeded === false) {
        return res.status(429).send("Rate limit exceeded");
    }
    const data = await urlService.getUrl(req.params.code);
    if (!data) {
        return res.status(404).send("Code not found");
    }
    await urlService.incrementUrlCount(req.params.code);
    res.redirect(data.url);
}

export { getUrl }