// route to display all products

const express = require("express");
const router = express.Router();

// 1. import in the Poster model
const {Poster} = require('../models');

// (import in the Forms)
const { bootstrapField, createPosterForm } = require('../forms');

router.get('/', async (req, res) => {
    // 2. fetch all the products (i.e. SELECT * from products)
    let posters = await Poster.collection().fetch();
    res.render('landing/index', {
        'posters': posters.toJSON() // 3. convert collection to JSON
    })
});

// render the form
router.get('/create', async (req, res) => {
    const posterForm = createPosterForm();
    res.render('posters/create', {
        'form': posterForm.toHTML(bootstrapField)
    })
});

router.post('/create', async (req, res) => {
    const posterForm = createPosterForm();
    posterForm.handle(req, {
        'success': async (form) => {
            // create a new instance of the Poster model, and post with it
            const poster = new Poster();
            poster.set('title', form.data.title);
            poster.set('cost', form.data.cost);
            poster.set('decsription', form.data.description);
            poster.set('date', form.data.date);
            poster.set('stock', form.data.stock);
            poster.set('height', form.data.height);
            poster.set('width', form.data.width);
            await poster.save();
            res.redirect('/posters');
        }
    })
})

module.exports = router;
