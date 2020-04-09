"use strict";
const _ = require('lodash');
const {getByid$,getoexercices$,result$,index}=require('./oexerciceRepository').toinit();
const oexerciceCtrl = (function () {
  const getbyid$ = function (id) {
    return getByid$(id);
  };

  const seedoexercice$ = function() {
    return result$;
  };

  function toinit() {
    return {
      getbyid$:getbyid$,
      getAll:index,
      index$:getoexercices$,
      seedoexercice$:seedoexercice$()
    };
  }

return {
  toinit: toinit
};



}
)();
module.exports= {
toinit:oexerciceCtrl.toinit
};


