const knex = require('../db/index');

module.exports = {
    async index(req, res){
        const poems = await knex('poems');
        
        return res.json(poems);
    },
    async store(req, res){
        const {title, poem, user_id} = req.body;

        const insert = await knex('poems').insert({title, poem, user_id});

        return res.json(insert);
    }
}