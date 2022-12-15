"use strict";
const mongoose = require('mongoose'),
ObjectId = mongoose.SchemaTypes.ObjectId;

const ocomptereferenceClass=(function(){
  const modelObject = {
    OcompteKey: {
      type: ObjectId,
      ref: 'oCompte'
    },
    OstblareaKey: {
      type: ObjectId,
      ref: 'oStblArea'

    },
    OreferenceKey: {
      type: ObjectId,
      ref: 'oReference'
    },
    OtableauposteKey: {
      type: ObjectId,
      ref: 'oTableauPoste'
    },
    OstableauposteKey: {
      type: ObjectId,
      ref: 'oStableauPoste'
    },
    Exception: {
      type: Number,
    default:
      0
    },
    Taux: {
      type: Number,
    default:
      1
    }

  };

  class ocompteReferenceClass {
    constructor(OcompteKey, OstblareaKey, OreferenceKey, OtableauposteKey, OstableauposteKey, Exception=0, Taux=1) {
      this._OcompteKey = OcompteKey;
      this._OstblareaKey = OstblareaKey;
      this._OreferenceKey = OreferenceKey;
      this._OstableauposteKey = OstableauposteKey;
      this._OtableauposteKey = OtableauposteKey;
      this._Exception = Exception;
      this._Taux = Taux;
    }

    get ostableaupostekey() {
      return this._OstableauposteKey;
    }
    set ostableaupostekey(OstableauposteKey) {
      this._OstableauposteKey = OstableauposteKey;
   //   return this;
    }

    get ocomptekey() {
      return this._OcompteKey;
    }
    set ocomptekey(OcompteKey) {
      this._OcompteKey = OcompteKey;
   //   return this;
    }

    get ostblareakey() {
      return this._OstblareaKey;
    }
    set ostblareakey(OstblareaKey) {
      this._OstblareaKey = OstblareaKey;
     // return this;
    }

    get otableaupostekey() {
      return this._OtableauposteKey;
    }
    set otableaupostekey(OtableauposteKey) {
      this._OtableauposteKey = OtableauposteKey;
     // return this;
    }

    get exception() {
      return this._Exception;
    }
    set exception(Exception) {
      this._Exception = Exception;
     // return this;
    }

    get taux() {
      return this._Taux;
    }
    set taux(Taux) {
      this._Taux = Taux;
     // return this;
    }

  }
function toinit(){
  return {
    modelObject:modelObject,
    ocompteReferenceClass:ocompteReferenceClass
  };
}

return {
toinit:toinit
};
})();
module.exports={
  toinit:ocomptereferenceClass.toinit
};
