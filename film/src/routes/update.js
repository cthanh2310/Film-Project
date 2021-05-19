const updateController = require('../app/controllers/UpdateController.js');
const express = require('express');
const router = express.Router();

router.post('/store', updateController.store)
router.get('/', updateController.update);

module.exports = router;