// route to display all products

const express = require("express");
const router = express.Router();

// 1. import in the Poster model
const {Poster} = require('../models');

router.get('/', async (req, res) => {
    // 2. fetch all the products (i.e. SELECT * from products)
    let posters = await Poster.collection().fetch();
    res.render('posters/index', {
        'posters': posters.toJSON() // 3. convert collection to JSON
    })
});

module.exports = router;
