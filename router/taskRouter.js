const express = require('express');
const taskRouter = express.Router();
const taskController = require('../controllers/taskController');

taskRouter.get('/', taskController.showTasks);
taskRouter.get('/:uuid', taskController.indexTask);
taskRouter.post('/', taskController.createTask);
taskRouter.put('/:uuid', taskController.updateTask);
taskRouter.delete('/:uuid', taskController.deleteTask);

module.exports = taskRouter;