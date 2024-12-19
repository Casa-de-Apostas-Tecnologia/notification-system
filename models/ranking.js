const poolPromise = require('../config/database');

module.exports = {
  async getRankings() {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM dbo.ranking');
    return result.recordset;
  }
};
