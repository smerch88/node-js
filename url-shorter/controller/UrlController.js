import express from "express";
import service from "../service.js";
import generateHash from "../../utils/generateHash.js";

const router = new express.Router();

router.get("/", (req, res) => {
    res.send("This is the URL controller");
});

router.post("/add", express.json(),
    (req, res) => {
        console.log(req.body);
        let user;
        const auth = req.header("Authorization");
        if (auth?.startsWith("Basic ")) {
            const authData = auth.substring(6, auth.length).split(":");
            console.log(authData);
            user = authData[0];
        }

        const code = generateHash(10);
        const name = req.body.name;
        const url = req.body.url;

        service.add(code, name, url, user);

        res.json({ code });
    });

router.get("/info/:code", (req, res, next) => {
    const data = service.get(req.params.code);
    res.json(data);
    next();
})

export default router;