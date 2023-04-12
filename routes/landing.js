// Express
const express = require("express");

// Create a new Express Router
const router = express.Router();

// Add a new route to the Express router
router.get("/", (req,res) => {
    //res.send("Welcome.");
    res.render('landing/index');
})

// add the routes for the about us and contact us pages
router.get("/about-us", (req,res) => {
    //res.send("Welcome.");
    res.render('landing/about-us');
})

router.get("/contact-us", (req,res) => {
    //res.send("Welcome.");
    res.render('landing/contact-us');
})

// Export out the Router
module.exports = router;