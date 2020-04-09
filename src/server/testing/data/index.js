"use strict";
var _ = require('lodash');

const index = (function () {
  function toinit() {
    return {
  /* 'ocomptereferencesdata': require('../data/source/ocomptereferencesdata.json'),
     'nstbalancedata': require('../data/source/nstbalancedata.json'),
      'ocomptedata': require('../data/source/ocomptedata.json'),
      'filteredata': require('../data/source/filteredata.json'),
      'getloadnstbalanceDatas':require('../data/source/getloadnstbalanceDatas.json'),
      'getloadnttcomptebalanceDetaildata':require('../data/source/getloadnttcomptebalanceDetaildata.json'), */
      'comptebalancedata':require('../data/comptebalancedata').toinit(),
      'ocomptedata':require('../data/ocomptedata').toinit(),
     // 'comptebalancedetaildata':require('../data/source/comptebalancedetaildata').toinit()
     'oexerccomptadata':require('../data/oexerccomptadata').toinit(),
     'oreferencedata':require('../data/oreferencedata').toinit()
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
