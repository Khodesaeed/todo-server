const { Task, Folder } = require('../models');

exports.insertTask = async function(req, res) {
    try {
        const {
            folderUuid,
            title,
            description,
            start_at,
            finish_at
        } = req.body;
        const folder = await Folder.findOne({ where: { uuid: folderUuid } });
        const task = await Task.create({
            title,
            description,
            start_at,
            finish_at,
            folder_id: folder.id
        });
        return res.status(200).json(task)
    } catch (err) {
        console.log(err);
        return res.status(500).json(err)
    };
};

exports.getTask = async function(req, res) {
    try {
        const taskUuid = req.params.uuid;
        const task = await Task.findOne({ where: { uuid: taskUuid }, include: 'task_folder' });
        return res.status(200).json(task);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err)
    };
};

exports.getTasks = async function(req, res) {
    try {
        const task = await Task.findAll({ include: 'task_folder' });
        return res.status(200).json(task);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err)
    };
};

exports.updateTask = async function(req, res) {
    try {
        const taskUuid = req.params.uuid;
        const task = await Task.update(req.body, {
            where: {
                uuid: taskUuid
            }
        });
        return res.status(200).json(task);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err)
    };
};

exports.deleteTask = async function(req, res) {
    try {
        const taskUuid = req.params.uuid;
        await Task.destroy({ where: { uuid: taskUuid } });
        return res.status(200).json({ "message": "user deleted" });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err)
    };
};