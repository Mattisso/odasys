"use strict";
const _ = require('lodash');
const {result$}=require('./loadnttcomptebalancedetail').toinit();
const {index$,insert$,update$,delete$,odasearchby,getbyid$, insertComptebalanceWithDetail$}=require('./nttComptebalancedetailCtrl').toinit();
const  index = (function () {

  function toinit() {
    return {
      nttcomptebalancedetailload$:result$,
      insertcomptedetails$:insert$,
      updatecomptedetails$:update$,
      deletecomptedetails$:delete$,
      getbyid$:getbyid$,
      insertWithDetails$:insertComptebalanceWithDetail$,
      index$:index$,
      odasearchby:odasearchby,
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


