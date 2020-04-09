const _ = require('lodash');
const { Observable } = require('rxjs');
const { map, filter, scan, combineLatest } = require('rxjs/operators');
const { concatMap } = require('rxjs/operators');
const {
  getreportDetails$,
  getoreportdetailBy$,
  getAll,
  getByid$,
  toCreateoreportdetaildata$,
  Insertoreportdetail$,
  toUpdateoreportdetaildata$,
  editoreportdetail$,
  odasearchBy,
  Deleteoreportdetail$,
} = require('./oreportdetailRepository').toinit();
const {result$}=require('./orepOrtdetailSeed').toinit();
const oreportdetailCtrl = (function () {

  const index$ = function () {
    return getreportDetails$;
  };


  const seedorepOrtdetail$=function(){
    return result$;
    };
  const getbyid$ = function (id) {
    return getByid$(id);
  };

  const odasearchby = function (body) {
    return odasearchBy(body);
  };
  const getoreportdetailby$ = function (olevelnum) {
    return getoreportdetailBy$(olevelnum);
  };
  const getall = function (callback) {
    return getAll(callback);
  };

  const insertoreportdetail$ = function (body) {
    return toCreateoreportdetaildata$(body).pipe(concatMap(function (x) {
      return Insertoreportdetail$(x);
    }));
  };

  const updateoreportdetail$ = function (body, requestparamid) {
    return toUpdateoreportdetaildata$(body).pipe(concatMap(function (x) {
      return editoreportdetail$(x, requestparamid);
    }));
  };

  const deleteoreportdetail$ = function (requestparamid) {
    return Deleteoreportdetail$(requestparamid);

  };

  function toinit() {
    return {
      index$: index$(),
      getoreportdetailby$: getoreportdetailby$,
      getall: getall,
      getbyid$:getbyid$,
    //  toCreateoreportdetaildata$:toCreateoreportdetaildata$,
      insert$:insertoreportdetail$,
  //    toUpdateoreportdetaildata$:toUpdateoreportdetaildata$,
      update$:updateoreportdetail$,
      odasearchby:odasearchby,
      delete$:deleteoreportdetail$,
      seedorepOrtdetail$:seedorepOrtdetail$()

    };
  }

  return {
    toinit: toinit
  };



}
)();
module.exports = {
  toinit: oreportdetailCtrl.toinit
};

