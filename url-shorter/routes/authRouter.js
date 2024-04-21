import express from "express";
import { renderLoginPage, handleLogin, handleRegister, renderRegisterPage } from "../controller/AuthController.js";

const router = new express.Router();

router.get("/", renderLoginPage);
router.get("/register", renderRegisterPage);
router.post("/", handleLogin);
router.post("/register", handleRegister);

export default router;