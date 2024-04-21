import express from "express";
import { getUrl } from "../controller/CodeController.js";

const router = new express.Router();

router.get("/:code", getUrl);

export default router;