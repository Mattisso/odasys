"use strict";

const mongoose = require('mongoose'),
 ObjectId = mongoose.SchemaTypes.ObjectId;
const ostblareaClass=(function(){
  const modelObject = {
    AreaShortName: {
      type: String,
      required: true,
      unique: true
    },
    AreaLongName: {
      type: String
    },
    ocomptes: [{
        _ocompte: {
          type: ObjectId,
          ref: 'oCompte',
          alias: ''
        }
      }

    ]
  };
  class ostblareaClass {
    constructor(AreaShortName, AreaLongName ='Unknown',ocomptes=[]) {
      this._AreaShortName = AreaShortName;
      this._AreaLongName = AreaLongName;
      this._ocomptes = ocomptes;
    }
    get areashortname() {
      return this._AreaShortName;
    }
    get arealongname() {
      return this._AreaLongName;
    }
  /*   get ocompte() {
      return this._ocomptes;
    }
   */
    set areashortname(AreaShortName) {
      this._AreaShortName = AreaShortName;
   //   return this;
    }
    set arealongname(AreaLongName) {
      this._AreaLongName = AreaLongName;
    //  return this;
    }
   /*  set ocompte(ocomptes) {
      this._ocomptes = ocomptes;
      return this;
    } */
  }
  function tonit(){
    return {
      modelObject:modelObject,
      ostblareaClass:ostblareaClass
    };
  }
  return {
    tonit:tonit
  };
})();
module.exports={
  tonit:ostblareaClass.tonit
};
