const { Model, DataTypes } = require('sequelize');

class faqs extends Model {
    static init(sequelize) {
        super.init({
            user_id: DataTypes.INTEGER,
            text: DataTypes.TEXT,
            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE
        }, { sequelize, modelName: 'Faq' })
    }
};

module.exports = faqs;