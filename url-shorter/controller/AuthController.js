import service from "../service.js";
import jwt from "jsonwebtoken";

function renderLoginPage(req, res) {
    res.render("login", { errorMessage: "" });
}

function handleLogin(req, res) {
    const { login, password } = req.body;
    if (service.checkPassword(login, password)) {
        const accessToken = jwt.sign(
            { login },
            "secret",
            {
                expiresIn: '2h',
            }
        );
        res.cookie('SESSION_TOKEN', accessToken, {
            expires: new Date(Date.now() + 90000),
            httpOnly: true,
        });
        res.redirect("/users");
    } else {
        res.render("login", { errorMessage: "Unauthorized" });
    }
}

function handleRegister(req, res, next) {
    try {
        const { name, password } = req.body;
        const created_time = Date.now();

        service.addUser(name, password, created_time);

        const newUser = { name, password, created_time };

        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        next(error);
    }
}

export {
    renderLoginPage,
    handleLogin,
    handleRegister
}
