import express from "express";
import service from "../service.js";
import rateService from "../services/rateService.js";

const router = new express.Router();

router.get("/:code", express.json(),
    async (req, res) => {
        const rateLimitExceeded = await rateService.checkURLRate(req.params.code);
        if (rateLimitExceeded === false) {
            return res.status(429).send("Rate limit exceeded");
        }
        const data = await service.getUrl(req.params.code);
        if (!data) {
            return res.status(404).send("Code not found");
        }
        await service.incrementUrlCount(req.params.code);
        res.redirect(data.url);
    });

export default router;
