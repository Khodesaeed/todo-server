const { Folder, User } = require('../models');

async function createFolder(req, res) {
    try {
        const { userUuid } = req.userData;
        const name = req.body.name;
        const folder = await Folder.create({ name, userUuid });
        return res.status(200).json(folder);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err)
    };
};

async function indexFolders(req, res) {
    try {
        const { userUuid } = req.userData;
        const folderUuid = req.params.uuid;
        const folder = await Folder.findOne({
            include: [{
                model: User,
                as: 'folderUser',
                attributes: ['username', 'uuid'],
                where: { uuid: userUuid }
            }],
            where: {
                uuid: folderUuid
            }
        })
        return res.status(200).json(folder);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err)
    };
};

async function showFolder(req, res) {
    try {
        const { userUuid } = req.userData;
        const folder = await Folder.findAll({
            include: [{
                model: User,
                as: 'folderUser',
                attributes: ['username', 'uuid'],
                where: {
                    uuid: userUuid
                }
            }]
        });
        return res.status(200).json(folder);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err)
    };
};

async function deleteFolder(req, res) {
    try {
        const { userUuid } = req.userData;
        const folderUuid = req.params.uuid;
        await Folder.destroy({
            where: {
                uuid: folderUuid,
                userUuid: userUuid
            }
        });
        return res.status(200).json({ "message": "user deleted" });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err)
    };
};

async function updateFolders(req, res) {
    try {
        const { userUuid } = req.userData;
        const folderUuid = req.params.uuid;
        const folder = await Folder.update(req.body, {
            where: {
                uuid: folderUuid,
                userUuid
            }
        });
        return res.status(200).json(folder);

    } catch (err) {
        console.log(err);
        return res.status(500).json(err)
    };
};

module.exports = {
    createFolder,
    indexFolders,
    showFolder,
    deleteFolder,
    updateFolders
}