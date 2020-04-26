"use strict";

const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;

const nttcomptebalanceDetailClass=(function(){

  const modelObject = {

    nttcomptebalanceKey:
      {
        type: ObjectId,
        ref: 'nttCompteBalance'
      }
  };

class nttcomptebalanceDetailClass {
	constructor(nttcomptebalanceKey, NumCompte, IntitulCompte, SoldeCredit, SoldeDebit) {
		this._NumCompte = NumCompte;
		this._IntitulCompte = IntitulCompte;
		this._SoldeCredit = SoldeCredit;
		this._SoldeDebit = SoldeDebit;
		this._nttcomptebalanceKey = nttcomptebalanceKey;
	}
  get nttcomptebalancekey() {
    return this._nttcomptebalanceKey;
  }
  set nttcomptebalancekey(nttcomptebalanceKey) {
    this._nttcomptebalanceKey = nttcomptebalanceKey;
    return this;
  }
  get numcompte() {
    return this._NumCompte;
  }
  set numcompte(NumCompte) {
    this._NumCompte = NumCompte;
    return this;
  }
  get intitulcompte() {
    return this._IntitulCompte;
  }
  set intitulcompte(IntitulCompte) {
    this._IntitulCompte = IntitulCompte;
    return this;
  }
  get soldedebit() {
    return this._SoldeDebit;
  }
  set soldedebit(SoldeDebit) {
    this._SoldeDebit = SoldeDebit;
    return this;
  }
  get soldecredit() {
    return this._SoldeCredit;
  }
  set soldecredit(SoldeCredit) {
    this._SoldeCredit = SoldeCredit;
    return this;
  }
  get amort_amnt() {
    return this._Amort_Amnt;
  }
  set amort_amnt(Amort_Amnt) {
    this._Amort_Amnt = Amort_Amnt;
    return this;
  }
  get provis_amnt() {
    return this._Provis_Amnt;
  }
  set provis_amnt(Provis_Amnt) {
    this._Provis_Amnt = Provis_Amnt;
    return this;
  }
  get net_amnt() {
    return this._Net_Amnt;
  }
  set net_amnt(Net_Amnt) {
    this._Net_Amnt = Net_Amnt;
    return this;
  }
}
function toinit(){
  return {
    modelObject:modelObject,
    nttcomptebalanceDetailClass:nttcomptebalanceDetailClass,
  };
}

return {
toinit:toinit
};
})();
module.exports={
  toinit:nttcomptebalanceDetailClass.toinit
};
