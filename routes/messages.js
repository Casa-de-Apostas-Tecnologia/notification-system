const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

router.post('/send/multiple', messageController.sendMultipleMessages);

router.post('/mark-as-read/:userId/:messageId', messageController.markAsRead);

router.delete('/delete/:userId/:messageId', messageController.deleteMessage);

router.get('/check/:clientId', messageController.checkMessages);

module.exports = router;