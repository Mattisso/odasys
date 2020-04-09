"use strict";
const _ = require('lodash');
const { index$, getbyid$, insert$, odasearchby, delete$, update$, index$$, getallbyid$ } = require('./nttbalanceCtrl').toinit();
const { result$ } = require('./loadnttbalance').toinit();

const index = (function () {

  function toinit() {
    return {
      nttbalanceload$: result$,
      insert$: insert$,
      update$: update$,
      delete$: delete$,
      getbyid$: getbyid$,
      index$: index$,
      index$$: index$$,
      odasearchby: odasearchby,
      getallbyid$: getallbyid$
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

