const sql = require('mssql');
const poolPromise = require('../config/database');

async function createPromotionTables() {
  const pool = await poolPromise;
  
  await pool.request().query(`
    IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'dbo' AND TABLE_NAME = 'promotions')
    BEGIN
      CREATE TABLE dbo.promotions (
        id INT IDENTITY(1,1) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,        -- Nome da promoção
        description TEXT,                  -- Descrição da promoção
        startDate DATETIME,                -- Data de início
        endDate DATETIME                   -- Data de término
      );
    END
  `);

  await pool.request().query(`
    IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'dbo' AND TABLE_NAME = 'promotion_participants')
    BEGIN
      CREATE TABLE dbo.promotion_participants (
        id INT IDENTITY(1,1) PRIMARY KEY,
        promotionId INT,                          -- Chave estrangeira para promoções
        clientId INT,                             -- ID do cliente
        firstName VARCHAR(100),                   -- Nome do cliente
        registrationDate DATETIME,                -- Data de inscrição
        FOREIGN KEY (promotionId) REFERENCES dbo.promotions(id)
      );
    END
  `);

  console.log('Tabelas dbo.promotions e dbo.promotion_participants criadas ou já existentes');
}

createPromotionTables();

module.exports = {
  async createPromotion(name, description, startDate, endDate) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('name', sql.VarChar, name)
      .input('description', sql.Text, description)
      .input('startDate', sql.DateTime, startDate)
      .input('endDate', sql.DateTime, endDate)
      .query(`
        INSERT INTO dbo.promotions (name, description, startDate, endDate)
        VALUES (@name, @description, @startDate, @endDate);
      `);
    
    return result;
  },

  async signUpClientForPromotion(promotionId, clientId, firstName) {
    const pool = await poolPromise;

    const checkIfAlreadySignedUp = await pool.request()
      .input('promotionId', sql.Int, promotionId)
      .input('clientId', sql.Int, clientId)
      .query(`
        SELECT COUNT(*) AS count
        FROM dbo.promotion_participants
        WHERE promotionId = @promotionId AND clientId = @clientId
      `);

    if (checkIfAlreadySignedUp.recordset[0].count > 0) {
      return { message: 'Cliente já inscrito nesta promoção.' };
    }

    const result = await pool.request()
      .input('promotionId', sql.Int, promotionId)
      .input('clientId', sql.Int, clientId)
      .input('firstName', sql.VarChar, firstName)
      .input('registrationDate', sql.DateTime, new Date())
      .query(`
        INSERT INTO dbo.promotion_participants (promotionId, clientId, firstName, registrationDate)
        VALUES (@promotionId, @clientId, @firstName, @registrationDate);
      `);

    return { message: 'Cliente inscrito com sucesso na promoção.' };
  },

  async getPromotions() {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM dbo.promotions');
    return result.recordset;
  },

  async getPromotionParticipants(promotionId) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('promotionId', sql.Int, promotionId)
      .query(`
        SELECT clientId, firstName, registrationDate
        FROM dbo.promotion_participants
        WHERE promotionId = @promotionId
      `);
    return result.recordset;
  }
};


module.exports = { createPromotionTables };

