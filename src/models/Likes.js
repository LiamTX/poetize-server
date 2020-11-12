const { Model, DataTypes } = require('sequelize');

class Like extends Model {
    static init(sequelize) {
        super.init({
            user_id: DataTypes.INTEGER,
            poem_id: DataTypes.INTEGER
        }, { sequelize, modelName: 'Like' })
    }
};

module.exports = Like;