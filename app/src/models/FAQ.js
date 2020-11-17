const { Model, DataTypes } = require('sequelize');

class Faq extends Model {
    static init(sequelize) {
        super.init({
            user_id: DataTypes.INTEGER,
            text: DataTypes.TEXT
        }, { sequelize, modelName: 'Faq' })
    }
};

module.exports = Faq;