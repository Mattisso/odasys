"use strict";
const _ = require('lodash');
const { getusers$,
  index,
  getByid$,
  insertuser$,
  toCreateuserdata$,
  toUpdateuserdata$,
  edituser$,
  odasearchBy,
  Deleteuser$}=require('./userRepository').toinit();
  const { concatMap } = require('rxjs/operators');
  const {seedresult$}=require('./userSeed').toinit();

const userCtrl = (function () {
  const index$ = function () {
    return getusers$;
  };
  const userSeed$ = function () {
    return seedresult$;
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

  const Insertuser$ = function (body) {
    return toCreateuserdata$(body).pipe(concatMap(function (x) {
      return insertuser$(x);
    }));
  };

  const updateuser$ = function (body, requestparamid) {
    return toUpdateuserdata$(body).pipe(concatMap(function (x) {
      return edituser$(x, requestparamid);
    }));
  };

  const deleteuser$ = function (requestparamid) {
    return Deleteuser$(requestparamid);
  };



  function toinit() {
    return {
      index$: index$(),
      getall: getall,
      getbyid$:getbyid$,
      userSeed$:userSeed$(),
      insert$:Insertuser$,
      update$:updateuser$,
      odasearchby:odasearchby,
      delete$:deleteuser$
    
    };
  }

return {
  toinit: toinit
};



}
)();
module.exports= {
toinit:userCtrl.toinit
};
