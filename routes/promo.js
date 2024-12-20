const express = require('express');
const promoRouter = express.Router();
const promoController = require('../controllers/promoController');

promoRouter.get('/sign/:clientId/signup', ()=> promoController.sign);

module.exports = promoRouter;