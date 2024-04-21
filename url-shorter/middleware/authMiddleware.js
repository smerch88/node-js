import userService from "../services/userService.js";
import jwt from "jsonwebtoken";

async function basicAuthorizationMiddleware(req, res, next) {
    const users = await userService.getAllUsers();
    const auth = req.header("Authorization");

    if (auth?.startsWith("Basic ")) {
        const authData = auth.substring(6).split(":");
        const username = authData[0];
        const password = authData[1];

        const user = users.find(user => user.name === username);
        if (user && user.password === password) {
            next();
            return;
        }
    }
    res.setHeader("WWW-Authenticate", "Basic");
    res.status(401).end("Unauthorized");
};

async function jwtMiddleware(req, res, next) {
    const token = req.cookies['SESSION_TOKEN'];
    if (!token) {
        res.redirect('/login');
        return;
    }
    try {
        const decoded = jwt.verify(token, "secret");
        const login = decoded?.login;
        const users = await userService.getAllUsers();
        const user = users.filter(user => user.name === login);
        if (user) {
            res.locals.decoded = { login };
            return next();
        } else {
            res.redirect('/login');
            return;
        }
    } catch (err) {
        console.log(err);
        res.redirect('/login');
        return;
    }
};


export {
    jwtMiddleware,
    basicAuthorizationMiddleware
}
