const express = require('express');
const router = express.Router();
const indexControllers = require('../controllers/indexController');
const userControllers = require('../controllers/userController');
const folderController = require('../controllers/folderController');
const taskController = require('../controllers/taskController');
const authController = require('../controllers/auth');

router.get('/api', indexControllers.indexHandler)


router.get('/api/user', userControllers.showUsers);
router.get('/api/user/:uuid', userControllers.indexUser);
router.post('/api/user', userControllers.createUser);
router.put('/api/user/:uuid', userControllers.updateUser);
router.delete('/api/user/:uuid', userControllers.deleteUser);

router.get('/api/folder', folderController.showFolder);
router.get('/api/folder/:uuid', folderController.indexFolders);
router.post('/api/folder', folderController.createFolder);
router.put('/api/folder/:uuid', folderController.updateFolders);
router.delete('/api/folder/:uuid', folderController.deleteFolder);

router.get('/api/task/', taskController.showTasks);
router.get('/api/task/:uuid', taskController.indexTask);
router.post('/api/task/', taskController.createTask);
router.put('/api/task/:uuid', taskController.updateTask);
router.delete('/api/task/:uuid', taskController.deleteTask);

router.post('/api/auth/signup', authController.signup);
router.post('/api/auth/login', authController.login);
router.put('/api/auth/make_admin/:uuid', authController.makeAdmin);

module.exports = router;