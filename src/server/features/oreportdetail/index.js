
"use strict";
const _ = require('lodash');
// const {result$}=require('./orepOrtdetailSeed').toinit();
const {
  getall,
  getbyid$,
  odasearchby,
  insert$,
  update$,
  delete$,
  getoreportdetailby$,
  index$,
  seedorepOrtdetail$
} = require('./oreportdetailCtrl').toinit();
const index = (function () {
  function toinit() {
    return {
      seedorepOrtdetail$: seedorepOrtdetail$,
      getall: getall,
      getoreportdetailby$: getoreportdetailby$,
      index$: index$,
      insert$: insert$,
      update$: update$,
      delete$: delete$,
      getbyid$: getbyid$,
      odasearchby: odasearchby,
    };
  }

  return {
    toinit: toinit
  };

})();
module.exports = {
  toinit: index.toinit
};
