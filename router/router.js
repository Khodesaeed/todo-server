const express = require('express');
const router = express.Router();
const indexControllers = require('../controllers/indexController');
const userControllers = require('../controllers/userController');
const folderController = require('../controllers/folderController');
const taskController = require('../controllers/taskController');
const authController = require('../controllers/auth');

router.get('/api', indexControllers.indexHandler)


router.get('/api/user', userControllers.getUsers);
router.get('/api/user/:uuid', userControllers.getUser);
router.post('/api/user', userControllers.insertUser);
router.put('/api/user/:uuid', userControllers.updateUser);
router.delete('/api/user/:uuid', userControllers.deleteUser);

router.get('/api/folder', folderController.getFolder);
router.get('/api/folder/:uuid', folderController.getFolders);
router.post('/api/folder', folderController.insertFolder);
router.put('/api/folder/:uuid', folderController.updateFolders);
router.delete('/api/folder/:uuid', folderController.deleteFolder);

router.get('/api/task/', taskController.getTasks);
router.get('/api/task/:uuid', taskController.getTask);
router.post('/api/task/', taskController.insertTask);
router.put('/api/task/:uuid', taskController.updateTask);
router.delete('/api/task/:uuid', taskController.deleteTask);

router.post('/api/auth/signup', authController.signup);
router.post('/api/auth/login', authController.login)

module.exports = router;