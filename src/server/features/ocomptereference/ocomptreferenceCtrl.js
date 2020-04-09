"use strict";
const _ = require('lodash');
const { concatMap } = require('rxjs/operators');
const {getByid$,getAll,getloadocomptereferencedata$,getocomptreferences$,editocomptereference$,insertocomptereference$,odasearchBy,deleteocomptereference$,toUpdateocomptereferencedata$,toCreateocomptereferencedata$}=require('./ocomptreferenceRepository').toinit();
const {result$}=require('./ocomptereferenceSeed').toinit();

const ocomptreferenceCtrl = (function () {
  const seedocomptereference$ = function () {
    return result$;
  };
  const index$ = function () {
    return getocomptreferences$;
  };

  const getloadcomptereferencedata$ = function () {
    return getloadocomptereferencedata$;
  };
  const getbyid$ = function (id) {
    return getByid$(id);
  };

  const odasearchby = function (body) {
    return odasearchBy(body);
  };
  const insertcomptereference$ = function (body) {
    return toCreateocomptereferencedata$(body).pipe(concatMap(function (x) {
        return insertocomptereference$(x);
      }));
  };

  const updatecomptereference$ = function (body, requestparamid) {
    return toUpdateocomptereferencedata$(body).pipe(concatMap(function (x) {
        return editocomptereference$(x, requestparamid);
      }));
  };

  const getallcomptereferences = function (callback) {
    return getAll(callback);
  };
  const deletecomptereference$ = function (requestparamid) {
    return deleteocomptereference$(requestparamid);

  };

  function toinit() {
    return {
      seedocomptereference$: seedocomptereference$(),
      index$: index$(),
      getbyid$: getbyid$,
      insert$: insertcomptereference$,
      update$: updatecomptereference$,
      delete$: deletecomptereference$,
      getallcomptereferences: getallcomptereferences,
      odasearchby: odasearchby,
      getloadcomptereferencedata$: getloadcomptereferencedata$()
    };
  }

  return {
    toinit: toinit
  };

})();
module.exports = {
  toinit: ocomptreferenceCtrl.toinit
};
