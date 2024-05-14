const { Sequelize } = require('sequelize');

const database = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite3'
});
giot
module.exports = database