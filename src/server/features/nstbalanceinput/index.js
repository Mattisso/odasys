"use strict";
var _ = require('lodash');
const { combineLatest, Observable, pipe, concat } = require('rxjs');
const  { concatMap, map  } =require('rxjs/operators');
const {result$} =require('./LoadNstbalanceinput').toinit();
// const {getloadnstbalanceinputs$} =require('./nstbalanceinputRepository').toinit();
const {index$,getbyid$,insert$,update$,delete$,odasearchby,getloadnstBalanceinputs$} =require('./nstbalanceinputCtrl').toinit();

var index = (function () {

 // const {getloadnstbalanceinputs$} =require('./nstbalanceinputRepository').toinit();

  function toinit() {
    return {
      nstbalanceinputLoad$ : result$,
      insert$:insert$,
      update$:update$,
      delete$:delete$,
      getbyid$:getbyid$,
      index$:index$,
      odasearchby:odasearchby,
      getloadnstBalanceinputs$:getloadnstBalanceinputs$

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


