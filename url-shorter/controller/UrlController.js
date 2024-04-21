import generateHash from "../utils/generateHash.js";
import rateService from "../services/rateService.js";
import urlService from "../services/urlService.js";

async function addUrl(req, res) {
    try {
        const login = res.locals.decoded.login;
        const code = generateHash(10);
        console.log("req.body", req.body);
        const name = req.body.name;
        const url = req.body.url;

        await urlService.addUrl(code, name, url, login);
        await rateService.setUrlRate(code, login);
        await rateService.setUrlRateName(code, login);

        res.redirect("/url/my-urls");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function deleteUrl(req, res) {
    try {
        const code = req.params.code;
        await urlService.deleteUrl(code);
        res.redirect("/url/my-urls");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function getUrlInfo(req, res) {
    try {
        const data = await urlService.getUrl(req.params.code);
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function getUserUrls(req, res) {
    try {
        const login = res.locals.decoded.login;
        const userUrls = await urlService.getUserUrls(login);
        res.render("shorter", { urls: userUrls });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export { addUrl, getUrlInfo, getUserUrls, deleteUrl }