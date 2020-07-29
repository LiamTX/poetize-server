const knex = require('../db/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth.json');

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
};

module.exports = {
    async index(req, res){
        const users = await knex('users');
        
        return res.json(users);
    },
    async store(req, res){
        try{
            const {name, email, password} = req.body;

            var pass = await bcrypt.hash(password, 10);

            const user = await knex('users').insert({name, email, pass});

            return res.json({user, token: generateToken({id: user.id})});
        }catch(error){
            return res.json(error);
        }
    },
    async auth(req, res){
        const {email, password} = req.body;

        const [user] = await knex('users').where('email', email);

        if(!user){
            return res.status(404).json({error: 'User not found'});
        }

        if(!await bcrypt.compare(password, user.pass)){
            return res.status(401).json({error: 'Algo errado com as informações inseridas!'});
        }

        user.pass = undefined;

        return res.json({user, token: generateToken({id: user.id})});
    }
}