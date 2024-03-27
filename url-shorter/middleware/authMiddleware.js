import service from "../service.js";

export default (req, res, next) => {
    const usersMap = service.getAllUsers();
    const users = Array.from(usersMap.values());
    const auth = req.header("Authorization");

    if (auth?.startsWith("Basic ")) {
        const authData = auth.substring(6).split(":");
        const username = authData[0];
        const password = authData[1];

        if (users.has(username) && users.get(username).password === password) {
            next();
            return;
        }
    }

    res.status(401).end("Unauthorized");
};