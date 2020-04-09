"use strict";
const {
  getall,
  insert$,
  update$,
  delete$,
  getbyid$,
  index$,
  odasearchby,
  getreferencebyotableaupostes$,
  getoreferenceLists$,
  ddlreferencebyYears$,
  ddlreferencebyotableauposteVM$,
  combinedseedata$,
  seedOreference$,
} = require('./oreferenceCtrl').toinit();
var index = (function () {
  function toinit() {
    return {
      getall: getall,
      insert$: insert$,
      update$: update$,
      delete$: delete$,
      getbyid$: getbyid$,
      index$: index$,
      odasearchby: odasearchby,
      getreferencebyotableaupostes$: getreferencebyotableaupostes$,
      getoreferenceLists$: getoreferenceLists$,
      ddlreferencebyYears$: ddlreferencebyYears$,
      ddlreferencebyotableauposteVM$: ddlreferencebyotableauposteVM$,
      combinedseedata$: combinedseedata$,
      seedOreference$: seedOreference$
    };
  }

  return {
    toinit: toinit
  };

})();
module.exports = {
  toinit: index.toinit
};
