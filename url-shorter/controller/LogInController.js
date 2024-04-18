import express from "express";
import service from "../service.js";

const router = new express.Router();

router.get("/", express.json(), (req, res) => {
    res.render("login", { errorMessage: "" })
});

router.post("/", express.json(), (req, res) => {
    const { login, password } = req.body;
    if (service.checkPassword(login, password)) {
        req.session.login = login;
        console.log('req.session', req.session);
        res.redirect(302, "/users");
    } else {
        res.render("login", { errorMessage: "Unauthorized" });
    }
});

router.post("/register", express.json(), (req, res, next) => {
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

export default router;