import express from "express";
import { addUrl, deleteUrl, getUrlInfo, getUserUrls } from "../controller/UrlController.js";

const router = new express.Router();

router.post("/add", addUrl);
router.post("/delete/:code", deleteUrl);
router.get("/info/:code", getUrlInfo);
router.get("/my-urls", getUserUrls);

export default router;