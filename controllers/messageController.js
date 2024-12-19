const Message = require('../models/message');
const { encrypt, decrypt } = require('../utils/encryption');

exports.sendMultipleMessages = async (req, res) => {
    try {
      const { clientIds, content } = req.body;
  
      const encryptedContent = encrypt(content);
  
      const messages = [];
      for (const clientId of clientIds) {
        const newMessage = await Message.create({
          clientId,
          content: encryptedContent,
          isPromotion: false
        });
  
        messages.push(newMessage);
      }
  
      res.status(201).json({
        message: `Mensagem enviada com sucesso para ${messages.length} usuários.`,
        sentMessages: messages
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao enviar as mensagens');
    }
  };

exports.checkMessages = async (req, res) => {
  try {
    const { clientId } = req.params;

    const messages = await Message.findAll({
      where: { clientId },
      order: [['createdAt', 'DESC']]
    });

    if (messages.length === 0) {
      return res.json({ hasMessage: false });
    }

    const message = messages[0];
    const decryptedMessage = decrypt(message.content);

    return res.json({
      hasMessage: true,
      message: decryptedMessage,
      promotion: message.isPromotion || false,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao verificar mensagens');
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const message = await Message.findByPk(req.params.messageId);
    if (!message) {
      return res.status(404).send('Mensagem não encontrada');
    }

    message.status = 'read';
    message.dateRead = new Date();
    await message.save();

    res.status(200).send('Mensagem marcada como lida');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao marcar mensagem como lida');
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    const message = await Message.findByPk(req.params.messageId);
    if (!message) {
      return res.status(404).send('Mensagem não encontrada');
    }

    message.status = 'deleted';
    message.dateDeleted = new Date();
    await message.save();

    res.status(200).send('Mensagem excluída com sucesso');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao excluir a mensagem');
  }
};
