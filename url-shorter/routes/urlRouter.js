import express from "express";
import { addUrl, getUrlInfo, getUserUrls } from "../controller/UrlController.js";

const router = new express.Router();

router.post("/add", addUrl);
router.get("/info/:code", getUrlInfo);
router.get("/my-urls", getUserUrls);

export default router;