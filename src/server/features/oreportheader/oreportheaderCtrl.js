"use strict";
const _ = require('lodash');
const { concatMap } = require('rxjs/operators');
const { getreportheaders$,
  index,
  getByid$,
  toCreateoreportheaderdata$,
  Insertoreportheader$,
  editoreportheader$,
  odasearchBy,
  Deleteoreportheader$,
  toUpdateoreportheaderdata$
}=require('./oreportheaderRepository').toinit();
const {result$}=require('./oreportheaderSeed').toinit();
const oreportheaderCtrl = (function () {

  const index$ = function () {
    return getreportheaders$;
  };

  const seedoreportheader$=function(){
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

  const insertoreportheader$ = function (body) {
    return toCreateoreportheaderdata$(body).pipe(concatMap(function (x) {
      return Insertoreportheader$(x);
    }));
  };

  const updateoreportheader$ = function (body, requestparamid) {
    return toUpdateoreportheaderdata$(body).pipe(concatMap(function (x) {
      return editoreportheader$(x, requestparamid);
    }));
  };

  const deleteoreportheader$ = function (requestparamid) {
    return Deleteoreportheader$(requestparamid);
  };

  function toinit() {
    return {
      index$: index$(),
      getbyid$:getbyid$,
      getall:getall,
      insert$:insertoreportheader$,
      updates$:updateoreportheader$,
      odasearchby:odasearchby,
      Delete$:deleteoreportheader$,
      seedoreportheader$:seedoreportheader$()
    };
  }

return {
  toinit: toinit
};



}
)();
module.exports= {
toinit:oreportheaderCtrl.toinit
};


