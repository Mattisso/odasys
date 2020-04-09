"use strict"

const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;

const nttcomptebalanceDetailClass=(function(){
  
  const modelObject = {

    nttcomptebalanceKey:
      {
        type: ObjectId,
        ref: 'nttCompteBalance'
      }
  }
  
class nttcomptebalanceDetailClass {
	constructor(nttcomptebalanceKey, NumCompte, IntitulCompte, SoldeCredit, SoldeDebit) {
		this._NumCompte = NumCompte;
		this._IntitulCompte = IntitulCompte;
		this._SoldeCredit = SoldeCredit;
		this._SoldeDebit = SoldeDebit;
		this._nttcomptebalanceKey = nttcomptebalanceKey;
	}
	get numcompte() {
		this._NumCompte;
	}
	set numcompte(NumCompte) {
		this._NumCompte = NumCompte;
		return this;
	}
	get intitulcompte() {
		this._IntitulCompte;
	}
	set intitulcompte(IntitulCompte) {
		this._IntitulCompte = IntitulCompte;
		return this;
	}
	get soldecredit() {
		this._SoldeCredit;
	}
	set soldecredit(SoldeCredit) {
		this._SoldeCredit = SoldeCredit;
		return this;
	}
	get comptenumber() {
		this._CompteNumber;
	}
	set comptenumber(CompteNumber) {
		this._CompteNumber = CompteNumber;
		return this;
	}
	get soldedebit() {
		this._SoldeDebit;
	}
	set soldedebit(SoldeDebit) {
		this._SoldeDebit = SoldeDebit;
		return this;
	}

	get nttcomptebalancekey() {
		return this._nttcomptebalanceKey;
	}
	set nttcomptebalancekey(nttcomptebalanceKey) {
		this._nttcomptebalanceKey = nttcomptebalanceKey;
		return this;
	}
}

function toinit(){
  return {
    modelObject:modelObject,
    nttcomptebalanceDetailClass:nttcomptebalanceDetailClass,
  }
}

return {
toinit:toinit
}
})()
module.exports={
  toinit:nttcomptebalanceDetailClass.toinit
}