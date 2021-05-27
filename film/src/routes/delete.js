const express = require('express');

const router = express.Router();
const deleteController = require('../app/controllers/DeleteController.js')
router.post('/store/:id', deleteController.deleteByID);
router.get('/', deleteController.delete);
router.post('/', deleteController.delete_post)

module.exports = router;