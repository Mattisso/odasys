"use strict";
const {insertOCompte$,getAllocomptes,getocomptes$,editOCompte$,deleteOCompte$,odasearchBy,getByid$,toCreateOComptedata$,toUpdateOComptedata$}=require('./ocompteRepository').toinit();
const {seedresult$}=require('./ocompteSeed').toinit();

const { concatMap } = require('rxjs/operators');

const ocompteCtrl = (function () {
  const index$ = function () {
    return getocomptes$;
  };
  const getallocomptes = function (callback) {
    return getAllocomptes(callback);
  };
  const seedocompte$ = function () {
    return seedresult$;
  };
  const getbyid$ = function (id) {
    return getByid$(id);
  };
  const odasearchby = function (body) {
    return odasearchBy(body);
  };
  const insertocompte$ = function (body) {
    return toCreateOComptedata$(body).pipe(concatMap(function (x) {
      
        return insertOCompte$(x);
      }));
  };
  const updateOCompte$ = function (body, requestparamid) {
    return toUpdateOComptedata$(body).pipe(concatMap(function (x) {
        return editOCompte$(x, requestparamid);
      }));
  };
  const deleteocompte$ = function (requestparamid) {
    return deleteOCompte$(requestparamid);
  };

  function toinit() {
    return {
      index$: index$(),
      seedocompte$: seedocompte$(),
      odasearchby: odasearchby,
      getbyid$: getbyid$,
      insert$: insertocompte$,
      update$: updateOCompte$,
      delete$: deleteocompte$,
      getallocomptes: getallocomptes
    };
  }
  return {
    toinit: toinit
  };

})();
module.exports = {
  toinit: ocompteCtrl.toinit
};
