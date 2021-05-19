const express = require('express');
const router = express.Router();
const searchController = require('../app/controllers/SearchController.js')
router.get('/', searchController.search)



module.exports = router;