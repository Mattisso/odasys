"use strict";
const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;
const oreportdetailClass=(function(){
  const modelObject = {
    OtableauposteKey: {
      type: ObjectId,
      ref: 'oTableauPoste'
    },
    OreferenceKey: {
      type: ObjectId,
      ref: 'oReference'
    },
    olevelKey: {
      type: ObjectId,
      ref: 'olevel'
    },
    SortOrder: {
      type: Number,
    default:
      1
    }
  };

  class oreportDetailClass {
    constructor(OtableauposteKey, OreferenceKey, olevelKey, SortOrder) {
      this._SortOrder = SortOrder;
      this._OtableauposteKey = OtableauposteKey;
      this._OreferenceKey = OreferenceKey;
      this._olevelKey = olevelKey;
    }

    get sortorder() {
      return this._sortOrder;
    }
    set sortorder(SortOrder) {
      this._sortOrder = SortOrder;
      return this;
    }
    get otableaupostekey() {
      return this._OtableauposteKey;
    }
    set otableaupostekey(OtableauposteKey) {
      this._OtableauposteKey = OtableauposteKey;
      return this;
    }
    get oreferencekey() {
      return this._OreferenceKey;
    }
    set oreferencekey(OreferenceKey) {
      this._OreferenceKey = OreferenceKey;
      return this;
    }
    get olevelkey() {
      return this._olevelKey;
    }
    set olevelkey(olevelKey) {
      this._olevelKey = olevelKey;
      return this;
    }
  }

function toinit(){
  return {
    modelObject:modelObject,
    oreportDetailClass:oreportDetailClass,
  };
}

return {
toinit:toinit
};
})();
module.exports={
  toinit:oreportdetailClass.toinit
};
