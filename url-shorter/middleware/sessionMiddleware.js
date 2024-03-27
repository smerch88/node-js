import generateHash from "../../utils/generateHash.js";

const SESSION_ID = "sessionId";

const storage = {};

function sessionMiddleware(req, res, next) {
    let sessionId = req.cookies[SESSION_ID];
    let session = storage[sessionId];

    if (!session) {
        if (!sessionId) {
            sessionId = generateHash(16);
            res.cookie(SESSION_ID, sessionId, { httpOnly: true });
        }
        session = {};
    }

    req.sessionId = sessionId;
    req.session = session;

    next();
}

export default sessionMiddleware;
