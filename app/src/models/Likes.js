const { Model, DataTypes } = require('sequelize');

class likes extends Model {
    static init(sequelize) {
        super.init({
            user_id: DataTypes.INTEGER,
            poem_id: DataTypes.INTEGER,
        }, { sequelize })
    }
};

module.exports = likes;