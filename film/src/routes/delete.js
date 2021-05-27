const express = require('express');

const router = express.Router();
const deleteController = require('../app/controllers/DeleteController.js')

router.get('/', deleteController.delete);
router.post('/', deleteController.delete_post)

module.exports = router;