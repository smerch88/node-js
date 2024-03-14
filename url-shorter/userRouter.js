import express from "express";

const router = new express.Router();


router.get("/name", (req, res, next) => {
    res.send("Arsenii")
})
router.get("/email", (req, res, next) => {
    res.send("arsenii@gmail.com");
})

export default router;
