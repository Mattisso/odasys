"use strict";
const {replaceString}= require('../helpers/utils').toinit();
const {getTotalCount, getTotalSoldedebit, getTotalSoldecredit}=require('../../SharedKernel/odaStats').toinit();
const {odaremoveDupnumcompte} = require('../../Sharedkernel/odaUtility').toinit();

const nstbalanceinputClass =(function(){
  let arrbalanceinputs =[];

  class nstbalanceinputClass {

    constructor(NumCompte, IntitulCompte, SoldeCredit, SoldeDebit) {
      this._NumCompte = NumCompte;
      this._IntitulCompte = IntitulCompte;
      this._SoldeCredit = SoldeCredit;
      this._SoldeDebit = SoldeDebit;
    }
    get soldedebit() {
      return this._SoldeDebit;
    }
    set soldedebit(SoldeDebit) {
      this._SoldeDebit = SoldeDebit;
      return this;
    }
    get comptenumber() {
      return this._CompteNumber;
    }
    set comptenumber(CompteNumber) {
      this._CompteNumber = CompteNumber;
      return this;
    }
    get soldecredit() {
      return this._SoldeCredit;
    }
    set soldecredit(SoldeCredit) {
      this._SoldeCredit = SoldeCredit;
      return this;
    }
    get intitulcompte() {
      return this._IntitulCompte;
    }
    set intitulcompte(IntitulCompte) {
      this._IntitulCompte = IntitulCompte;
      return this;
    }
    get numcompte() {
      return this._NumCompte;
    }
    set numcompte(NumCompte) {
      this._NumCompte = NumCompte;
      return this;
    }


    get  CompteNumber() {
      return  replaceString(this.NumCompte);
    }
    set CompteNumber(v)  {
      this._comptenumber =replaceString(v);
      return this;
    }

    /*  getData() {
    return {
      "NumCompte" : this.numcompte,
        "IntitulCompte": this.intitulcompte,
        "SoldeDebit": this.soldedebit,
        "SoldeCredit": this.soldedebit,
        "CompteNumber":this.CompteNumber
    }
  } */
}
function toinit(){
  return {
    nstbalanceinputClass: nstbalanceinputClass
  };
}
return {
  toinit:toinit
};
})();
module.exports={
  toinit:nstbalanceinputClass.toinit
};
