const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    const header = req.header('Authorization');

    if(!header){
        return res.status(401).json({error: 'unauthorized'});
    };

    const parts = header.split(' ');

    if(!parts.length === 2){
        return res.status(401).json({error: 'unauthorized'});
    };

    const [scheme, token] = parts;

    if(!/^Bearer$/i.test(scheme)){
        return res.status(401).json({error: 'unauthorized'});
    };

    await jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if(err) return res.status(401).json({error: 'unauthorized'});

        req.userEmail = decoded.email;
        return next();
    });
}