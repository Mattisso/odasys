/* eslint-disable  no-console */
/*eslint-disable no-unused-vars */
'use strict';

const  del = require('delete');
const path = require('path');
var fs = require('fs');
const multer = require('multer');
const destinationfolder = path.join(__dirname, '../../server/public/odaimportfolder/');
var express = require('express');
// var url = require('url');
var fileUploadRouter = express.Router();

// var fileservice = require('../controllers/oda-upload');

let  storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, destinationfolder);
  },
  filename: function (req, file, cb) {
    if (!file.originalname.match(/\.(xls|xlsx|html|txt)$/)) {
      var err = new Error();
      err.code='filetype';
      return cb(err);

    } else {
    // To accept the file pass `true`, like so:
    const datetimestamp = Date.now();
    cb(null,  datetimestamp + '-' +file.originalname )/*+ '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])*/;
   }
  }
  /*fileFilter:fileFilter,
  filename: filename*/
});

let upload = multer({
  storage: storage
,limits: {fileSize: 10000000 }

}).single('ohafile');


 function cleanFolder (folderPath) {
  // delete files inside folder but not the folder itself
  del.sync([`${folderPath}/**`, `!${folderPath}`]);

  if (!fs.existsSync(destinationfolder)) fs.mkdirSync(destinationfolder);
}

// cleanFolder(destinationfolder);

fileUploadRouter.post('/upload', function (req, res, next) {

  upload(req,res,function(err){

        if(err){
      //  return res.status(501).json({error:err});

            if(err.code==='LIMIT_FILE_SIZE'){
                res.json({success: false, message: 'File size is too large. Max limit is 10MB'});
            } else if (err.code==='filetype'){
                res.json({success: false, message: 'file type is invalid. Must be .xls|txt|html'});
            } else{

                res.json({sucess: false, message: 'File was not able to be uploaded'});
            }
next(err);
        }

       else {

            if(!req.file){
                res.json({success:false, message: "No file was selected"});
                return;
            } else {


                res.json({success: true, message: 'File was uploaded!'});


            }

        }


    });
});

const filedestination= path.resolve(__dirname + "/index.html");

fileUploadRouter.get('/',function(req,res){
    res.sendFile(filedestination);
    });

module.exports = fileUploadRouter;
