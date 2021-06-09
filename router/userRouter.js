const express = require('express');
const userRoute = express.Router();
const userControllers = require('../controllers/userController');
const { authorize } = require('../middleware/middleware');

userRoute.get('/', authorize, userControllers.showUsers);
userRoute.get('/:uuid', userControllers.indexUser);
userRoute.post('/', userControllers.createUser);
userRoute.put('/:uuid', userControllers.updateUser);
userRoute.delete('/:uuid', userControllers.deleteUser);

module.exports = userRoute;