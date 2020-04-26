"use strict";
const { forEach,merge} = require('lodash');
const {hasitem, inArray, isValid} = require('../odaUtility').toinit();
const {toapiUpdateChildInstance,toapiUpdateInstance}=require('../odainstance/toOdaInstance').toinit();
const {odaupdate$, odaLoadupdate$, SearchByid}=require('../odarepository/odarepository').toinit();
const { Observable } = require('rxjs');
const toUpdateInstance = (function () {
  function toupdateBuild(requestBody, fn) {
    let arrArg = [];
    if (inArray(requestBody) === true) {
      const _getdata = toapiUpdateInstance(requestBody, fn);
      arrArg = _getdata.slice();
      return arrArg;
    } else if (inArray(requestBody) === false) {
      const _getdata = toapiUpdateInstance(requestBody, fn);
      if ((!hasitem(_getdata, arrArg)))
        arrArg.push(_getdata);
      arrArg = arrArg.slice();
      return arrArg;

    } else {
      return new Error(
  ` missing some arguments`);
    }
  }

      const toUpdateInstance = function (body, f) {
        const data = toupdateBuild(body, f);
        return data;
      };

    const toOdaUpdate$ = function (requestBody, toupdobj, fn) {
        return Observable.create(function (observer) {
            // const _toupdatedata = fn(requestBody, objupd);
            try {
                const _toupdatedata = fn(requestBody, toupdobj);
                observer.next(_toupdatedata);
                setTimeout(() => {
                    observer.complete();
                }, 100);
            } catch (err) {
                observer.error(err);
            }
        });
    };

    const toOdaUpdate = function (requestBody, toupdobj, fn) {
          // const _toupdatedata = fn(requestBody, objupd);
          try {
              const _toupdatedata = fn(requestBody, toupdobj);
              return _toupdatedata;

          } catch (err) {
            return new Error(err);
          }

  };
  const toUpdateCustomInstance = function (requestBody, fn) {
    return fn(requestBody,toapiUpdateInstance);
  };

  const svctoUpdateCustomInstance= function(requestBody, toupdobj, fn){
    return toOdaUpdate(requestBody, toupdobj, fn);
    };
    const svctoUpdateInstance$ = function (requestBody, toupdobj) {
      return toOdaUpdate$(requestBody,  toupdobj, toUpdateInstance);
  };
/*
    const toOdaUpdateChild$ = function (requestBody, requestparamid,  toupdobj, fn) {
      return Observable.create(function (observer) {
          // const _toupdatedata = fn(requestBody, objupd);
          try {
              const _toupdatedata = fn(requestBody, requestparamid,  toupdobj, fn);
              observer.next(_toupdatedata);
              setTimeout(() => {
                  observer.complete();
              }, 100);
          } catch (err) {
              observer.error(err);
          }
      });
  };

  function toupdateChildBuild(requestBody, requestparamid, fn){
    let arrArg = [];
    const _getdata = toapiUpdateChildInstance(requestBody, requestparamid, fn);
    if ((!hasitem(_getdata, arrArg))) {
      arrArg.push(_getdata);
       return arrArg.slice();
    }   else {
      return new Error(
        ` missing some arguments`);
      }
  }

   const  toUpdateChildInstance  = function (requestBody, requestparamid, fn) {
    const data = toupdateChildBuild(requestBody, requestparamid, fn);
    return data;
  };

    const svctoUpdateChildInstance$ = function (requestBody, requestparamid, toupdobj) {
      return toOdaUpdateChild$(requestBody, requestparamid, toupdobj, toUpdateChildInstance);
  };
  */
   const odaApiupdateObj$ = function (model, body, reqparmid) {
    let _arr = [], result={};
    return Observable.create(function (observer) {
      try {
        if (isValid(body) === true) {
            SearchByid(model,reqparmid)
            .exec(function (err, data) {
              if (err) {
                return observer.next(err);
              } else {
                if(isValid(body)===true) {
                  result=merge(data,body);
                  result.save(function (err) {
                    if (err) {
                      observer.next(err);
                    }
                  });
                }
              }
            });
            _arr.push(body);
        }
        observer.next((`Finished  in updating ${_arr.length} records`));
        setTimeout(() => {
          observer.complete();
        }, 100);

      } catch (err) {
        observer.error(err);
      }
    });
  };
  const odaApiupdateArray$ = function (model, ArgOne,reqparmid) {
    let _arr = [],
    result = {};
    return Observable.create(function (observer) {
      try {
          forEach(ArgOne, function (elm) {
            SearchByid(model, reqparmid)
            .exec(function (err, data) {
              if (err) {
                return observer.next(err);
              } else {
                  result = merge(data, elm);
                result.save(function (err) {
                  if (err) {
                    observer.next(err);
                  }
                });
              }
            });
            _arr.push(elm);
          });

        observer.next((`Finished  in updating ${_arr.length} out of ${ArgOne.length} records`));

        setTimeout(() => {
          observer.complete();
        }, 100);

      } catch (err) {
        observer.error(err);
      }

    });
  };


  const odapiupdate$=function(model, ArgOne,reqparmid) {
    if(inArray(ArgOne)===true){
      return odaApiupdateArray$(model, ArgOne,reqparmid);
    } else if (inArray(ArgOne)===false){
      return odaApiupdateObj$(model, ArgOne,reqparmid);
    }
    else {
      return;
    }

  } ;
  const svcapiupdate$=function(model, obj,reqparmid) {
    return odapiupdate$(model,obj,reqparmid);
  };
  const svcodaupdate$=function(model,option) {
    if( isValid(option.arrArg)===true && isValid(option.odaObjupd)===true){
      return odaLoadupdate$(model,option);
    }
    if( isValid(option.arrArg)===true && isValid(option.odaObjupd)===false){
      return odaupdate$(model,option);
    }
  };
    function toinit() {
        return {
      svctoUpdateInstance$: svctoUpdateInstance$,
        toUpdateInstance: toUpdateInstance,
     //   svctoUpdateChildInstance$:svctoUpdateChildInstance$,
    //    toUpdateChildInstance:toUpdateChildInstance,
        svcapiupdate$:svcapiupdate$,
        svcodaupdate$:svcodaupdate$,
        toUpdateCustomInstance:toUpdateCustomInstance,
        svctoUpdateCustomInstance:svctoUpdateCustomInstance

        };
      }

      return {
        toinit: toinit
      };

    })();
    module.exports = {
      toinit: toUpdateInstance.toinit
    };
