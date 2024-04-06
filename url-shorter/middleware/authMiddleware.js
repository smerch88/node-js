import service from "../service.js";

export default async (req, res, next) => {
    const users = await service.getAllUsers();
    console.log(users);
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

    res.status(401).end("Unauthorized");
};
