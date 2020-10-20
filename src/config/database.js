module.exports = {
    dialect: process.env.NODE_DB_DIALECT,
    host: process.env.NODE_DB_HOST,
    username: process.env.NODE_DB_USERNAME,
    password: process.env.NODE_DB_PASSWORD,
    database: process.env.NODE_DB_DATABASE,
    define: {
        timestamps: true,
        underscored: true
    }
}