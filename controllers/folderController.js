const { Folder, User } = require('../models');

async function createFolder(req, res) {
    try {
        const { username, role_name, userUuid } = req.userData;
        const name = req.body.name;
        const user = await User.findOne({ where: { username } });
        const folder = await Folder.create({ name, userUuid }, { include: 'folderUser' });
        return res.status(200).json(folder);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err)
    };
};
// TODO check the uuid of the bearer token with the folder token
async function indexFolders(req, res) {
    try {
        const folderUuid = req.params.uuid;
        const folder = await Folder.findOne({ where: { uuid: folderUuid }, include: 'folderUser' });
        return res.status(200).json(folder);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err)
    };
};
// TODO check the folders userUuid column with the uuid in the bearer token
async function showFolder(req, res) {
    try {
        const { username, role_name, userUuid } = req.userData;
        const folder = await Folder.findAll({ include: 'folderUser' }, { where: { username } });
        return res.status(200).json(folder);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err)
    };
};
// TODO Check the bearer uuid with the folder userUuid column.
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
// TODO Check the bearer uuid with the folder userUuid column.
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