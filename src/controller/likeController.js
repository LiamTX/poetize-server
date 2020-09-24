const knex = require('../db/index');
const tokenConfig = require('../config/token');

module.exports = {
    async index(req, res) {
        const likes = await knex('likes');

        return res.json(likes)
    },
    async getByUser(req, res) {
        try {
            const token = req.header('Authorization');
            const user_id = (await tokenConfig.decodeToken(token)).id;

            const likes = await knex('likes')
                .where('user_id', user_id);

            return res.json(likes)
        } catch (error) { return res.json(error) }
    }
}