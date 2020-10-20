const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../models/User');
const Poem = require('../models/Poem');

const connection = new Sequelize(dbConfig);

User.init(connection);
Poem.init(connection);

User.associate(connection.models);
Poem.associate(connection.models);

module.exports = connection;