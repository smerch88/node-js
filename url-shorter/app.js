import express from "express"
import cookieParser from "cookie-parser";
import authMiddleware from "./middleware/authMiddleware.js";
import sessionMiddleware from "./middleware/sessionMiddleware.js";
import LogInController from "./controller/LogInController.js";
import UserController from "./controller/UserController.js";
import UrlController from "./controller/UrlController.js";
import CodeController from "./controller/CodeController.js";
import session from "express-session";
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(cookieParser());
app.use(sessionMiddleware);

app.set("views", path.join(__dirname, "view"));
app.set("view engine", "ejs");

app.use(cookieParser());

app.use(session({
    secret: "QWESdfisdfj3",
    saveUninitialized: true,
    resave: true,
    name: "sessionId",
    cookie: {
        httpOnly: true,
        domain: "127.0.0.1",
    }
}));

app.use("/login", LogInController);
app.use(authMiddleware);
app.use("/users", UserController);
app.use("/url", UrlController);
app.use("/code", CodeController);

app.use((err, req, res, next) => {
    console.log(err);

    res.status(501).send(err.message)
})

app.listen(3001, () => {
    console.log("Server Started");
})
