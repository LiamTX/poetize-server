const jwt = require('jsonwebtoken');

module.exports = {
    generateToken(params = {}){
        return jwt.sign(params, process.env.NODE_TOKEN_SECRET, {
            expiresIn: 86400
        })
    },
    decodeToken(t){
        const parts = t.split(' ');
        const [discard, token] = parts;

        const decoded = jwt.verify(token, process.env.NODE_TOKEN_SECRET);

        return decoded;
    }
}