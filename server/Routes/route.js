const express = require('express');
const router = express.Router();

const { addToFav, getFav } = require('../Services/service.js')


router.post('/:id', addToFav);
router.get('/', getFav);
router.post('/remove/:id', removeFav);

module.exports = router;