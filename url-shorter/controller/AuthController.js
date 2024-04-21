import authService from "../services/authService.js";
import userService from "../services/userService.js";
import jwt from "jsonwebtoken";

function renderLoginPage(req, res) {
    res.render("login", { errorMessage: "" });
}

function renderRegisterPage(req, res) {
    res.render("register", { errorMessage: "" });
}

function handleLogin(req, res) {
    const { login, password } = req.body;
    if (authService.checkPassword(login, password)) {
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

async function handleRegister(req, res) {
    try {
        const { name, password } = req.body;
        const created_time = Date.now();

        await userService.addUser(name, password, created_time);

        res.redirect("/login");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export {
    renderLoginPage,
    handleLogin,
    handleRegister,
    renderRegisterPage
}
