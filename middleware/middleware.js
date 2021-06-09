const jwt = require('jsonwebtoken');
const tokenSecret = process.env.TOKEN_SECRET;

async function authorize(req, res, next) {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) res.status(401).send('Unauthorize.');
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