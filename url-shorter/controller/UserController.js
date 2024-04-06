import express from "express";
import service from "../service.js";

const router = new express.Router();

router.get("/", express.json(), async (req, res) => {
    const users = await service.getAllUsers();
    res.render("users", { "users": users });
});

router.post("/create", express.json(), (req, res, next) => {
    try {
        const { name, password } = req.body;
        const created_time = Date.now();

        service.addUser(name, password, created_time);

        const newUser = { name, password, created_time };

        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        next(error);
    }
});

router.get("/all", async (req, res, next) => {
    try {
        const users = await service.getAllUsers();
        res.json(users);
    } catch (error) {
        next(error);
    }
});

export default router;