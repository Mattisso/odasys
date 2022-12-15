"use strict";

const olevelClass=(function(){
  const modelObject = {
    olevelNum: {
      type: String
    },
    olevelDescption: {
      type: String
    }
  };
  class olevelClass {
    constructor(olevelNum, olevelDescption) {
      this._olevelNum = olevelNum;
      this._olevelDescption = olevelDescption;
    }
    get olevelnum() {
      return this._olevelNum;
    }
    get oleveldescption() {
      return this._olevelDescption;
    }
    set olevelnum(olevelNum) {
      this._olevelNum = olevelNum;
     // return this;
    }
    set oleveldescption(olevelDescption) {
      this._olevelDescption = olevelDescption;
     // return this;
    }
  }
  function toinit(){
    return {
modelObject:modelObject,
olevelClass:olevelClass
    };
  }
  return {
    toinit:toinit
  };

})();
module.exports={
toinit:olevelClass.toinit
};
