
"use strict";
const _ = require('lodash');
const {getall,getbyid$,index$,insert$,update$,delete$,odasearchby,seedOstblarea$}=require('./ostblareaCtrl').toinit();
const index = (function () {
// const {result$}=require('./ostblareaSeed').toinit();
  function toinit() {
    return {
seedOstblarea$:seedOstblarea$,
insert$:insert$,
update$:update$,
delete$:delete$,
getbyid$:getbyid$,
index$:index$,
odasearchby:odasearchby,
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


