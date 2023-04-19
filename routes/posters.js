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
            poster.set('description', form.data.description);
            poster.set('date', form.data.date);
            poster.set('stock', form.data.stock);
            poster.set('height', form.data.height);
            poster.set('width', form.data.width);
            await poster.save();
            res.redirect('/posters');
        },
        'error': async (form) => {
            // re-render the form
            res.render('posters/create', {
                'form': form.toHTML(bootstrapField)
            })
        }
    })
});

// now for updating an existing product... route to render the form first
router.get('/:poster_id/update', async (req, res) => {
    // retrieve the product first
    const posterId = req.params.poster_id;
    const poster = await Poster.where({
        'id': posterId
    }).fetch({
        require: true
    });

    const posterForm = createPosterForm();
    // fill in the existing values
    posterForm.fields.title.value = poster.get('title');
    posterForm.fields.cost.value = poster.get('cost');
    posterForm.fields.description.value = poster.get('description');
    posterForm.fields.date.value = poster.get('date');
    posterForm.fields.stock.value = poster.get('stock');
    posterForm.fields.height.value = poster.get('height');
    posterForm.fields.width.value = poster.get('width');

    res.render('posters/update', {
        'form': posterForm.toHTML(bootstrapField),
        'poster': poster.toJSON()
    })
});

// route to process the submitted updating form
router.post('/:poster_id/update', async (req, res) => {
    // fetch the poster to be updated
    const poster = await Poster.where({
        'id': req.params.poster_id
    }).fetch({
        require: true
    });

    // process the form
    const posterForm = createPosterForm();
    posterForm.handle(req, {
        'success': async (form) => {
            poster.set(form.data);
            poster.save();
            res.redirect('/posters');
        },
        'error': async (form) => {
            res.render('posters/update', {
                'form': form.toHTML(bootstrapField),
                'poster': poster.toJSON()
            })
        }
    });
});

// route for deletion (GET to start the process)...
router.get('/:poster_id/delete', async (req, res) => {
    // fetch the poster to be deleted
    const poster = await Poster.where({
        'id': req.params.poster_id
    }).fetch({
        require: true
    });

    // send the poster to the hbs file for deletion
    res.render('posters/delete', {
        'poster': poster.toJSON()
    });
});

// route for deletion (processing and actual deletion)
router.post('/:poster_id/delete', async (req, res) => {
    // fetch the poster to be deleted
    const poster = await Poster.where({
        'id': req.params.poster_id
    }).fetch({
        require: true
    });

    // .destroy() will delete the poster
    await poster.destroy();
    res.redirect('/posters');
});

module.exports = router;
