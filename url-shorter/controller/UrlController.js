import express from "express";
import service from "../service.js";
import generateHash from "../../utils/generateHash.js";

const router = express.Router();

router.post("/add", express.json(), (req, res) => {
    console.log(req.body);
    let user;
    const username = req.cookies.login;
    const password = req.cookies.password;

    if (username && password) {
        user = username;
    } else {
        const auth = req.header("Authorization");
        if (auth?.startsWith("Basic ")) {
            const authData = auth.substring(6).split(":");
            user = authData[0];
        }
    }

    const code = generateHash(10);
    const name = req.body.name;
    const url = req.body.url;

    service.addUrl(code, name, url, user);

    res.json({ code });
});

router.get("/info/:code", async (req, res) => {
    const data = await service.getUrl(req.params.code);
    res.json(data);
});

router.get("/:username/urls", async (req, res) => {
    const username = req.cookies.login;
    const userUrls = await service.getUserUrls(username);
    console.log(userUrls)
    res.render("shorter", { urls: userUrls });
});

export default router;
