"use strict";
const mongoose = require('mongoose'),
Schema = mongoose.Schema;
const {getauditentity,gettoObject, extendSchema, auditEntityPlugin} = require('../helpers/odabaseSchema').toinit();
const {olevelClass, modelObject}=require('../modelClass/olevelClass').toinit();

const olevel = (function () {
  const auditBaseSchema = new Schema(getauditentity, gettoObject);
  const olevelSchema = extendSchema(auditBaseSchema, modelObject);

  olevelSchema.loadClass(olevelClass);
  olevelSchema.plugin(auditEntityPlugin);
 
  olevelSchema.index({
    olevelNum: 1
  });
  let DetailCount = 0,
  arrArg = [];
  olevelSchema.static('BuildnttBalanceinput', function (body) {
    arrArg.push(
    {
      "olevelNum" : body.olevelNum,
      "olevelDescption": body.olevelDescption 
    });  
     
  DetailCount = arrArg.length;  
  return {  
  DetailCount: DetailCount,
  arrArg:arrArg.slice()  
  };
  })

  let Olevel = mongoose.model('Olevel', olevelSchema)
  function toinit() {
    return {
      Olevel: Olevel
    }
  };
  return {
    toinit: toinit
  };
})();
module.exports = {
  toinit: olevel.toinit
};