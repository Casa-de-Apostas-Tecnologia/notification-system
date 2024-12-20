const Ranking = require('../models/ranking');

exports.checkRanking = async (req, res) => {
  try {
    const { clientId } = req.params;

    const ranking = await Ranking.getRankings(clientId);

    if (ranking.length === 0) {
      return res.status(404).json({ message: 'Ranking vazio' });
    }
    return res.json(ranking);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao verificar ranking');
  }
};
