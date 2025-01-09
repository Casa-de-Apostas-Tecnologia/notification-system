const sql = require('mssql');
const poolPromise = require('../config/database');

async function createRankingTable() {
  const pool = await poolPromise;
  
  await pool.request().query(`
    IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'dbo' AND TABLE_NAME = 'ranking')
    BEGIN
      CREATE TABLE dbo.ranking (
        id INT NOT NULL,
        nome VARCHAR(255) NOT NULL,
        somaOdds DECIMAL(10, 2) NOT NULL,
        updatedAt DATETIME,
        classificacao INT NOT NULL

      );
    END
  `);
  console.log('Tabelas dbo.ranking criadas ou já existentes');
}
createRankingTable();

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
      ORDER BY classificacao;
    `;

    const result = await pool.request()
      .input('userId', sql.Int, userId)
      .query(query);

    return result.recordset;
  }
};
