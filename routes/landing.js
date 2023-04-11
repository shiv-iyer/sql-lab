// Express
const express = require("express");

// Create a new Express Router
const router = express.Router();

// Add a new route to the Express router
router.get("/", (req,res) => {
    res.send("Welcome.");
})

// Export out the Router
module.exports = router;