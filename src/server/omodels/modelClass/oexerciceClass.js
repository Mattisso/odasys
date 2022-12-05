
"use strict";
const mongoose = require('mongoose'),
ObjectId = mongoose.SchemaTypes.ObjectId;
const oexerciceClass = (function () {
  const initObjOexcerice = {
    oExerciceEncour: {
      type: String
    },
    ExercicePrev: {
      type: String
    },
    /* OexercComptaKey: {
      type: ObjectId,
      ref: 'oExercCompta'
    }, */
    OexercComptaPrevKey: {
      type: ObjectId,
      ref: 'oExercCompta'
    },
    OexercComptaEncourKey: {
      type: ObjectId,
      ref: 'oExercCompta'
    }
  };

  class oExerciceClass {
    constructor(oExerciceEncour, ExercicePrev,  OexercComptaPrevKey, OexercComptaEncourKey) {
      this._oExerciceEncour = oExerciceEncour;
      this._OexercComptaEncourKey = OexercComptaEncourKey;
      this._OexercComptaPrevKey = OexercComptaPrevKey;
      this._ExercicePrev = ExercicePrev;
    }
    get oexerccomptaencourkey() {
      return this._OexercComptaEncourKey;
    }
    set oexerccomptaencourkey(OexercComptaEncourKey) {
      this._OexercComptaEncourKey = OexercComptaEncourKey;
     // return this;
    }
    get oexerccomptaprevkey() {
      return this._OexercComptaPrevKey;
    }
    set oexerccomptaprevkey(OexercComptaPrevKey) {
      this._OexercComptaPrevKey = OexercComptaPrevKey;
     // return this;
    }
    get exerciceprev() {
      return this._ExercicePrev;
    }
    set exerciceprev(ExercicePrev) {
      this._ExercicePrev = ExercicePrev;
     // return this;
    }
    get oexerciceencour() {
      return this._oExerciceEncour;
    }
    set oexerciceencour(oExerciceEncour) {
      this._oExerciceEncour = oExerciceEncour;
    //  return this;
    }
  }
  function tonit() {
    return {
      initObjOexcerice: initObjOexcerice,
      oExerciceClass: oExerciceClass
    };
  }
  return {
    tonit: tonit
  };
})();
module.exports = {
  tonit: oexerciceClass.tonit
};
