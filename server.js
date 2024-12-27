require('dotenv').config();
const express = require('express');
const cors = require('cors');
const messageRoutes = require('./routes/messages');
const rankingRoutes = require('./routes/ranking');
const promoRoutes = require('./routes/promo');
const poolPromise = require('./config/database');

const app = express();

const allowedOrigins = ['https://casadeapostas.com', 'http://localhost'];

app.use(cors({
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Acesso negado'));
    }
  }
}));

app.use(express.json());

poolPromise.then(() => {
  console.log('Conexão bem-sucedida com o banco de dados');
}).catch(err => {
  console.error('Erro ao conectar ao banco de dados', err);
});

app.use('/api/messages', messageRoutes);
app.use('/api/ranking', rankingRoutes);
//app.use('/api/promo', promoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
