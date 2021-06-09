const jwt = require('jsonwebtoken');
const tokenSecret = process.env.TOKEN_SECRET;

async function authorize(req, res, next) {
    if (!req.headers.authorization) return res.send('You need to login.')
    const token = req.headers.authorization.split(' ')[1];
    if (!token) return res.status(401).send('Invalid token.');
    try {
        const userData = await jwt.verify(token, tokenSecret);
        console.log(userData);
        return next();
    } catch (err) {
        return res.status(403).send('Invalid token');
    }
}

function hasRole(role){
    return (req,res,next) => {
        if (req.user.role === role) {
            next();
        }
    }
}

module.exports = {
    authorize
};