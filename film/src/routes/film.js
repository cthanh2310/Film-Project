const express = require('express');

const router = express.Router();

const filmController = require('../app/controllers/FilmController.js');



router.get('/', filmController.film);
router.post('/', filmController.film_Post);
module.exports = router;
