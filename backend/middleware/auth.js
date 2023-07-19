const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).send('Access Denied. No token provided');

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch (ex) {
        console.log(ex)
        res.status(400).send('Invalid Token.')
    }
}

module.exports = auth;