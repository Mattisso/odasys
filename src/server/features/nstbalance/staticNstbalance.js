"use strict";
const { find, map, assign } = require('lodash');
const { isValid, odauditObj, getStringValue, replaceNullToZero ,odaremoveDupnumcompte, odareduceArray,addItem} = require('../../SharedKernel/odaUtility').toinit();
const staticNstbalance = (function () {
  const tonstbalance = function (o) {
    return ({
      "OreferenceKey": o.OreferenceKey,
      "OtableauposteKey": o.OtableauposteKey,
      "OexercComptaKey": o.OexercComptaKey,
 //     "OcompteKey": o.OcompteKey,
      "NumCompte": o.NumCompte,
      "IntitulCompte": o.IntitulCompte,
      "SoldeCredit": replaceNullToZero(o.SoldeCredit),
      "SoldeDebit": replaceNullToZero(o.SoldeDebit)
      // "id":obj.id
    });
};


  let balanceinputs = null;
  function BuildNstbalance(model,body, fn) {
    let toacreateinstance=fn;
    balanceinputs =toacreateinstance(model,body,tonstbalance);
    const arr = addItem(balanceinputs);
    return odareduceArray(arr);
  }


        function toInitNstbalanceInstance(model,body,fn) {
          const getCreatedModel = BuildNstbalance(model,body,fn);
return odaremoveDupnumcompte(getCreatedModel.slice());

     }


  const togetnstbalance = function (argOne) {
    let initObj,
    odauditobj;
    return map(argOne, function (obj) {
      initObj = {
        "id": obj.id,
        "OreferenceKey": getStringValue(obj.OreferenceKey),
        "OtableauposteKey": getStringValue(obj.OtableauposteKey),
        "OexercComptaKey": getStringValue(obj.OexercComptaKey),
      //  "OcompteKey": getStringValue(obj.OcompteKey),
        "NumCompte": obj.NumCompte,
        "IntitulCompte": obj.IntitulCompte,
        "SoldeCredit": obj.SoldeCredit,
        "SoldeDebit": obj.SoldeDebit
      };
      odauditobj = odauditObj(obj);
      return assign({}, initObj, odauditobj);
    });
  };

  function queryselector(obj) {
    let selector;
    if (isValid(obj.OreferenceKey) === true
    && (isValid(obj.OtableauposteKey) === true)
    && isValid(obj.OexercComptaKey) === true) {
      selector = true;
    } else {
      selector = false;
    }
    return selector;
  }
  const toupdObjCH= function(result, obj) {
    if(isValid(result)===true) {
      {
        result.OreferenceKey= obj.OreferenceKey,
        result.IntitulCompte= obj.Description,
        result.OcompteKey= obj.OcompteKey,
        result.NumCompte= obj.CompteNumber;
      }
    }
return result;
  };
  function toUpdatenstbalancedata (requestBody) {
    let d = new Date(), result={};
    if (result) {
    {
          result.id= requestBody.id,
          result.OreferenceKey= requestBody.OreferenceKey,
          result.OtableauposteKey= requestBody.OtableauposteKey,
          result.OexercComptaKey= requestBody.OexercComptaKey,
        //  result.OcompteKey= requestBody.OcompteKey,
          result.NumCompte= requestBody.NumCompte,
          result.IntitulCompte= requestBody.IntitulCompte,
          result.SoldeCredit= requestBody.SoldeCredit,
          result.SoldeDebit= requestBody.SoldeDebit,
      result.ModifiedOn = d;

    }
  }
  return result;
  }
  const getobjnstBalance = function (arr, value) {
    if (isValid(value) === true) {
      const validate = find(arr, function (o) {
        return o.NumCompte === getStringValue(value)
          || o.IntitulCompte === getStringValue(value)
          || o.OreferenceKey === getStringValue(value)
          || o.OtableauposteKey === getStringValue(value)
          || o.OexercComptaKey === getStringValue(value)
          || o.id === getStringValue(value);
      });
      return {
        odaObject: function () {
          return validate;
        }
      };
    } else {
      return new Error(
        `Invalid  ${value}`);
    }
  };
  function toinit() {
    return {
      togetnstbalance: togetnstbalance,
      tonstbalance: tonstbalance,
      toupdObjCH:toupdObjCH,
      queryselector:queryselector,
      getobjnstBalance:getobjnstBalance,
      toUpdatenstbalancedata:toUpdatenstbalancedata,
      toInitNstbalanceInstance:toInitNstbalanceInstance
    };
  }

  return {
    toinit: toinit
  };

})();
module.exports = {
  toinit: staticNstbalance.toinit
};
