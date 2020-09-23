const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = {
    async decodeToken(t){
        const parts = t.split(' ');
        const [discard, token] = parts;

        const decoded = jwt.verify(token, authConfig.secret);

        return decoded;
    }
}