
"use strict";
/* eslint-disable  no-console */
/* eslint-disable no-unused-vars */
const {getcompteBalancedetails$,getByid$,insertCompteBalanceDetail$,toUpdateCompteBalanceDetaildata$,deleteCompteBalanceDetail$,editCompteBalanceDetail$,odasearchBy,toCreateCompteBalanceDetaildata$,}=require('./nttcomptebalancedetailRepository').toinit();
const { concatMap } = require('rxjs/operators');

const nttComptebalancedetailCtrl = (function () {
  const index$ = function () {
    return getcompteBalancedetails$;
  };
  const getbyid$ = function (id) {
    return getByid$(id);
  };

  const odasearchby = function (body) {
    return odasearchBy(body);
  };
  const insertComptebalanceWithDetail$ = function(argone){
    return insertCompteBalanceDetail$(argone);
  };
  const insertComptebalancedetail$ = function (body,requestparamid) {
    //if(requestparamid)
    return toCreateCompteBalanceDetaildata$(body,requestparamid).pipe(concatMap(function (x) {
        return insertCompteBalanceDetail$(x);
      }));
  };

  const updateComptebalancedetail$ = function (body,requestparamid) {
    let comptebalance ={};
    return toUpdateCompteBalanceDetaildata$(body,requestparamid).pipe(concatMap(function (x) {
        return editCompteBalanceDetail$(x, requestparamid);
      }));
  };

  const deleteComptebalancedetail$ = function (requestparamid) {
    return deleteCompteBalanceDetail$(requestparamid);

  };
  function toinit() {
    return {
      index$:index$(),
      getbyid$:getbyid$,
      insert$:insertComptebalancedetail$,
      update$:updateComptebalancedetail$,
      delete$:deleteComptebalancedetail$,
      odasearchby:odasearchby,
      insertComptebalanceWithDetail$:insertComptebalanceWithDetail$
    };
  }

  return {
    toinit: toinit
  };

})();
module.exports = {
  toinit: nttComptebalancedetailCtrl.toinit
};

