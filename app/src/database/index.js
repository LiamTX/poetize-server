const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../models/User');
const Poem = require('../models/Poem');
const Like = require('../models/Likes');
const Faq = require('../models/FAQ');

// const connection = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
//     host: dbConfig.host,
//     dialect: 'mysql'
// });

const connection = new Sequelize('bpx0x2htivtugqdrjoow', 'uriie3qgh5k7rdae', 'U6ssTaVtvvJmPUSFtI3H', {
    host: 'bpx0x2htivtugqdrjoow-mysql.services.clever-cloud.com',
    dialect: 'mysql',
    define: {
        freezeTableName: true,
        underscored: true
    }
});

User.init(connection);
Poem.init(connection);
Like.init(connection);
Faq.init(connection);

User.associate(connection.models);
Poem.associate(connection.models);

module.exports = connection;