const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// Rota para enviar uma mensagem
router.post('/send/multiple', messageController.sendMultipleMessages);

// Rota para marcar uma mensagem como lida
router.post('/mark-as-read/:userId/:messageId', messageController.markAsRead);

// Rota para excluir uma mensagem
router.delete('/delete/:userId/:messageId', messageController.deleteMessage);

// Nova rota para verificar se o usuário tem mensagens
router.get('/check/:clientId', messageController.checkMessages);

module.exports = router;