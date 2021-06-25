const { User } = require('../models');

async function createUser(req, res) {
    try {
        const user = await User.create(req.body);
        return res.send(user);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err)
    };
};

async function indexUser(req, res) {
    try {
        const userId = req.params.uuid;
        const user = await User.findOne({ where: { uuid: userId } });
        return res.status(200).json(user)
    } catch (err) {
        console.log(err);
        return res.status(500).json(err)
    };
};

async function showUsers(req, res) {
    try {
        const users = await User.findAll();
        return res.status(200).json(users)
    } catch (err) {
        console.log(err);
        return res.status(500).json(err)
    };
};

async function updateUser(req, res) {
    try {
        const userUuid = req.params.uuid;

        const user = await User.update(req.body, {
            where: {
                uuid: userUuid
            }
        });
        return res.status(200).json(user);

    } catch (err) {
        console.log(err);
        return res.status(500).json(err)
    };
};

async function deleteUser(req, res) {
    try {
        const userId = req.params.uuid;
        await User.destroy({ where: { uuid: userId } });
        return res.status(200).json({ message: 'user deleted' })
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    };
}

module.exports = {
    createUser,
    indexUser,
    showUsers,
    updateUser,
    deleteUser
}