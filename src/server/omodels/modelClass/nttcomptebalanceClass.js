"use strict";
const mongoose = require('mongoose'),
ObjectId = mongoose.SchemaTypes.ObjectId;
//const {toapicreateinstance}=require('../../sharedkernel/odainstance/toOdaInstance').toinit()
//const {nttCompteBalance}=require('../modelsSchema/nttcomptebalance').toinit().nttCompteBalance;

const {replaceNullToZero, odaremoveDupnumcompte} = require('../../sharedkernel/odaUtility').toinit();
const {getTotalCount, getTotalSoldedebit, getTotalSoldecredit}=require('../../sharedkernel/odaStats').toinit();

const nttcomptebalanceClass=(function(){
	let getdetailsData=[];

    const modelObject = {
		OexercComptaKey: {
			type: ObjectId,
			ref: 'oExercCompta',
		},
		OtableauposteKey: {
			type: ObjectId,
			ref: 'oTableauPoste',
		},
		OreferenceKey: {
			type: ObjectId,
			ref: 'oReference'
		},
		totalSoldeDebit: {
			type: Number,
		default:
			0
		},

		totalSoldeCredit: {
			type: Number,
		default:
			0
		},

		amntNet: {
			type: Number,
		default:
			0
		}

	};


class nttcomptebalanceClass {

	constructor(OexercComptaKey, OtableauposteKey, OreferenceKey, totalSoldeDebit = 0, totalSoldeCredit = 0, amntNet = 0,nttcomptebalancedetails=[]) {

		this._OexercComptaKey = OexercComptaKey;
		this._OtableauposteKey = OtableauposteKey;
		this._OreferenceKey = OreferenceKey;
		this._totalSoldeDebit = totalSoldeDebit;
		this._totalSoldeCredit = totalSoldeCredit;
		this._amntNet = amntNet;
		this._nttcomptebalancedetails = nttcomptebalancedetails;
	}
	get amntnet() {
		return this._amntNet;
	}
	set amntnet(amntNet) {
		this._amntNet = amntNet;
		return this;
	}

	get oreferencekey() {
		return this._OreferenceKey;
	}
	set oreferencekey(OreferenceKey) {
		this._OreferenceKey = OreferenceKey;
		return this;
	}

	get otableaupostekey() {
		return this._OtableauposteKey;
	}
	set otableaupostekey(OtableauposteKey) {
		this._OtableauposteKey = OtableauposteKey;
		return this;
	}

	get totalsoldedebit() {
		return this._totalSoldeDebit;
	}
	set totalsoldedebit(totalSoldeDebit) {
		this._totalSoldeDebit = totalSoldeDebit;
		return this;
	}

	get totalsoldecredit() {
		return this._totalSoldeCredit;
	}
	set totalsoldecredit(totalSoldeCredit) {
		this._totalSoldeCredit = totalSoldeCredit;
		return this;
	}

	get oexerccomptakey() {
		return this._OexercComptaKey;
	}
	set oexerccomptakey(OexercComptaKey) {
		this._OexercComptaKey = OexercComptaKey;
		return this;
	}

	addBalanceDetail(obj) {
				return  getdetailsData.push(
			({
				"nttcomptebalanceKey":this.id,
				"NumCompte": obj.NumCompte,
				"IntitulCompte": obj.IntitulCompte,
				"SoldeCredit": replaceNullToZero(obj.SoldeCredit),
				"SoldeDebit": replaceNullToZero(obj.SoldeDebit)
			})

				);
		}

	getData() {
			//const odasum =getodaAggreateData(nttcomptebalancedetails);
			//console.log(getdetailsData)
			return {

				"isActive": this.isActive,
				'_id': this._id,
				'OexercComptaKey': this.OexercComptaKey,
				'OtableauposteKey': this.OtableauposteKey,
				'OreferenceKey': this.OreferenceKey,
				'totalSoldeDebit': getTotalSoldedebit(getdetailsData),
				'totalSoldeCredit': getTotalSoldecredit( getdetailsData),
					'DetailCount': getTotalCount(odaremoveDupnumcompte(getdetailsData)),
				'id': this.id,
				'nttcomptebalancedetails': odaremoveDupnumcompte(getdetailsData.slice())
			};
		}

get nttcomptebalancedetails() {
		return this._nttcomptebalancedetails;
	}
	set nttcomptebalancedetails(nttcomptebalancedetails) {
		this._nttcomptebalancedetails = nttcomptebalancedetails?0: nttcomptebalancedetails;
		return this;
	}


hasitem (obj) {
  return this.nttcomptebalancedetails.indexOf(obj) !== -1;
}

/* removeItem (obj) {
  var itemIndex = nttcomptebalancedetails.indexOf(obj);
  if (itemIndex !== -1) {
    return   nttcomptebalancedetails.splice(itemIndex, 1);
  }
}; */

addcomptebalancedetail() {
return   getdetailsData.push({
    "nttcomptebalanceKey" : this.id,
    "NumCompte":  "",
    "IntitulCompte": "",
    "SoldeDebit": "",
    "SoldeCredit":""
  });
}
}



    function toinit(){
        return {
            modelObject: modelObject,
            nttcomptebalanceClass: nttcomptebalanceClass,
         //   toInitCompteBalanceInstance:toInitCompteBalanceInstance
        };
    }
    return {
        toinit:toinit
    };
})();
module.exports={
    toinit:nttcomptebalanceClass.toinit
};
