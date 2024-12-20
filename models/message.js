const poolPromise = require('../config/database');

async function createMessageTable() {
  const pool = await poolPromise;
  await pool.request().query(`
    IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'dbo' AND TABLE_NAME = 'messages')
    BEGIN
      CREATE TABLE dbo.messages (
        id INT IDENTITY(1,1) PRIMARY KEY,
        clientId VARCHAR(255) NOT NULL,
        content VARCHAR(255) NOT NULL,
        status VARCHAR(20) DEFAULT 'sent' CHECK (status IN ('sent', 'read', 'deleted')),
        dateSent DATETIME DEFAULT GETDATE(),
        dateRead DATETIME NULL,
        dateDeleted DATETIME NULL
      );
    END
  `);
  console.log('Tabela dbo.messages criada ou já existente');
}

createMessageTable();

module.exports = {
  async createMessage(clientId, content) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('clientId', sql.VarChar, clientId)
      .input('content', sql.VarChar, content)
      .query(`
        INSERT INTO dbo.messages (clientId, content)
        VALUES (@clientId, @content);
      `);
    return result;
  },

  async getMessages() {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM dbo.messages');
    return result.recordset;
  }
};
