export default {
    serverPepper: process.env.SERVER_PEPPER ?? "PEPPER",
    secret: process.env.SECRET ?? "QWESdfisdfj3",
    port: process.env.PORT || 3001,
    hostname: process.env.HOSTNAME || "127.0.0.1",
    redisUrl: process.env.REDIS_URL || "redis://@127.0.0.1:6379"
}
