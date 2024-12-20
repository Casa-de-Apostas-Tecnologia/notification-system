const express = require('express');
const rankingRouter = express.Router();
const rankingController = require('../controllers/rankingController');

router.get('/check/:clientId', ()=> rankingController.checkRanking);

module.exports = rankingController;