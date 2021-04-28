const express = require('express');
const router = express.Router();

const registerController = require('../app/controllers/RegisterController.js');


router.post('/store', registerController.store)
router.get('/', registerController.register);

module.exports = router;