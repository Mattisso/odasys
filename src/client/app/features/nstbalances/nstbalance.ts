// import { nstBalance } from '../../../server/omodels/nstbalance';
// import ohaconvert = require('../../shared/ohaconvert');

export interface INstbalance {
  id: string;
  OexercComptaKey?: string;
  oexercCompta ?: string;
  OtableauposteKey?: string;
  otableauposte?: string;
  OreferenceKey?: string;
  oreference ?: string;
  NumCompte: string;
  IntitulCompte: string;
  SoldeDebit?: number;
  SoldeCredit?: number;
/*   addbalance?: () => void;
  hasitem?: (objdata: any) => boolean;
  removeItem?: (objdata: any) => void;
  getData?: () => void;
  CreatedOn?: Date;
  CreatedBy?: string;
  ModifiedOn?: Date;
  ModifiedBy?: string;*/
}
export class Nstbalance implements INstbalance {
 /*  addbalance: () => void;
  hasitem: (objdata: any) => boolean;
  removeItem: (objdata: any) => void;
  getData: () => void;
  private _arrnstBalances: INstbalance[] = []; */
  OexercComptaKey: string;
  OtableauposteKey: string;
  OreferenceKey: string;
  oexercCompta: string;
  otableauposte: string;
  oreference: string;
  id: string; NumCompte: string;
  IntitulCompte: string; SoldeDebit?: number; SoldeCredit?: number;

/*
  constructor(id: string,  numcompte: string, intitulCompte: string, oexercComptaKey?: string
    , otableauposteKey?: string, oexercCompta?: string, otableauposte?: string, oreference?: string,
    oreferenceKey?: string, soldeDebit?: number, soldeCredit?: number) {
    this.id = id;
    this.OexercComptaKey = oexercComptaKey;
    this.OtableauposteKey = otableauposteKey;
    this.OreferenceKey = oreferenceKey;
    this.oexercCompta = oexercCompta;
    this.otableauposte = otableauposte;
    this.oreference = oreference;
    this.NumCompte = numcompte;
    this.IntitulCompte = intitulCompte;
    this.SoldeDebit = soldeDebit;
    this.SoldeCredit = soldeCredit;
    function isNum(value: any): number {
      if (isNaN(value)) {
        value = 0;
      } else {
        return value;
      }
    }
    this.addbalance = function () {
      this._arrnstBalances.push({
        'id': this.id,
        'OexercComptaKey': this.oexercComptaKey,
        'OtableauposteKey': this.otableauposteKey,
        'OreferenceKey': this.oreferenceKey,
        'NumCompte': this.numcompte,
        'IntitulCompte': this.intitulCompte,
        'SoldeDebit': this.soldeDebit,
        'SoldeCredit': this.soldeCredit,
        'CreatedOn': this.CreatedOn,
        'CreatedBy': this.CreatedBy,
        'ModifiedOn': this.ModifiedOn,
        'ModifiedBy': this.ModifiedBy
      });

      let DetailCount = 0;
      let TotalSoldeDebit = 0;
      let TotalSoldeCredit = 0;

      TotalSoldeDebit += isNum(this.soldeDebit);
      TotalSoldeCredit += isNum(this.soldeCredit);
      DetailCount = this._arrnstBalances.length;

      return {
        TotalSoldeDebit: TotalSoldeDebit,
        TotalSoldeCredit: TotalSoldeCredit,
        DetailCount: DetailCount,
      };

    };
    this.hasitem = function (objdata) {
      return this._arrnstBalances.indexOf(objdata) !== -1;

    };
    this.removeItem = function (objdata) {
      const itemIndex = this._arrnstBalances.indexOf(objdata);
      if (itemIndex !== -1) {
        this._arrnstBalances.splice(itemIndex, 1);
      }
    };

    // var getData;
    this.getData = function () {
      return {
        'OexercComptaKey': this.oexercComptaKey,
        'OtableauposteKey': this.otableauposteKey,
        'OreferenceKey': this.oreferenceKey,
        'NumCompte': this.numcompte,
        'IntitulCompte': this.intitulCompte,
        'SoldeDebit': this.soldeDebit,
        'SoldeCredit': this.soldeCredit,
        'TotalSoldeDebit': this.TotalSoldeDebit,
        'TotalSoldeCredit': this.TotalSoldeCredit,
        'CreatedOn': this.CreatedOn,
        'CreatedBy': this.CreatedBy,
        'ModifiedOn': this.ModifiedOn,
        'ModifiedBy': this.ModifiedBy,
        'DetailCount': this.DetailCount,
        '_arrnstBalances': this._arrnstBalances.slice()
      };
    };
  }
 */

}
