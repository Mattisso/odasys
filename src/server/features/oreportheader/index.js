
"use strict";
var _ = require('lodash');
const index = (function () {
//const {result$}=require('./oreportheaderSeed').toinit();
const { index$,insert$,update$,delete$,odasearchby,getbyid$,getall,seedoreportheader$}=require('./oreportheaderCtrl').toinit();

  function toinit() {
    return {
      seedoreportheader$:seedoreportheader$,
      index$: index$,
      insert$:insert$,
      update$:update$,
      delete$:delete$,
      odasearchby:odasearchby,
      getbyid$:getbyid$,
      getall:getall

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


