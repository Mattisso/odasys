"use strict";
const _ = require('lodash');
const {insertolevel$,toUpdateoleveldata$,Deleteolevel$,getolevels$,getAll,getByid$,getolevelsBy$,odasearchBy,toCreateoleveldata$,editolevel$}=require('./olevelRepository').toinit();
const {result$}=require('./olevelSeed').toinit();
const { concatMap } = require('rxjs/operators');

const olevelCtrl = (function () {
  const index$ = function () {
    return getolevels$;
  };
  const getall = function (callback) {
    return getAll(callback);
  };
  const seedolevel$ = function () {
    return result$;
  };
  const getbyid$ = function (id) {
    return getByid$(id);
  };
  const getByCode$ = function (olevelnum) {
    return getolevelsBy$(olevelnum);
  };
  const odasearchby = function (body) {
    return odasearchBy(body);
  };
  const Insertolevel$ = function (body) {
    return toCreateoleveldata$(body).pipe(concatMap(function (x) {
        return insertolevel$(x);
      }));
  };
  const updateolevel$ = function (body, requestparamid) {
    return toUpdateoleveldata$(body).pipe(concatMap(function (x) {
        return editolevel$(x, requestparamid);
      }));
  };
  const deleteolevel$ = function (requestparamid) {
    return Deleteolevel$(requestparamid);
  };

  function toinit() {
    return {
      index$: index$(),
      getall: getall,
      getbyid$: getbyid$,
      getByCode$: getByCode$,
      odasearchby: odasearchby,
      insert$: Insertolevel$,
      update$: updateolevel$,
      delete$: deleteolevel$,
      seedolevel$: seedolevel$()
    };
  }
  return {
    toinit: toinit
  };

})();
module.exports = {
  toinit: olevelCtrl.toinit
};
