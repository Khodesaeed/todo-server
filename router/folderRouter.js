const express = require('express');
const folderRoute = express.Router();
const folderController = require('../controllers/folderController');
const { authorize, isAdmin } = require('../middleware/middleware');

folderRoute.get('/', authorize, folderController.showFolder);
folderRoute.get('/:uuid', authorize, folderController.indexFolders);
folderRoute.post('/', authorize, folderController.createFolder);
folderRoute.put('/:uuid', authorize, isAdmin, folderController.updateFolders);
folderRoute.delete('/:uuid', authorize, isAdmin, folderController.deleteFolder);

module.exports = folderRoute;