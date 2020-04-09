//  async = require('async')
var Models = require('../../../omodels');

var nststbalance= (function () {


  var DetailCount = 0,
  TotalSoldeDebit = 0,
  TotalSoldeCredit = 0,
  _arrstbalances =[],
  balancevar;

function tostbalance (requestBody, callback) {
var getreference,
getoexercice,
getotableauposte;


  balancevar = new Models.nstBalance(
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


function toUpdatestbalance (result, requestparamid, requestBody) {
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

function getUpdatestbalance (result,  requestBody) {
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


function BuildnstBalance(requestBody) {

  var stbalancedata = tostbalance(requestBody);

  // console.log(JSON.stringify(stbalancedata));
    _arrstbalances.push(stbalancedata);

    if (stbalancedata.SoldeCredit !== undefined  && stbalancedata.SoldeCredit !== null ) {
      TotalSoldeCredit += stbalancedata.SoldeCredit;

    }

    if (stbalancedata.SoldeDebit !== undefined  && stbalancedata.SoldeDebit !== null ) {
      TotalSoldeDebit += stbalancedata.SoldeDebit;

    }

DetailCount = _arrstbalances.length;

return {
  TotalSoldeDebit: TotalSoldeDebit,
	TotalSoldeCredit: TotalSoldeCredit,
  DetailCount: DetailCount,
  stbalancedata:stbalancedata,
 _arrstbalances:_arrstbalances.slice()

};

  }

  function  toInitializeInstance(body)  {
    var stbalancedata = BuildnstBalance(body);

    return {
      'totalSoldeDebit': stbalancedata.TotalSoldeDebit,
      'totalSoldeCredit': stbalancedata.TotalSoldeCredit,
      'DetailCount': stbalancedata.DetailCount,
      '_arrstbalances':   stbalancedata._arrstbalances.slice()
    };


  }



function hasitem (obj) {
return this._arrstbalances.indexOf(obj) !== -1;

}

function removeItem (obj) {
var itemIndex = _arrstbalances.indexOf(obj);
if (itemIndex !== -1) {
  _arrstbalances.splice(itemIndex, 1);
}
}


function  addNewstbalance() {
_arrstbalances.push({
  "OexercComptaKey":"",
  "OtableauposteKey":"",
  "OreferenceKey":"",
  "OcompteKey":"",
  "NumCompte": "",
  "IntitulCompte": "",
  "SoldeDebit": "",
  "SoldeCredit": ""
});
// this._arrstbalances.slice();
}


function getTotalSoldedebit() {
// let totalSoldedebit = 0;
for (const item of _arrstbalances) {
  if (item.SoldeDebit !== undefined  && item.SoldeDebit !== null )  {
    TotalSoldeDebit += item.SoldeDebit;
    break;
  }
}

return TotalSoldeDebit;
}

function getTotalSoldecredit () {


for (const item of _arrstbalances) {
  if (item.SoldeCredit !== undefined  && item.SoldeCredit !== null ) {
    TotalSoldeCredit += item.SoldeCredit;
    break;
  }
  return TotalSoldeCredit;
}
}

function getTotalCount () {

    if (_arrstbalances.length !== undefined && _arrstbalances.length>0) {

      return _arrstbalances.length;

    }

  }

function getData () {

return {
  'totalSoldeDebit': getTotalSoldedebit(),
  'totalSoldeCredit': getTotalSoldecredit(),
  'DetailCount': getTotalCount(),
  '_arrstbalances':   _arrstbalances.slice()
};
}



function toinit() {

  return {
    toInitializeInstance:toInitializeInstance,
    tostbalance:tostbalance,
    BuildnstBalance:BuildnstBalance,
    getData:getData,
    hasitem:hasitem,
    removeItem:removeItem,
    addNewstbalance:addNewstbalance,
    toUpdatestbalance:toUpdatestbalance,
    getUpdatestbalance:getUpdatestbalance
  };

}


return {
  toinit: toinit
};




})();
module.exports= {
toinit:nststbalance.toinit
};
