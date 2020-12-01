const { Model, DataTypes } = require('sequelize');

class poems extends Model {
    static init(sequelize) {
        super.init({
            title: DataTypes.STRING,
            poem: DataTypes.TEXT,
        }, { sequelize })
    };
    static associate(models) {
        //O poema 
        this.belongsTo(models.users, { foreignKey: 'user_id', as: 'user' })
    }
};

module.exports = poems;