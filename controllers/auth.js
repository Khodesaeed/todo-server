const {
    User
} = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const tokenSecret = process.env.TOKEN_SECRET;

function genToken(userData) {
    const {
        username,
        roleName,
        userUuid
    } = userData;
    return jwt.sign({
        username,
        roleName,
        userUuid
    }, tokenSecret, {
        expiresIn: '1h'
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
            roleName: findUser.roleName,
            username: findUser.username,
            userUuid: findUser.uuid
        };
    } catch (err) {
        throw err
    }
};

async function signup(req, res) {
    try {
        const {
            username,
            password
        } = req.body;
        const isUserExist = await User.findOne({ where: { username } });
        if (isUserExist) throw new Error('username has taken!');
        const saltRounds = await bcrypt.genSalt();
        const hash = await bcrypt.hash(password, saltRounds);
        try {
            const user = await User.create({
                username,
                password: hash,
                roleName: 'user'
            });
            res.send(user)
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message);
    }
};

async function login(req, res) {
    try {
        const userData = await authenticate(req.body);
        const token = genToken(userData);
        res.status(200).json({
            token,
            uuid: userData.userUuid
        })
    } catch (error) {
        res.status(500).send(error.message);
    };
};

async function makeAdmin(req, res) {
    try {
        const userUuid = req.params.uuid;
        const user = await User.findOne({ where: { uuid: userUuid } });
        user.roleName = 'admin';
        await user.save()
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