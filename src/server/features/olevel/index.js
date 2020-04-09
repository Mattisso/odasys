
"use strict";
var _ = require('lodash');
const {getall, index$, getByCode$,getbyid$,insert$,update$,delete$,odasearchby,seedolevel$}=require('./olevelCtrl').toinit();

const index = (function () {
  function toinit() {
return {
seedolevel$:seedolevel$,
getAll:getall,
index$:index$,
getByCode$:getByCode$,
getbyid$:getbyid$,
insert$:insert$,
update$:update$,
delete$:delete$,
odasearchby:odasearchby
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


