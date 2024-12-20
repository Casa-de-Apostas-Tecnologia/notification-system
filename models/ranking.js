const poolPromise = require('../config/database');

module.exports = {
  async getRankings(userId) {
    const pool = await poolPromise;

    const query = `
      WITH Top50 AS (
        SELECT TOP 50 *
        FROM dbo.ranking
        ORDER BY classificacao
      )
      SELECT * 
      FROM Top50
      WHERE userId = @userId

      UNION ALL

      SELECT * 
      FROM Top50
      WHERE userId != @userId
      ORDER BY calassificacao;
    `;

    const result = await pool.request()
      .input('userId', sql.Int, userId)
      .query(query);

    return result.recordset;
  }
};
