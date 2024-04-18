import service from "../service.js";

async function basicAuthorizationMiddleware(req, res, next) {
    const users = await service.getAllUsers();
    const auth = req.header("Authorization");
    console.log('auth', auth);

    if (auth?.startsWith("Basic ")) {
        const authData = auth.substring(6).split(":");
        const username = authData[0];
        const password = authData[1];

        const user = users.find(user => user.name === username);
        console.log('username', username);
        console.log('password', password);
        console.log('user', user);
        if (user && user.password === password) {
            next();
            return;
        }
    }
    res.setHeader("WWW-Authenticate", "Basic");
    res.status(401).end("Unauthorized");
};

function authorizedInSessionMiddleware(req, res, next) {
    if (req.session.email) {
        return next();
    }

    if (req.method === "GET") {
        res.redirect(302, "/login");
    } else {
        res.status(401).send("Unauthorized");
    }
}

export {
    authorizedInSessionMiddleware,
    basicAuthorizationMiddleware
}
