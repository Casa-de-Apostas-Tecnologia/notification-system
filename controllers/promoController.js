const Promo = require('../models/promo');

exports.signPromo = async (req, res) => {
  try {
    const { clientId } = req.params;
    const { promotionId, firstName } = req.body;

    if (!promotionId || !firstName) {
      return res.status(400).json({ message: 'Promoção e nome do cliente são obrigatórios.' });
    }

    const signUpResult = await Promo.signUpClientForPromotion(promotionId, clientId, firstName);

    if (signUpResult.message === 'Cliente já inscrito nesta promoção.') {
      return res.status(400).json({ message: 'Cliente já inscrito nesta promoção!' });
    }

    return res.json({ message: 'Cliente inscrito com sucesso!', result: signUpResult });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao tentar inscrever o cliente na promoção');
  }
};
