const sql = require('mssql');
require('dotenv').config();

const poolPromise = sql.connect({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_HOST,
  database: process.env.DB_NAME,
  options: {
    encrypt: true,
    trustServerCertificate: true
  }
}).then(pool => {
  console.log('Conectado ao banco de dados SQL Server');
  return pool;
}).catch(err => {
  console.error('Erro ao conectar ao banco de dados', err);
});

module.exports = poolPromise;
