export interface INttcomptebalance {
  id: string;
  OexercComptaKey?: string;
  oexercCompta ?: string;
  OtableauposteKey?: string;
  otableauposte?: string;
  OreferenceKey?: string;
  oreference ?: string;
  totalSoldeDebit?: number;
  totalSoldeCredit?: number;
  nttcomptebalancedetails? : [];
}

export interface INttcomptebalancedetail {
  id: string;
  nttcomptebalanceKey?: string;
  NumCompte: string;
  IntitulCompte: string;
  SoldeDebit?: number;
  SoldeCredit?: number;
}
export class Nttcomptebalance implements INttcomptebalance {
  addBalanceDetail: (objdata: any) => any;
  hasitem: (objdata: any) => boolean;
  removeItem: (objdata: any) => void;
  getData: () => void;
  OexercComptaKey: string;
  OtableauposteKey: string;
  OreferenceKey: string;
  oexercCompta: string;
  otableauposte: string;
  oreference: string;
  id: string;
   totalSoldeDebit?: number; totalSoldeCredit?: number;
   nttcomptebalancedetails?: [];
  CreatedOn?: Date; ModifiedOn?: Date;

  constructor(id: string, oexercComptaKey: string, otableauposteKey: string, oexercCompta: string,
    otableauposte: string,    oreference: string
    , oreferenceKey: string, totalSoldeDebit?: number, totalSoldeCredit?: number, nttcomptebalancedetails?: []) {
    this.id = id;
    this.OexercComptaKey = oexercComptaKey;
    this.OtableauposteKey = otableauposteKey;
    this.OreferenceKey = oreferenceKey;
    this.oexercCompta = oexercCompta;
    this.otableauposte = otableauposte;
    this.oreference = oreference;
    this.totalSoldeDebit = totalSoldeDebit;
    this.totalSoldeCredit = totalSoldeCredit;
    this.nttcomptebalancedetails = nttcomptebalancedetails;

    function isNum(value: any): number {
      if (isNaN(value)) {
        value = 0;
      } else {
        return value;
      }
    }
    let DetailCount = 0;
    let TotalSoldeDebit = 0;
    let TotalSoldeCredit = 0;

function getTotalSoldedebit() {
  //  let TotalSoldeDebit = 0;
     for (const item of nttcomptebalancedetails) {
         if (item['SoldeDebit'] !== undefined) {
           TotalSoldeDebit += item['SoldeDebit'];
             break;
         }
     }

     return TotalSoldeDebit;
   }
   function getTotalSoldecredit () {
    for (const item of nttcomptebalancedetails) {
        if (item['SoldeCredit'] !== undefined) {
          TotalSoldeCredit += item['SoldeCredit'];
            break;
        }
        return TotalSoldeCredit;
    }
  }

    this.addBalanceDetail = function(objdata) {
      this.nttcomptebalancedetails.push({
        'nttcomptebalanceKey': this.id,
        'NumCompte': objdata.numcompte,
        'IntitulCompte': objdata.intitulCompte,
        'SoldeDebit': objdata.SoldeDebit,
        'SoldeCredit': objdata.SoldeCredit
      });
      TotalSoldeDebit += isNum(objdata.SoldeDebit);
      TotalSoldeCredit += isNum(objdata.SoldeCredit);
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

    this.getData = function () {
      return {
        'OexercComptaKey': this.oexercComptaKey,
        'OtableauposteKey': this.otableauposteKey,
        'OreferenceKey': this.oreferenceKey,
        'totalSoldeDebit': this.totalSoldeDebit,
        'totalSoldeCredit': this.totalSoldeCredit,
        'TotalSoldeDebit': this.TotalSoldeDebit,
        'TotalSoldeCredit': this.TotalSoldeCredit,
        'DetailCount': this.DetailCount,
        'nttcomptebalancedetails': nttcomptebalancedetails.slice()
      };
    };
  }


}
