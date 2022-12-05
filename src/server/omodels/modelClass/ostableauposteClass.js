"use strict";
const mongoose = require('mongoose'),
 ObjectId = mongoose.SchemaTypes.ObjectId;
const ostableauposteClass= (function(){
  const modelObject = {
    StableauName: {
      type: String,
      unique: true
    },
    StbleauLongName: {
      type: String

    },
    OtableauposteKey: {
      type: ObjectId,
      ref: 'oTableauPoste'
    },
    ostblareas: [{
        OstblareaKey: {
          type: ObjectId,
          ref: 'oStblArea'
        }
      }]
  };
class ostableauposteClass {
  constructor(StableauName,StbleauLongName){
    this._StableauName = StableauName;
    this._StbleauLongName = StbleauLongName;
  }

  get stableauname() {
    return this._StableauName;
  }
  set stableauname(StableauName) {
    this._StableauName = StableauName;
 //   return this;
  }
  get stbleaulongname() {
    return this._StbleauLongName;
  }
  set stbleaulongname(StbleauLongName) {
    this._StbleauLongName = StbleauLongName;
   // return this;
  }
}

  function toinit(){
    return {
      modelObject:modelObject,
      ostableauposteClass:ostableauposteClass,
    };
  }
  return {
toinit:toinit
  };

})();
module.exports={
  toinit: ostableauposteClass.toinit

};
