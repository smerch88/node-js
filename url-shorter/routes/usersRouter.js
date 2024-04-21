import express from "express";
import { getAllUsersPage, createUser, getAllUsers } from "../controller/UserController.js";
import { isAdmin } from "../middleware/authMiddleware.js";

const router = new express.Router();

router.get("", isAdmin, getAllUsersPage);
router.get("/all", isAdmin, getAllUsers);
router.post("/create", createUser);

export default router;
