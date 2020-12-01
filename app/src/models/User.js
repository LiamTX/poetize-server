const { Model, DataTypes } = require('sequelize');

class users extends Model {
    static init(sequelize) {
        super.init({
            avatar: DataTypes.TEXT,
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.TEXT,
            confirmed: DataTypes.BOOLEAN,
            password_reset_token: DataTypes.STRING,
            password_reset_expires: DataTypes.DATE,
        }, { sequelize })

    };
    static associate(models) {
        this.hasMany(models.Poem, { foreignKey: 'user_id', as: 'poem' })
    }
};

module.exports = users;