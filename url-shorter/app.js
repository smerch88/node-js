import express from "express"
import authMiddleware from "./authMiddleware.js";
import UserController from "./controller/UserController.js";
import UrlController from "./controller/UrlController.js";

const app = express();


app.use("/user", UserController);
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

app.use((err, req, res, next) => {
    console.log(err);

    res.status(501).send(err.message)
})

app.listen(3001, () => {
    console.log("Server Started");
})
