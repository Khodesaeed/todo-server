const express = require('express');
const folderRoute = express.Router();
const folderController = require('../controllers/folderController');

folderRoute.get('/', folderController.showFolder);
folderRoute.get('/:uuid', folderController.indexFolders);
folderRoute.post('/', folderController.createFolder);
folderRoute.put('/:uuid', folderController.updateFolders);
folderRoute.delete('/:uuid', folderController.deleteFolder);

module.exports = folderRoute;