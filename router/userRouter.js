const express = require('express');
const userRoute = express.Router();
const userControllers = require('../controllers/userController');
const { authorize, isAdmin } = require('../middleware/middleware');

userRoute.get('/', authorize, isAdmin, userControllers.showUsers);
userRoute.get('/:uuid', authorize, isAdmin, userControllers.indexUser);
userRoute.post('/', authorize, isAdmin, userControllers.createUser);
userRoute.put('/:uuid', authorize, isAdmin, userControllers.updateUser);
userRoute.delete('/:uuid', authorize, isAdmin, userControllers.deleteUser);

module.exports = userRoute;