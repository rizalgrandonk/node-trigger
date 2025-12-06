require("dotenv").config()

const express = require("express");
const cors = require("cors");

const state = process.env.STATE
const isTriggered = state === "ENABLE"

const app = express();

app.use(cors());

app.get("/", (req, res) => {
    if (isTriggered) {
        return res.status(200).json({ message: "Success!" });
    }
    return res.status(400).json({ message: "Wait!" });
});

app.get("/log", (req, res) => {
    const message = req.query.message;
    console.log("LOG MESSAGE ::", message);
    return res.status(200).json({ message: "Success!" });
});

app.get("/check", (req, res) => {
    return res.status(200).json({ message: "OK!" });
});

app.listen(process.env.PORT ?? 3000, () => {
    console.log("Listen on port 3000", {STATE: state});
});
