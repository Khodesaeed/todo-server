const {
    User
} = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const tokenSecret = process.env.TOKEN_SECRET;

function genToken(userData) {
    const {
        username,
        role_name
    } = userData;
    return jwt.sign({
        username,
        role_name
    }, tokenSecret, {
        expiresIn: '15m'
    });
};


async function authenticate(user) {
    try {
        const {
            username,
            password
        } = user;
        const findUser = await User.findOne({
            where: {
                username
            }
        });
        if (findUser == null) throw new Error('user not found');
        if (!await bcrypt.compare(password, findUser.password)) throw new Error(('Invalid password'));
        return {
            role_name: findUser.role_name,
            username: findUser.username
        };
    } catch (err) {
        return err
    }
};

async function signup(req, res) {
    try {
        const {
            username,
            password,
            role_name
        } = req.body;
        const saltRounds = await bcrypt.genSalt();
        const hash = await bcrypt.hash(password, saltRounds);
        try {
            const user = await User.create({
                username,
                password: hash,
                role_name
            });
            res.send(user)
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    } catch (hasherr) {
        res.status(500).json({
            error_message: 'somthing went wrong in signup process!'
        });
    }
};

async function login(req, res) {
    try {
        const userData = await authenticate(req.body);
        //TODO create role model and check the token in each API endpoint
        const token = genToken(userData);
        res.status(200).json({
            token
        })
    } catch (error) {
        res.status(500).json(error);
    };
};

async function makeAdmin(req, res) {
    try {
        const userUuid = req.params.uuid
        const user = await User.update({
            where: {
                uuid: userUuid
            }
        });
        res.send(user);
    } catch (err) {
        res.status(500).json(err);
    };
};

module.exports = {
    login,
    signup,
    makeAdmin
};