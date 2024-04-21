import cookieParser from "cookie-parser";
import express from "express";
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { jwtMiddleware } from "./middleware/authMiddleware.js";
import authRouter from "./routes/authRouter.js";
import codeRouter from "./routes/codeRouter.js";
import urlRouter from "./routes/urlRouter.js";
import usersRouter from "./routes/usersRouter.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(cookieParser());
app.use(express.json());

app.set("views", path.join(__dirname, "view"));
app.set("view engine", "ejs");

app.use("/login", authRouter);
app.use("/code", codeRouter);
app.use(jwtMiddleware);
app.use("/users", usersRouter);
app.use("/url", urlRouter);

app.use((err, req, res, next) => {
    console.log(err);

    res.status(501).send(err.message)
})

app.listen(3001, () => {
    console.log("Server Started");
})
