const express = require('express');
const router = express.Router();
const rankingController = require('../controllers/rankingController');

router.get('/check/:clientId', ()=> rankingController.checkRanking);

module.exports = rankingController;