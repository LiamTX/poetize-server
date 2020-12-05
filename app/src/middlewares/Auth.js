const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
    const header = req.header('Authorization');

    if (!header) {
        return res.status(401).json({ error: 'unauthorized' });
    };

    const parts = header.split(' ');

    if (!parts.length === 2) {
        return res.status(401).json({ error: 'unauthorized' });
    };

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).json({ error: 'unauthorized' });
    };

    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
        if (err) return res.status(401).json({ error: 'unauthorized' });

        const user = await User.findOne({ where: { email: decoded.email } });
        if (!user) return res.status(401).json({ error: 'unauthorized' });

        req.userEmail = decoded.email;
        return next();
    });
}