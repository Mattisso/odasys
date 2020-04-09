"use strict";
const _ = require('lodash');
const {index$,getbyid$,insertcomptebalance$, odasearchby,deletecomptebalance$,updatecomptebalance$,getall,index$$,getcombinedbyid$,insertcomptebalancewithDetail$}=require('./nttcomptebalanceCtrl').toinit();
/* const {insertcomptedetails$,updatecomptedetails$,deletecomptedetails$}=require('../nttcomptebalancedetail/index').toinit(); */
const {concat } = require('rxjs');
const {result$}=require('./loadnttcomptebalance').toinit();
const  index = (function () {
 /*  const insertcomptebalancewithDetail$ = function (body,requestparamid) {
    return concat(insertcomptebalance$(body,requestparamid),insertcomptedetails$(body))
    }; */
 
  function toinit() {
    return {
  nttcomptebalanceload$:result$,
  getall:getall,
  insert$: insertcomptebalance$,
  update$: updatecomptebalance$,
  delete$: deletecomptebalance$,
  getbyid$: getbyid$,
  index$: index$,
  odasearchby: odasearchby,
  getcombinedbyid$:getcombinedbyid$,
  insertcomptebalancewithDetail$:insertcomptebalancewithDetail$,
  index$$:index$$
    };
  }

  return {
    toinit: toinit
  };

}
)();
module.exports= {
toinit:index.toinit
};


