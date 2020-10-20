const { Model, DataTypes } = require('sequelize');

class User extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.TEXT,
            password_reset_token: DataTypes.STRING,
            password_reset_expires: DataTypes.DATE,
        }, { sequelize })
        
    };
    static associate(models){
        this.hasMany(models.Poem, {foreignKey: 'user_id', as: 'poem'})
    }
};

module.exports = User;