const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/auth');
const { authorize, isAdmin } = require('../middleware/middleware');

authRouter.post('/signup', authController.signup);
authRouter.post('/login', authController.login);
authRouter.put('/make_admin/:uuid', authorize, isAdmin, authController.makeAdmin);

module.exports = authRouter;