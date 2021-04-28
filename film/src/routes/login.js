const express = require('express');

const router = express.Router();
const loginController = require('../app/controllers/LoginController.js');

router.get('/', loginController.login);
router.post('/store', loginController.store);
module.exports = router;
