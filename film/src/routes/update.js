const express = require('express');
const router = express.Router();
const updateController = require('../app/controllers/UpdateController.js');

router.post('/store', updateController.store);
router.get('/', updateController.update);
router.post('/', updateController.update_post);
module.exports = router;


