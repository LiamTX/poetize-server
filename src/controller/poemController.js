const knex = require('../db/index');
const tokenConfig = require('../config/token');

module.exports = {
    async index(req, res) {
        try {
            const poems = await knex('poems');

            for (let i = 0; i < poems.length; i++) {
                let [user] = await knex('users').where('id', poems[i].user_id);

                poems[i].user_id = undefined;
                user.id = undefined;
                user.pass = undefined;
                poems[i].created_by = user;
            }

            return res.json(poems);
        } catch (error) {
            return res.json(error)
        }
    },
    async store(req, res) {
        try {
            const { title, poem } = req.body;
            const token = req.header('Authorization')
            const user_id = (await tokenConfig.decodeToken(token)).id;

            const insert = await knex('poems').insert({ title, poem, user_id });

            return res.json({ insert, msg: 'Você poetizou com sucesso!' });
        } catch (error) {
            return res.json(error)
        }
    },
    async delete(req, res) {
        const { id } = req.params;
        const token = req.header('Authorization');
        const decoded = (await tokenConfig.decodeToken(token)).decoded;

        const [poem] = await knex('poems').where('id', id);

        if (poem.user_id !== decoded.id) {
            return res.status(401).json('unauthorized');
        }

        const deleted = await knex('poems').where('id', id).del();

        return res.json(deleted);
    },
    async getPoemById(req, res) {
        const { id } = req.params;

        const [poem] = await knex('poems').where('id', id);

        return res.json(poem);
    },
    async getPoemByUserId(req, res) {
        const { id } = req.params;

        const poems = await knex('poems').where('user_id', id);

        return res.json(poems);
    },
    async like(req, res) {
        try {
            const { poem_id } = req.params;
            const token = req.header('Authorization');
            const user_id = (await tokenConfig.decodeToken(token)).id;

            const [qtdeLikes] = await knex('poems').select('likes').where('id', poem_id);

            await knex('poems')
                .where('id', poem_id)
                .update({ likes: qtdeLikes.likes + 1 });

            const like = await knex.insert({
                poem_Id: poem_id,
                user_id: user_id
            }).into('likes');

            return res.json(like)
        } catch (error) { return res.json({ erro: error }) }
    },
    async deslike(req, res) {
        try {
            const { poem_id } = req.params;
            const token = req.header('Authorization');
            const user_id = (await tokenConfig.decodeToken(token)).id;

            const [qtdeLikes] = await knex('poems').select('likes').where('id', poem_id);

            if (qtdeLikes.likes === 0) {
                return res.json();
            }

            await knex('poems')
                .where('id', poem_id)
                .update({ likes: qtdeLikes.likes - 1 });

            const deslike = await knex('likes')
                            .where('poem_Id', poem_id)
                            .andWhere('user_id', user_id)
                            .del();

            return res.json(deslike)
        } catch (error) { return res.json({ erro: error }) }
    },
    async likes(req, res){
        // try {
        //     // const token = req.header('Authorization');
        //     // const user_id = (await tokenConfig.decodeToken(token)).id;

        
        //     return res.json('likes');
        // } catch (error) { return res.json({ erro: error }) }

        const like = await knex('likes');

        return res.json(like);
    }
}