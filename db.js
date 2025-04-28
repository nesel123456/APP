const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

client.connect()
  .then(() => {
    console.log('Подключение к базе данных успешно');
  })
  .catch((err) => {
    console.error('Ошибка подключения: ', err.stack);
  });

module.exports = client;

