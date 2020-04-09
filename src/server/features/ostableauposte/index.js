
"use strict";
const _ = require('lodash');
//const { result$ } = require('./ostableauposteSeed').toinit();
const { index$,
  getall,
  getbyid$,
  insert$,
  update$,
  odasearchby,
  delete$,
  seedostableauposte$
} = require('./ostableauposteCtrl').toinit();
const index = (function () {

  function toinit() {
    return {
      seedostableauposte$: seedostableauposte$,
      getall: getall,
      index$: index$,
      getbyid$: getbyid$,
      insert$: insert$,
      update$: update$,
      odasearchby: odasearchby,
      delete$: delete$
    };
  }

  return {
    toinit: toinit
  };



}
)();
module.exports = {
  toinit: index.toinit
};


