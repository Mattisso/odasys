
/* eslint-disable  no-console */
/*eslint-disable no-unused-vars */
'use strict';

let express = require('express');
// let router = express.Router();
// let upload = require('../../server/config/multer.config.js');
let fileWorker = require('../../server/fileUploader/file-controller');


// var url = require('url');
let fileUploadRouter = express.Router();

fileUploadRouter.post('/file/upload', function (req, res, next) {
// fileWorker.cleanUpFolder(req, res, next);
  fileWorker.uploadFile(req,res, next);
});
fileUploadRouter.get('/file/all', function (req, res, next) {

  fileWorker.listUrlFiles(function (err, result) {
    if (err) {
      return next(err);

    }
    if (res != null) {
      res.json(req.result = result);
    }
  });
});

fileUploadRouter.get('/file/:filename', function (req, res, next) {
});


module.exports = fileUploadRouter;
