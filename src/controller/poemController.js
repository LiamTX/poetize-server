const knex = require('../db/index');
const tokenConfig = require('../config/token');
const { del } = require('../db/index');

module.exports = {
    async index(req, res){
        const poems = await knex('poems');

        return res.json(poems);
    },
    async store(req, res){
        const {title, poem, user_id} = req.body;

        const insert = await knex('poems').insert({title, poem, user_id});

        return res.json(insert);
    },
    async delete(req, res){
        const {id} = req.params;
        const token = req.header('Authorization');

        const decoded = (await tokenConfig.decodeToken(token)).decoded;

        const [poem] = await knex('poems').where('id', id);

        if(poem.user_id !== decoded.id){
            return res.status(401).json('unauthorized');
        }
        
        const deleted = await knex('poems').where('id', id).del();

        return res.json(deleted);
    }
}