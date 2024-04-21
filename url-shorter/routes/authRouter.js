import express from "express";
import { renderLoginPage, handleLogin, handleRegister } from "../controller/AuthController.js";

const router = new express.Router();

router.get("/", renderLoginPage);
router.post("/", handleLogin);
router.post("/register", handleRegister);

export default router;