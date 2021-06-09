const { Folder, User } = require('../models');

async function createFolder(req, res) {
    try {
        const { user_uuid, name } = req.body;
        const user = await User.findOne({ where: { uuid: user_uuid } });
        const folder = await Folder.create({ name, user_id: user.id });
        return res.status(200).json(folder);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err)
    };
};

async function indexFolders(req, res) {
    try {
        const folderUuid = req.params.uuid;
        const folder = await Folder.findOne({ where: { uuid: folderUuid }, include: 'folder_user' });
        return res.status(200).json(folder);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err)
    };
};

async function showFolder(req, res) {
    try {
        const folder = await Folder.findAll({ include: 'folder_user' });
        return res.status(200).json(folder);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err)
    };
};
async function deleteFolder(req, res) {
    try {
        const folderUuid = req.params.uuid;
        await Folder.destroy({ where: { uuid: folderUuid } });
        return res.status(200).json({ "message": "user deleted" });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err)
    };
};

async function updateFolders(req, res) {
    try {
        const folderUuid = req.params.uuid;
        const folder = await Folder.update(req.body, {
            where: {
                uuid: folderUuid
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