'use strict';
const ocompteClass = (function () {
  class OcompteClass {
    constructor(CompteNumber) {
      this._comptenumber = CompteNumber;
    }
    get comptenumber() {
      return this._comptenumber;
    }

    set comptenumber(CompteNumber) {
      this._comptenumber = CompteNumber;
      return this;
    }
  }
  const ocompteObj = {
    CompteNumber: String
  };

  function toinit() {
    return {
      OcompteClass: OcompteClass,
      ocompteObj:ocompteObj
     };
  }
  return {
    toinit: toinit
  };
})();
module.exports = {
  toinit: ocompteClass.toinit
};
