const express = require("express");
const path = require("path");
const router = require("express").Router();

// home route
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
})

// exercise page
router.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/exercise.html"));
})

// stats page
router.get("/stats", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/stats.html"));
})
// all other
router.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
})

module.exports = router;