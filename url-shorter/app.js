import express from "express"
import authMiddleware from "./authMiddleware.js";
import UserController from "./controller/UserController.js";
import UrlController from "./controller/UrlController.js";
import CodeController from "./controller/CodeController.js";
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.set("views", path.join(__dirname, "view"));
app.set("view engine", "ejs");
app.use("/files", express.static("view"));

app.use("/users", UserController);
app.use("/info", (req, res, next) => {
    req.session = {
        status: "created"
    }

    if (req.method === "GET") {
        next();
    }

    throw new Error(404);

})
app.use(authMiddleware);
app.use("/url", UrlController);
app.use("/code", CodeController);

app.use((err, req, res, next) => {
    console.log(err);

    res.status(501).send(err.message)
})

app.listen(3001, () => {
    console.log("Server Started");
})
