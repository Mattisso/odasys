"use strict";
var _ = require('lodash');

const index = (function () {
  function toinit() {
    return {

            'balanceinputdata': require('./balanceinputdata'),
            'ocomptedata': require('./ocomptedata'),
            'oexercomptadata': require('./oexercomptadata'),
            'oreferencedata': require('./oreferencedata').toinit(),
            'ostableaupostedata': require('./ostableaupostedata').toinit(),
            'ostblareadata': require('./ostbleareadata').toinit(),
            'otableaupostedata': require('./otableaupostedata').toinit(),
            'oleveldata': require('./oleveldata'),
           'ocompterefencedata': require('./ocompterefencedata'),
            'userdata':require('./userdata'),
            'oreportdetaildata': require('./oreportdetaildata'),
            'oreportheaderdata': require('./oreportheaderdata')

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
