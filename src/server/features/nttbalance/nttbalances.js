//  async = require('async')
var Models = require('../../../omodels');

var nttbalance= (function () {


  var DetailCount = 0,
  TotalSoldeDebit = 0,
  TotalSoldeCredit = 0,
  _arrttBalances =[],
  balancevar;

function tottBalance (requestBody, callback) {
var getreference,
getoexercice,
getotableauposte;


  balancevar = new Models.nttBalance(
    {
      "OexercComptaKey" : requestBody.OexercComptaKey,
      "OtableauposteKey" : requestBody.OtableauposteKey,
      "OreferenceKey" : requestBody.OreferenceKey,
      "OcompteKey" : requestBody.OcompteKey,
      "NumCompte" : requestBody.NumCompte,
      "IntitulCompte": requestBody.IntitulCompte,
      "SoldeDebit": requestBody.SoldeDebit,
      "SoldeCredit": requestBody.SoldeCredit
    });


   return balancevar;
}


function toUpdatettBalance (result, requestparamid, requestBody) {
  var d = new Date();

if (result) {
  {
    result._id = requestparamid,
    result.OexercComptaKey = requestBody.OexercComptaKey,
    result.OtableauposteKey = requestBody.OtableauposteKey,
    result.OreferenceKey = requestBody.OreferenceKey,
    result.OcompteKey = requestBody.OcompteKey,
    result.NumCompte = requestBody.NumCompte,
    result.IntitulCompte= requestBody.IntitulCompte,
    result.SoldeDebit= requestBody.SoldeDebit,
    result.SoldeCredit = requestBody.SoldeCredit,
    result.ModifiedOn = d;

  }
}
return result;
}

function getUpdatettBalance (result,  requestBody) {
 // var d = new Date();

if (result) {
  {

   // result.OexercComptaKey = requestBody.OexercComptaKey,
    result.OtableauposteKey = requestBody.OtableauposteKey,
    result.OreferenceKey = requestBody.OreferenceKey;
  //  result.OcompteKey = requestBody.OcompteKey,
   // result.NumCompte = requestBody.NumCompte,
   // result.IntitulCompte= requestBody.IntitulCompte,
  //  result.SoldeDebit= requestBody.SoldeDebit,
 //   result.SoldeCredit = requestBody.SoldeCredit,
  //  result.ModifiedOn = d;

  }
}
return result;
}


function BuildnttBalance(requestBody) {

  var ttBalancedata = tottBalance(requestBody);

  // console.log(JSON.stringify(ttBalancedata));
    _arrttBalances.push(ttBalancedata);

    if (ttBalancedata.SoldeCredit !== undefined  && ttBalancedata.SoldeCredit !== null ) {
      TotalSoldeCredit += ttBalancedata.SoldeCredit;

    }

    if (ttBalancedata.SoldeDebit !== undefined  && ttBalancedata.SoldeDebit !== null ) {
      TotalSoldeDebit += ttBalancedata.SoldeDebit;

    }

DetailCount = _arrttBalances.length;

return {
  TotalSoldeDebit: TotalSoldeDebit,
	TotalSoldeCredit: TotalSoldeCredit,
  DetailCount: DetailCount,
  ttBalancedata:ttBalancedata,
 _arrttBalances:_arrttBalances.slice()

};

  }

  function  toInitializeInstance(body)  {
    var ttBalancedata = BuildnttBalance(body);

    return {
      'totalSoldeDebit': ttBalancedata.TotalSoldeDebit,
      'totalSoldeCredit': ttBalancedata.TotalSoldeCredit,
      'DetailCount': ttBalancedata.DetailCount,
      '_arrttBalances':   ttBalancedata._arrttBalances.slice()
    };


  }



function hasitem (obj) {
return this._arrttBalances.indexOf(obj) !== -1;

}

function removeItem (obj) {
var itemIndex = _arrttBalances.indexOf(obj);
if (itemIndex !== -1) {
  _arrttBalances.splice(itemIndex, 1);
}
}


function  addNewttBalance() {
_arrttBalances.push({
  "OexercComptaKey":"",
  "OtableauposteKey":"",
  "OreferenceKey":"",
  "OcompteKey":"",
  "NumCompte": "",
  "IntitulCompte": "",
  "SoldeDebit": "",
  "SoldeCredit": ""
});
// this._arrttBalances.slice();
}


function getTotalSoldedebit() {
// let totalSoldedebit = 0;
for (const item of _arrttBalances) {
  if (item.SoldeDebit !== undefined  && item.SoldeDebit !== null )  {
    TotalSoldeDebit += item.SoldeDebit;
    break;
  }
}

return TotalSoldeDebit;
}

function getTotalSoldecredit () {


for (const item of _arrttBalances) {
  if (item.SoldeCredit !== undefined  && item.SoldeCredit !== null ) {
    TotalSoldeCredit += item.SoldeCredit;
    break;
  }
  return TotalSoldeCredit;
}
}

function getTotalCount () {

    if (_arrttBalances.length !== undefined && _arrttBalances.length>0) {

      return _arrttBalances.length;

    }

  }

function getData () {

return {
  'totalSoldeDebit': getTotalSoldedebit(),
  'totalSoldeCredit': getTotalSoldecredit(),
  'DetailCount': getTotalCount(),
  '_arrttBalances':   _arrttBalances.slice()
};
}



function toinit() {

  return {
    toInitializeInstance:toInitializeInstance,
    tottBalance:tottBalance,
    BuildnstBalance:BuildnttBalance,
    getData:getData,
    hasitem:hasitem,
    removeItem:removeItem,
    addNewttBalance:addNewttBalance,
    toUpdatettBalance:toUpdatettBalance,
    getUpdatettBalance:getUpdatettBalance
  };

}


return {
  toinit: toinit
};




})();
module.exports= {
toinit:nttbalance.toinit
};
