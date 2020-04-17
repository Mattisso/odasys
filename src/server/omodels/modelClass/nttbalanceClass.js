'use strict';
const mongoose = require('mongoose'),
 ObjectId = mongoose.SchemaTypes.ObjectId;
const nttbalanceClass=(function(){
  const nttbalanceObject = {
    OexercComptaKey: {
      type: ObjectId,
      ref: 'oExercCompta'
    },
    OtableauposteKey: {
      type: ObjectId,
      ref: 'oTableauPoste'
    },
    OreferenceKey: {
      type: ObjectId,
      ref: 'oReference'
    },
    OcompteKey: {
      type: ObjectId,
      ref: 'oCompte'
    }
  };
  class nttbalanceClass {
    constructor(OexercComptaKey, OtableauposteKey, OreferenceKey, OcompteKey, NumCompte, IntitulCompte, SoldeCredit, SoldeDebit) {
      this._OexercComptaKey = OexercComptaKey;
      this._OtableauposteKey = OtableauposteKey;
      this._OreferenceKey = OreferenceKey;
      this._OcompteKey = OcompteKey;
      this._IntitulCompte = IntitulCompte;
      this._NumCompte = NumCompte;
      this._SoldeDebit = SoldeDebit;
      this._SoldeCredit = SoldeCredit;
    }

    get oexerccomptakey() {
      return this._OexercComptaKey;
    }
    get otableaupostekey() {
      return this._OtableauposteKey;
    }
    get oreferencekey() {
      return this._OreferenceKey;
    }
    get ocomptekey() {
      return this._OcompteKey;
    }
    get intitulcompte() {
      return this._IntitulCompte;
    }
    get numcompte() {
      return this._NumCompte;
    }
    get soldedebit() {
      return this._SoldeDebit;
    }
    get soldecredit() {
      return this._SoldeCredit;
    }

    set oexerccomptakey(OexercComptaKey) {
      this._OexercComptaKey = OexercComptaKey;
      return this;
    }
    set otableaupostekey(OtableauposteKey) {
      this._OtableauposteKey = OtableauposteKey;
      return this;
    }
    set oreferencekey(OreferenceKey) {
      this._OreferenceKey = OreferenceKey;
      return this;
    }
    set ocomptekey(OcompteKey) {
      this._OcompteKey = OcompteKey;
      return this;
    }
    set intitulcompte(IntitulCompte) {
      this._IntitulCompte = IntitulCompte;
      return this;
    }
    set numcompte(NumCompte) {
      this._NumCompte = NumCompte;
      return this;
    }
    set soldedebit(SoldeDebit) {
      this._SoldeDebit = SoldeDebit;
      return this;
    }
    set soldecredit(SoldeCredit) {
      this._SoldeCredit = SoldeCredit;
      return this;
    }
  }
function toinit() {
  return {
nttbalanceClass:nttbalanceClass,
nttbalanceObject:nttbalanceObject
  };


}
return {
  toinit:toinit
};
})();
module.exports={
toinit:nttbalanceClass.toinit
};
