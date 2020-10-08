const knex = require('../db/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const tokenConfig = require('../config/token');
const authConfig = require('../config/auth.json');

function generateToken(params = {}) {
    return jwt.sign(params, process.env.SECRET, {
        expiresIn: 86400,
    });
};

module.exports = {
    async index(req, res) {
        try{
            const users = await knex('users');

            return res.json(users);
        }catch(error){return res.json(error)}
    },
    async store(req, res) {
        try {
            const { name, email, password } = req.body;

            var pass = await bcrypt.hash(password, 10);

            await knex('users').insert({ name, email, pass })
                .then(_ => res.json('Cadastro efetuado!'));
        } catch (error) {
            return res.json(error).status(400);
        }
    },
    async auth(req, res) {
        const { email, password } = req.body;

        const [user] = await knex('users').where('email', email);

        if (!user) {
            return res.json({ error: 'O usuario não foi encontrado', status: 404 });
        }

        if (!await bcrypt.compare(password, user.pass)) {
            return res.json({ error: 'Algo errado com as informações inseridas!', status: 401 });
        }

        //user.id = undefined;
        user.pass = undefined;

        return res.json({ status: 200, user, token: generateToken({ id: user.id }) });
    },
    async getUser(req, res) {
        try {
            const token = req.header('Authorization');
            const user_id = (await tokenConfig.decodeToken(token)).id;

            const [user] = await knex('users').where('id', user_id);

            return res.json(user);
        } catch (error) {
            return res.json(error)
        }
    },
    async getMyPoems(req, res) {
        try {
            const token = req.header('Authorization');
            const user_id = (await tokenConfig.decodeToken(token)).id;

            const poems = await knex('poems').where('user_id', user_id);

            for (let i = 0; i < poems.length; i++) {
                let [user] = await knex('users').where('id', poems[i].user_id);

                user.id = undefined;
                user.pass = undefined;
                poems[i].created_by = user;
            }

            return res.json(poems);
        } catch (error) {

        }
    },
    async edit(req, res) {
        try{
            const token = req.header('Authorization');
            const user_id = (await tokenConfig.decodeToken(token)).id;

            const {name, email, password} = req.body;

            let query = "";

            const validate = () => {
                if(name == "" || name == undefined
                    || email == "" || email == undefined){
                        return false;
                }

                return true;
            };

            if(password != undefined){
                if(!validate()){
                    return res.json({error: 'E-mail ou senha não informados'});
                };

                query = await knex('users').where('id', user_id)
                .update({
                    name: name,
                    email: email,
                    pass: await bcrypt.hash(password, 10)
                });
            }else{
                if(!validate()){
                    return res.json({error: 'E-mail ou senha não informados'});
                };

                query = await knex('users').where('id', user_id)
                .update({
                    name: name,
                    email: email
                });
            };

            return res.json({query, res: "Atualizado!"})
        }catch(error){return res.json(error)}
    },
    async token(req, res){
        try{
            const token = req.header('Authorization');
            const user_id = (await tokenConfig.decodeToken(token)).id;

            return res.json(user_id);
        }catch(error){
            return res.json(error)
        }
    }
}