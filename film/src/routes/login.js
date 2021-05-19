const express = require('express');

const router = express.Router();
const loginController = require('../app/controllers/LoginController.js');

router.post('/store',loginController.store);

router.get('/', loginController.login);

module.exports = router;
