'use strict';

const IncomingForm = require('formidable').IncomingForm;


const  del = require('delete');
const path = require('path');
var fs = require('fs');

const destinationfolder = path.join(__dirname, '../public/odaimportfolder/');

function cleanFolder (folderPath) {
  // delete files inside folder but not the folder itself
  del.sync([`${folderPath}/**`, `!${folderPath}`]);

  if (!fs.existsSync(destinationfolder)) fs.mkdirSync(destinationfolder);
}

module.exports = function upload(req, res) {
  var form= new IncomingForm();
  form.encoding='utf-8';
  form.uploadDir = this.destinationfolder;
  form.keepExtensions = true;
  form.maxFileSize = 200 * 1024 * 1024;
  form.multiples = false;

  form.on('file', (field, file)=> {

  });

  form.on('end', ()=>{
    res.json();
  });

  form.parse(req);
};
