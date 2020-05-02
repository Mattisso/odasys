
'use strict';
/* eslint-disable  no-console */
///*eslint-disable no-unused-vars */

const multer = require('multer');
var async = require('async');
const del = require('delete');
const path = require('path');
var fs = require('fs');
const destinationfolder = path.join(__dirname, '../../server/public/odaimportfolder');


let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, destinationfolder);
  },
  filename: function (req, file, cb) {
    if (!file.originalname.match(/\.(xls|xlsx|html|txt)$/)) {
      var err = new Error();
      err.code = 'filetype';
      return cb(err);

    } else {
      // To accept the file pass `true`, like so:
      const datetimestamp = Date.now();
      cb(null, datetimestamp + '-' + file.originalname)/*+ '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])*/;
      // cleanFolder (destinationfolder);


    }
  }
});

let upload = multer({
  storage: storage
  , limits: { fileSize: 10000000 }

}).single('file');

function cleanFolder(folderPath) {

  popular(folderPath, function (err) {
    if (err) {
      throw (err);
    }
    else {
      return;
    }
  });

}


module.exports.uploadFile = function (req, res, next) {
  cleanUpFolder();
  upload(req, res, function (err) {



    if (err) {
      //  return res.status(501).json({error:err});

      if (err.code === 'LIMIT_FILE_SIZE') {
        res.json({ success: false, message: 'File size is too large. Max limit is 10MB' });
      } else if (err.code === 'filetype') {
        res.json({ success: false, message: 'file type is invalid. Must be .xls|txt|html' });
      } else {

        res.json({ sucess: false, message: 'File was not able to be uploaded' });
      }
      next(err);
    }

    else {

      if (!req.file) {
        res.json({ success: false, message: "No file was selected" });
        return;
      } else {


        res.json({ success: true, message: 'File was uploaded!' });


      }

    }


  });
};

module.exports.listUrlFiles = function (req, res, apiUrl) {
  fs.readdir(destinationfolder, (err, files) => {
    for (let i = 0; i < files.length; ++i) {
      files[i] = apiUrl + files[i];
    }

    res.send(files);
  });
};

module.exports.cleanFolder = function (folderPath) {
  popular(folderPath, function (err) {
    if (err) {
      throw (err);
    }
    else {
      return;
    }
  });

};


module.exports.downloadFile = function (req, res) {
  let filename = req.params.filename;
  res.download(destinationfolder + filename);
};


function cleanUpFolder () {
  async.series([

    function (callback) {

      popular(destinationfolder, function (err) {
        if (err) {
          throw (err);
        }
        else {
          return;
        }
      });
      callback(null, 'Directory cleaned-up Successfully!');
    },

    function (callback) {

      setTimeout(function () {
        callback(null, 'delay!');
    }, 200);

    }

  ],
    // optional callback
    function (err, results) {
      if (err) {
        console.log("Errors = ");
        throw (err);
      } else {
      //  console.log("Results = ");
        console.log(null, results);
      }
    });
}



function popular(folderPath, callback) {
  async.waterfall([

    function (callback) {
      var parsedDirectory = [];

      fs.readdir(folderPath, function (err, files) {
        if (err) {
          throw err;
        }
        else {
          files.forEach(function (file) {
            var inFilename = folderPath + '\\' + file;

            fs.stat(inFilename, function (err, stats) {
              if (err || stats.isFile() === false) {
                return callback(err);
              }
              else {

                parsedDirectory.push(file);
              }
            });


          });
          setTimeout(function () {
            callback(null, parsedDirectory);
          }, 100);

        }

      });


    },
    function (getFile, callback) {
      var _arr = [];
      _arr = getFile;
      _arr.forEach(function (file) {
        const inFilename = folderPath + '\\' + file;
        fs.access(inFilename, function (err) {
          if (err) {
            return callback(err);

          }
          else if (_arr.length === 0) {
            return callback(null, `the file Directory is already empty!`);
          }
          else {

            fs.unlinkSync(inFilename, function (error) {
              if (error) {
                return callback(error);
              }
              else {
                if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath);

              }

            });


          }
        });
      });

      setTimeout(function () {
        callback(null, `files deleted successfully!`);
      }, 100);


    }

  ]
    , function (err, results) {


      if (err) {

        console.dir(err);
      } else {

        callback(null, results);
      }

    });
}
