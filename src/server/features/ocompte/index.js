
"use strict";
const _=require('lodash');
const {getallocomptes,getbyid$,index$,insert$,update$,delete$,odasearchby,seedocompte$}=require('./ocompteCtrl').toinit();
const index = (function () {
  function toinit() {
    return {
seedOcompte$:seedocompte$,
getAllocomptes:getallocomptes,
getbyid$:getbyid$,
insert$:insert$,
update$:update$,
delete$:delete$,
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


