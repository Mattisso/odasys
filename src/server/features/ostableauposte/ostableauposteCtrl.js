"use strict";
const _ = require('lodash');
const { getostableaupostes$,
  index,
  getByid$,
  insertostableauposte$,
  toCreateostableaupostedata$,
  toUpdateostableaupostedata$,
  editostableauposte$,
  odasearchBy,
  Deleteostableauposte$}=require('./ostableauposteRepository').toinit();
  const { result$ } = require('./ostableauposteSeed').toinit();
  const { concatMap } = require('rxjs/operators');
const ostableauposteCtrl = (function () {
  const index$ = function () {
    return getostableaupostes$;
  };
  const seedostableauposte$=function(){
    return result$;
    };

  const getbyid$ = function (id) {
    return getByid$(id);
  };

  const odasearchby = function (body) {
    return odasearchBy(body);
  };

  const getall = function (callback) {
    return index(callback);
  };

  const Insertostableauposte$ = function (body) {
    return toCreateostableaupostedata$(body).pipe(concatMap(function (x) {
      return insertostableauposte$(x);
    }));
  };

  const updateostableauposte$ = function (body, requestparamid) {
    return toUpdateostableaupostedata$(body).pipe(concatMap(function (x) {
      return editostableauposte$(x, requestparamid);
    }));
  };

  const deleteostableauposte$ = function (requestparamid) {
    return Deleteostableauposte$(requestparamid);
  };

  function toinit() {
    return {
      index$: index$(),
      getall: getall,
      getbyid$:getbyid$,
      insert$:Insertostableauposte$,
    // toCreateostableaupostedata$:toCreateostableaupostedata$,
    // toUpdateostableaupostedata$:toUpdateostableaupostedata$,
      update$:updateostableauposte$,
      odasearchby:odasearchby,
      delete$:deleteostableauposte$,
      seedostableauposte$ :seedostableauposte$()
    };
  }

return {
  toinit: toinit
};


}
)();
module.exports= {
toinit:ostableauposteCtrl.toinit
};
