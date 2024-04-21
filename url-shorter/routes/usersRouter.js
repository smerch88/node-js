import express from "express";
import { getAllUsersPage, createUser, getAllUsers } from "../controller/UserController.js";

const router = new express.Router();

router.get("", getAllUsersPage);
router.get("/all", getAllUsers);
router.post("/create", createUser);

export default router;