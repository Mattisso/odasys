"use strict";
const { isValid, hasitem, inArray} = require('../odaUtility').toinit();
const { toapicreateinstance,toapiUpdateInstance} = require('./toOdaInstance').toinit();

//var async = require('async')
const toInitializeInstance = (function () {
  function tocreateBuild(model, requestBody, fn) {
    let DetailCount = 0,
    arrArg = [];
    if (inArray(requestBody) === true) {
      const _getdata = toapicreateinstance(model, requestBody, fn);
      return {
        DetailCount: _getdata.length,
        arrArg: _getdata.slice()
      };
    }
    else  if (inArray(requestBody) === false) {
      const _getdata = toapicreateinstance(model, requestBody, fn);
      if ((!hasitem(_getdata, arrArg)))
        arrArg.push(_getdata);
        if (isValid(arrArg.length) === true) {
          DetailCount = arrArg.length;
        }
      return {
        DetailCount: DetailCount,
        arrArg: arrArg.slice()
      };
    }
    
  }
 
  const toInitializeInstance = function (model, body, f) {
    const data = tocreateBuild(model, body, f);
    return data;
  };

 

  function toinit() {
    return {
      toInitializeInstance: toInitializeInstance

    };
  }
  return {
    toinit: toinit
  };

})();
module.exports = {
  toinit: toInitializeInstance.toinit
};
