const createController = require('../app/controllers/CreateController.js');
const express = require('express');
const router = express.Router();

router.post('/store', createController.store)
router.get('/', createController.create);

module.exports = router;