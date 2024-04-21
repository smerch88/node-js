import cookieParser from "cookie-parser";
import express from "express";
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import CodeController from "./controller/CodeController.js";
import UrlController from "./controller/UrlController.js";
import UserController from "./controller/UserController.js";
import authRouter from "./routes/authRouter.js";
import { jwtMiddleware } from "./middleware/authMiddleware.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(cookieParser());
app.use(express.json());

app.set("views", path.join(__dirname, "view"));
app.set("view engine", "ejs");

app.use("/login", authRouter);
app.use("/code", CodeController);
app.use(jwtMiddleware);
// app.use(authorizedInSessionMiddleware);
app.use("/users", UserController);
app.use("/url", UrlController);

app.use((err, req, res, next) => {
    console.log(err);

    res.status(501).send(err.message)
})

app.listen(3001, () => {
    console.log("Server Started");
})
