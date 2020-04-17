
"use strict";
const { find, map, assign, filter, forEach } = require('lodash');
const { isValid, odauditObj, getStringValue, replaceNullToZero,odaremoveDupnumcompte, odareduceArray,addItem } = require('../../SharedKernel/odaUtility').toinit();
const { getodafilter } = require('../../SharedKernel/odaFiltered').toinit();
const { combineLatest, Observable, of, pipe, from } = require('rxjs');

const staticNttbalance = (function () {
  const tonttbalance = function (obj) {
    if (isValid(obj) === true) {
    return ({
      "OreferenceKey": obj.OreferenceKey,
      "OtableauposteKey": obj.OtableauposteKey,
      "OexercComptaKey": obj.OexercComptaKey,
     // "OcompteKey": obj.OcompteKey,
      "NumCompte": obj.NumCompte,
      "IntitulCompte": obj.IntitulCompte,
      "SoldeCredit": replaceNullToZero(obj.SoldeCredit),
      "SoldeDebit": replaceNullToZero(obj.SoldeDebit)
      // "id":obj.id
    });
  }
  };

  let balanceinputs = null;
  function BuildNttbalance(model,body, fn) {
    let toacreateinstance=fn;
    balanceinputs =toacreateinstance(model,body,tonttbalance);
    const arr = addItem(balanceinputs);
    return odareduceArray(arr);
  }
    function toInitNttbalanceInstance(model,body,fn) {
    const getCreatedModel = BuildNttbalance(model,body,fn);
    return odaremoveDupnumcompte(getCreatedModel.slice());
    }

  const togetnttbalance = function (argOne) {
    let initObj,
    odauditobj;
    return map(argOne, function (obj) {
      initObj = {
        "id": obj.id,
        "OreferenceKey": getStringValue(obj.OreferenceKey),
        "OtableauposteKey": getStringValue(obj.OtableauposteKey),
        "OexercComptaKey": getStringValue(obj.OexercComptaKey),
    //    "OcompteKey": getStringValue(obj.OcompteKey),
        "NumCompte": obj.NumCompte,
        "IntitulCompte": obj.IntitulCompte,
        "SoldeCredit": obj.SoldeCredit,
        "SoldeDebit": obj.SoldeDebit
      };
      odauditobj = odauditObj(obj);
      return assign({}, initObj, odauditobj);
    });
  };

  const getobjnttBalance = function (arr, value) {
    if (isValid(value) === true) {
      const validate = find(arr, function (o) {
        return o.NumCompte === getStringValue(value)
          || o.IntitulCompte === getStringValue(value)
          || o.OcompteKey === getStringValue(value)
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
  function toUpdatenttbalancedata (requestBody) {
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
  function toinit() {
    return {
      togetnttbalance: togetnttbalance,
      tonttbalance: tonttbalance,
      getobjnttBalance:getobjnttBalance,
      toUpdatenttbalancedata:toUpdatenttbalancedata,
      toInitNttbalanceInstance:toInitNttbalanceInstance

    };
  }

  return {
    toinit: toinit
  };

})();
module.exports = {
  toinit: staticNttbalance.toinit
};
