import express from "express";
import service from "../service.js";

const router = new express.Router();

router.get("/:code", express.json(),
    (req, res) => {
        const data = service.getUrl(req.params.code);
        if (!data) {
            return res.status(404).send("Code not found");
        }
        service.incrementUrlCount(req.params.code);
        res.redirect(data.url);
    });

export default router;  