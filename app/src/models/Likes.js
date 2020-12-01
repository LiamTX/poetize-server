const { Model, DataTypes } = require('sequelize');

class likes extends Model {
    static init(sequelize) {
        super.init({
            user_id: DataTypes.INTEGER,
            poem_id: DataTypes.INTEGER,
            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE
        }, { sequelize, modelName: 'Like' })
    }
};

module.exports = likes;