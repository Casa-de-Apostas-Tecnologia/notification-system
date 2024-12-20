const express = require('express');
const rankingRouter = express.Router();
const rankingController = require('../controllers/rankingController');

rankingRouter.get('/check/:clientId', ()=> rankingController.checkRanking);

module.exports = rankingRouter;