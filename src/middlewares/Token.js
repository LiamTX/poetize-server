const jwt = require('jsonwebtoken');

module.exports = {
    generateToken(params = {}){
        return jwt.sign(params, 'secret', {
            expiresIn: 86400
        })
    },
    decodeToken(t){
        const parts = t.split(' ');
        const [discard, token] = parts;

        const decoded = jwt.verify(token, authConfig.secret);

        return decoded;
    }
}