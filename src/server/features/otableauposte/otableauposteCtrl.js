/* eslint-disable  no-console */
/* eslint-disable no-unused-vars */

"use strict";
const _ = require('lodash');
const {getotableaupostes$,
  index,
  getByid$,
  insertotableauposte$,
  toCreateotableaupostedata$,
  toUpdateotableaupostedata$,
  editotableauposte$,
  odasearchBy,
  Deleteotableauposte$,DrpotableauPosteWithcomptebalances$}=require('./otableauposteRepository').toinit();
  const {result$ }=require('./otableauposteSeed').toinit();
  const { concatMap } = require('rxjs/operators');
const otableauposteCtrl = (function () {
  const index$ = function () {
    return getotableaupostes$;
  };
  const ddlotableauposteWithcomptebalances$ = function () {
    return DrpotableauPosteWithcomptebalances$;
  };
  const seedotableauposte$ = function () {
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

  const Insertotableauposte$ = function (body) {
    return toCreateotableaupostedata$(body).pipe(concatMap(function (x) {
      return insertotableauposte$(x);
    }));
  };

  const updateotableauposte$ = function (body, requestparamid) {
    return toUpdateotableaupostedata$(body).pipe(concatMap(function (x) {
      return editotableauposte$(x, requestparamid);
    }));
  };

  const deleteotableauposte$ = function (requestparamid) {
    return Deleteotableauposte$(requestparamid);
  };
  function toinit() {
    return {
      index$: index$(),
      getall: getall,
      getbyid$:getbyid$,
      insert$:Insertotableauposte$,
      update$:updateotableauposte$,
      odasearchby:odasearchby,
      delete$:deleteotableauposte$,
      seedotableauposte$:seedotableauposte$(),
      ddlotableauposteWithcomptebalances$:ddlotableauposteWithcomptebalances$()
    };
  }

  return {
    toinit: toinit
  };



}
)();
module.exports = {
  toinit: otableauposteCtrl.toinit
};


