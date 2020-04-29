
// import { nstBalance } from '../../../server/omodels/nstbalance';
// import ohaconvert = require('../../shared/ohaconvert');

export interface INttcomptebalancedetail {
  id: string;
  nttcomptebalanceKey?: string;
  NumCompte: string;
  IntitulCompte: string;
  SoldeDebit?: number;
  SoldeCredit?: number;
  addBalanceDetail?: (objdata: any) => any;
  hasitem?: (objdata: any) => boolean;
  removeItem?: (objdata: any) => void;
  getData?: () => void;
  CreatedOn?: Date;
  CreatedBy?: string;
  ModifiedOn?: Date;
  ModifiedBy?: string;
}
export class Nttcomptebalancedetail implements INttcomptebalancedetail {
  addBalanceDetail?: (objdata: any) => any;
  hasitem: (objdata: any) => boolean;
  removeItem: (objdata: any) => void;
  getData: () => void;
  nttcomptebalancedetails: [] = [];

  nttcomptebalanceKey?: string;
  id: string; NumCompte: string;
  IntitulCompte: string; SoldeDebit?: number; SoldeCredit?: number;
  CreatedOn?: Date; ModifiedOn?: Date;

  constructor(id: string,
     numcompte: string, intitulCompte: string, nttcomptebalanceKey?: string, soldeDebit?: number, soldeCredit?: number) {
    this.id = id;
    this.nttcomptebalanceKey = nttcomptebalanceKey;
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
    this.addBalanceDetail = function (objdata: any) {
      this.nttcomptebalancedetails.push(objdata);
      let DetailCount = 0;
      let TotalSoldeDebit = 0;
      let TotalSoldeCredit = 0;

      TotalSoldeDebit += isNum(this.soldeDebit);
      TotalSoldeCredit += isNum(this.soldeCredit);
      DetailCount = this.nttcomptebalancedetails.length;

      return {
        TotalSoldeDebit: TotalSoldeDebit,
        TotalSoldeCredit: TotalSoldeCredit,
        DetailCount: DetailCount,
      };

    };
    this.hasitem = function (objdata) {
      return this.nttcomptebalancedetails.indexOf(objdata) !== -1;

    };
    this.removeItem = function (objdata) {
      const itemIndex = this.nttcomptebalancedetails.indexOf(objdata);
      if (itemIndex !== -1) {
        this.nttcomptebalancedetails.splice(itemIndex, 1);
      }
    };

    // var getData;
    this.getData = function () {
      return {
        'nttcomptebalanceKey': this.nttcomptebalanceKey,
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
        'nttcomptebalancedetails': this.nttcomptebalancedetails.slice()
      };
    };
  }


}
