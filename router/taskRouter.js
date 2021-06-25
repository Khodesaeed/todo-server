const express = require('express');
const taskRouter = express.Router();
const taskController = require('../controllers/taskController');
const { authorize, isAdmin } = require('../middleware/middleware');

taskRouter.get('/', authorize, taskController.showTasks);
taskRouter.get('/:uuid', authorize, taskController.indexTask);
taskRouter.post('/', authorize, taskController.createTask);
taskRouter.put('/:uuid', authorize, isAdmin, taskController.updateTask);
taskRouter.delete('/:uuid', authorize, isAdmin, taskController.deleteTask);

module.exports = taskRouter;