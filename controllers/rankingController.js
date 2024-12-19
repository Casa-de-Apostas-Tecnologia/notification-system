const Ranking = require('../models/ranking');

exports.checkRanking = async (req, res) => {
  try {
    const { clientId } = req.params;

    const ranking = await Ranking.findAll();

    if (ranking.length === 0) {
      return res.status(404).json({ message: 'Ranking vazio' });
    }

    const top50 = ranking.slice(0, 50);

    let userRanking = null;
    if (clientId) {
      userRanking = ranking.find(user => user.clientId === parseInt(clientId));
    }

    return res.json({
      ranking: ranking,
      top50: top50,
      userRanking: userRanking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao verificar ranking');
  }
};
