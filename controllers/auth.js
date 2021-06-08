require('dotenv').config();
const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const accessToken = process.env.TOKEN_SECRET;

const genToken = function(user) {
    return jwt.sign({ data: user }, accessToken, { expiresIn: '15m' });
}

const authenticate = async function(user) {
    try {
        const { username, password } = user;
        const findUser = await User.findOne({ where: { username } });
        if (findUser == null) throw new Error('user not found');
        try {
            if (await bcrypt.compare(password, findUser.password)) {
                return true;
            } else {
                return false;
            }
        } catch (inerr) {
            throw new Error(inerr)
        }
    } catch (err) {
        return err
    }
};

exports.signup = async function(req, res) {
    try {
        const { username, password } = req.body;
        const saltRounds = await bcrypt.genSalt();
        const hash = await bcrypt.hash(password, saltRounds);
        try {
            const user = await User.create({ username, password: hash });
            res.send(user)
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    } catch (hasherr) {
        res.status(500).json({ error_message: 'somthing went wrong in signup process!' });
    }
};

exports.login = async function(req, res) {
    try {
        const { username } = req.body;
        const auth = await authenticate(req.body);
        if (!auth) throw new Error('Password invalid');
        //TODO create role model and check the token in each API endpoint
        const token = genToken(username);
        res.status(200).json({ token })
    } catch (error) {
        res.status(500).json(error);
    };
};