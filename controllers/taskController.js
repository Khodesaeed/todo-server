const { Task, Folder } = require('../models');

async function createTask(req, res) {
    try {
        const {
            folderUuid,
            title,
            description,
            start_at,
            finish_at
        } = req.body;
        const task = await Task.create({
            title,
            description,
            start_at,
            finish_at,
            folderUuid
        });
        return res.status(200).json(task)
    } catch (err) {
        console.log(err);
        return res.status(500).json(err)
    };
};

async function indexTask(req, res) {
    try {
        const taskUuid = req.params.uuid;
        const task = await Task.findOne({ where: { uuid: taskUuid }, include: 'taskFolder' });
        return res.status(200).json(task);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err)
    };
};
// TODO fix the query
async function showTasks(req, res) {
    try {
        const { username, role_name } = req.userData;
        const task = await Task.findAll({ include: 'taskFolder' }, { where: {} });
        return res.status(200).json(task);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err)
    };
};

async function updateTask(req, res) {
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

async function deleteTask(req, res) {
    try {
        const taskUuid = req.params.uuid;
        await Task.destroy({ where: { uuid: taskUuid } });
        return res.status(200).json({ "message": "user deleted" });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err)
    };
};

module.exports = {
    createTask,
    indexTask,
    showTasks,
    updateTask,
    deleteTask
}