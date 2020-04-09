"use strict";
const{forEach,assign,isUndefined,isNull, map, merge} = require('lodash');
var async = require('async');
const { Observable,pipe } = require('rxjs');
const { inArray, isValid,hasitem } = require('../odaUtility').toinit();

const dataservices = (function () {
const odaSearchBy = function (model, option) {
    let getquery = model.findOne(option, {});
    return getquery;
  };
  const _index = function (model) {
    var getquery = model.find({},{});//, { limit: 2});
    return getquery;
  };
const index = function (odamodel, f, callback) {
  return  _index(odamodel).exec(
    function (err, datas) {
    if (err)
      throw err;
    const finalobj = f(datas);
    callback(null, finalobj);
  });
};

const indexapi= function (model, callback) {
  return _index(model).exec(callback);
};

const getodaindexapi$ = function (model) {
  return Observable.create(function (observer) {
    try {
      return indexapi(model, function (err, data) {
        if (err) {
          observer.next(err);
        } else {
          observer.next(data);
          setTimeout(function () {
            observer.complete();
          }, 100);
        }
      });
    } catch (err) {
      observer.error(err);
    }
  });
};
const getodaindex$ = function (model, fn) {
  return Observable.create(function (observer) {
    try {
      return index(model, fn, function (err, data) {
        if (err) {
          observer.next(err);
        } else {
          observer.next(data);
          setTimeout(function () {
            observer.complete();
          }, 100);
        }
      });
    } catch (err) {
      observer.error(err);
    }
  });
};
const getodaByid$ = function (model, fn, requestparamid, fnobj) {
  return Observable.create(function (observer) {
    try {
      return index(model, fn, function (err, datas) {
        if (err) {
          observer.next(err);
        } else {
          const filteredObject = fnobj(datas, requestparamid).odaObject();
          observer.next(filteredObject);
          setTimeout(function () {
            observer.complete();
          }, 100);
        }
      });
    } catch (err) {
      observer.error(err);
    }
  });
};
const getodaApiByid$ = function (model, requestparamid, fnobj) {
  return Observable.create(function (observer) {
    try {
      return indexapi(model,function (err, datas) {
        if (err) {
          observer.next(err);
        } else {
          const filteredObject = fnobj(datas, requestparamid).odaObject();
          observer.next(filteredObject);
          setTimeout(function () {
            observer.complete();
          }, 100);
        }
      });
    } catch (err) {
      observer.error(err);
    }
  });
};
const getodasharedByid$ = function (arr,requestparamid, fnobj) {
  return Observable.create(function (observer) {
    try {
          const filteredObject = fnobj(arr, requestparamid).odaObject();
          observer.next(filteredObject);
          setTimeout(function () {
            observer.complete();
          }, 100);
    } catch (err) {
      observer.error(err);
    }
  });
};

const toOdaCreate$ = function (model, requestBody, toinitobj, fn) {
  return Observable.create(function (observer) {
    try {
      const _toCreatedata = fn(model, requestBody, toinitobj);
      observer.next(_toCreatedata);
      setTimeout(() => {
        observer.complete();
      }, 100);
    } catch (err) {
      observer.error(err);
    }
  });

};
//model,vmodel,body
const toapiOdaCreate$ = function (model, vmodel,requestBody, toinitP, toinitC, fn) {
  return Observable.create(function (observer) {
    try {
      const _toCreatedata = fn(model, vmodel,requestBody, toinitP, toinitC);
      observer.next(_toCreatedata);
      setTimeout(() => {
        observer.complete();
      }, 100);
    } catch (err) {
      observer.error(err);
    }
  });

};
const toOdaUpdate$ = function (requestBody, toupdobj, fn) {
  return Observable.create(function (observer) {
   // const _toupdatedata = fn(requestBody, objupd);
    try {
        const  _toupdatedata = fn(requestBody, toupdobj);
      observer.next(_toupdatedata);
      setTimeout(() => {
        observer.complete();
      }, 100);
   } catch (err) {
      observer.error(err);
    }
  });
};

  const toapiOdaChildCreate$ = function (model, requestBody,requestparamid, toinitP,fn) {
    let _toCreatedata;
    return Observable.create(function (observer) {
    //  const _toCreatedata = fn(model,requestBody,requestparamid, toinitP);
      try {
        if(isValid(requestparamid)===true){
          _toCreatedata = fn(model,requestBody,requestparamid, toinitP);
        } else {
          _toCreatedata = fn(model,requestBody, toinitP);
        }
        observer.next(_toCreatedata);
        setTimeout(() => {
          observer.complete();
        }, 100);
      } catch (err) {
        observer.error(err);
      }
    });
  };

  const toOdaChildUpdate$ = function (requestBody, requestparamid, objupd, fn) {
    return Observable.create(function (observer) {
      const _toupdatedata = fn(requestBody, requestparamid,objupd);
      try {
        observer.next(_toupdatedata);
        setTimeout(() => {
          observer.complete();
        }, 100);
      } catch (err) {
        observer.error(err);
      }
    });
  };

  function toinit() {
    return {
      getodaindex$:getodaindex$,
      odaindex:index,
      getodaByid$:getodaByid$,
      odaSearchBy:odaSearchBy,
      toOdaUpdate$:toOdaUpdate$,
      toOdaCreate$:toOdaCreate$,
      getodasharedByid$:getodasharedByid$,
      toapiOdaCreate$:toapiOdaCreate$,
      toapiOdaChildCreate$:toapiOdaChildCreate$,
      toOdaChildUpdate$:toOdaChildUpdate$,
      getodaindexapi$:getodaindexapi$,
      getodaApiByid$:getodaApiByid$
    };
  }
  return {
    toinit: toinit
  };
})();
module.exports = {
  toinit: dataservices.toinit
};
