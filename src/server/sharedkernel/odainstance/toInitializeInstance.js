"use strict";
const { isValid, hasitem, inArray} = require('../odaUtility').toinit();
const { toapicreateinstance,toapicreateChildinstance} = require('./toOdaInstance').toinit();
const { Observable,pipe } = require('rxjs');
//var async = require('async')
const toInitializeInstance = (function () {

  function tocreateBuild(model, requestBody, fn) {
    let DetailCount = 0,
    arrArg=[] ;
    if (inArray(requestBody) === true) {
      const _getdata = toapicreateinstance(model, requestBody, fn);
        arrArg =_getdata.slice();
         return arrArg;
     /*  return {
        DetailCount: _getdata.length,
        arrArg: _getdata.slice()
      }; */
    }
    else  if (inArray(requestBody) === false) {
      const _getdata = toapicreateinstance(model, requestBody, fn);
      if ((!hasitem(_getdata, arrArg)))
        arrArg.push(_getdata);
        arrArg =arrArg.slice();
        return arrArg;
      /*   if (isValid(arrArg.length) === true) {
          DetailCount = arrArg.length;
        }
      return {
        DetailCount: DetailCount,
        arrArg: arrArg.slice()
      }; */
    }

  } 

  function tocreateChildBuild(model, requestBody,requestparamid, fn) {
    let DetailCount = 0,
    arrArg = [];
    if (inArray(requestBody) === true) {
      const _getdata = toapicreateChildinstance(model, requestBody,requestparamid, fn);
      return {
        DetailCount: _getdata.length,
        arrArg: _getdata.slice()
      };
    }
    else  if (inArray(requestBody) === false) {
      const _getdata = toapicreateChildinstance(model, requestBody, requestparamid,fn);
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

  const toInitializeChildInstance = function (model, body,requestparamid, f) {
    const data = tocreateChildBuild(model, body, requestparamid,f);
    return data;
  };
  const toapiOdaCreate$ = function (model,requestBody, fn) {
    return Observable.create(function (observer) {
      try {
        const _toCreatedata = fn(model,requestBody);
        observer.next(_toCreatedata);
        setTimeout(() => {
          observer.complete();
        }, 100);
      } catch (err) {
        observer.error(err);
      }
    });
  
  };

  const toapiOdaChildCreate$ = function (model,requestBody,requestparamid, fn) {
    return Observable.create(function (observer) {
      try {
        const _toCreatedata = fn(model,requestBody,requestparamid);
        observer.next(_toCreatedata);
        setTimeout(() => {
          observer.complete();
        }, 100);
      } catch (err) {
        observer.error(err);
      }
    });  
  };
  const svctoInitializeInstance$ = function (model,requestBody,toinitobj) {
    return toapiOdaCreate$(model, requestBody,toinitobj,toInitializeInstance);
};

const toInitCustomInstance = function (model,requestBody, fn) {
  return fn(model, requestBody,toapicreateinstance)
};


const svctoInitCustomInstance$= function(model,requestBody,fn){
return toapiOdaCreate$(model, requestBody,fn);
}

const svctoInitializeChildInstance$ = function (model,requestBody,requestparamid) {
  return toapiOdaChildCreate$(model, requestBody, requestparamid,toInitializeChildInstance);
};

  function toinit() {
    return {
      svctoInitializeInstance$: svctoInitializeInstance$,
      toInitializeInstance:toInitializeInstance,
      svctoInitializeChildInstance$:svctoInitializeChildInstance$,
      toapicreateChildinstance:toInitializeChildInstance,
      toapicreateinstance:toapicreateinstance,
      svctoInitCustomInstance$:svctoInitCustomInstance$,
      toInitCustomInstance:toInitCustomInstance

    };
  }
  return {
    toinit: toinit
  };

})();
module.exports = {
  toinit: toInitializeInstance.toinit
};
