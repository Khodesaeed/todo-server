const { User } = require('../models');


exports.insertUser = async function(req, res) {
    try {
        const user = await User.create(req.body);
        return res.send(user);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err)
    };
};

exports.getUser = async function(req, res) {
    try {
        const userId = req.params.uuid;
        const user = await User.findOne({ where: { uuid: userId } });
        return res.status(200).json(user)
    } catch (err) {
        console.log(err);
        return res.status(500).json(err)
    };
};

exports.getUsers = async function(req, res) {
    try {
        const users = await User.findAll();
        return res.status(200).json(users)
    } catch (err) {
        console.log(err);
        return res.status(500).json(err)
    };
};

exports.updateUser = async function(req, res) {
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

exports.deleteUser = async function(req, res) {
    try {
        const userId = req.params.uuid;
        await User.destroy({ where: { uuid: userId } });
        return res.status(200).json({ message: 'user deleted' })
    } catch (err) {
        console.log(err);
        return res.status(500).json(err)
    };
}