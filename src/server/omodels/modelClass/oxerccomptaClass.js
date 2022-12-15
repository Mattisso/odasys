

"use strict";
const oxerccomptaClass = (function () {
  const initObject = {
    oExercComptaId: {  type: String,
      required: true,
      unique: true
    },
    DateDebut: {
      type: Date,
    default:
      Date.now
    },
    Datefin: {
      type: Date,
    default:
      Date.now
    },
    Cloture: {
      type: Boolean,
    default:
      true
    }
  };
  class oExercComptaClass {
    constructor(oExercComptaId, DateDebut, Datefin, Cloture) {
      this._oExercComptaId = oExercComptaId;
      this._DateDebut = DateDebut;
      this._Datefin = Datefin;
      this._Cloture = Cloture;
    }
    get oexerccomptaid() {
      return this._oExercComptaId;
    }
    get datedebut() {
      return this._DateDebut;
    }
    get datefin() {
      return this._Datefin;
    }
    get cloture() {
      return this._Cloture;
    }

    set oexerccomptaid(oExercComptaId) {
      this._oExercComptaId = oExercComptaId;
    //  return this;
    }
    set datedebut(DateDebut) {
      this._DateDebut = DateDebut;
    //  return this;
    }
    set datefin(Datefin) {
      this._Datefin = Datefin;
  //    return this;
    }
    set cloture(Cloture) {
      this._Cloture = Cloture;
     // return this;
    }

  }
  function toinit() {
    return {
      initObject: initObject,
      oExercComptaClass: oExercComptaClass
    };
  }

  return {
    toinit: toinit
  };
})();
module.exports = {
  toinit: oxerccomptaClass.toinit
};
