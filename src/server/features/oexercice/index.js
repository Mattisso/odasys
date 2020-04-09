
"use strict";
const {index$,getbyid$, seedoexercice$, getAll}=require('./oexerciceCtrl').toinit();
const index = (function () {
  function toinit() {
    return {
      seedoexercice$:seedoexercice$,
     // toseedOexercicedata$:toseedOexercicedata$,
     getoexercices$:index$,
     index$:index$,
      getbyid$:getbyid$,
      getAll:getAll
//getOexcompta:getOexcompta,
//toOexercice:toOexercice,
//seedoexercice:insertoexercice$
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


