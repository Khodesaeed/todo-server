const jwt = require('jsonwebtoken');
const tokenSecret = process.env.TOKEN_SECRET;

async function authorize(req, res, next) {
    if (!req.headers.authorization) return res.send('You need to login.')
    const token = req.headers.authorization.split(' ')[1];
    if (!token) return res.status(401).send('Invalid token.');
    try {
        const userData = await jwt.verify(token, tokenSecret);
        req.userData = userData;
        return next();
    } catch (err) {
        return res.status(403).send('Invalid token');
    }
};

function hasRole(role) {
    return (req, res, next) => {
        if (req.user.role === role) {
            next();
        }
    }
};

function isAdmin(req, res, next) {
    const { roleName, username } = req.userData;
    if (roleName !== 'admin') return res.status(403).send('Permission denied');
    return next();
};


module.exports = {
    authorize,
    isAdmin
};