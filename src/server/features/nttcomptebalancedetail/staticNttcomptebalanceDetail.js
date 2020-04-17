"use strict";
const { find, map, assign, filter, forEach } = require('lodash');
const { isValid, odauditObj, getStringValue, replaceNullToZero,odaremoveDupnumcompte, odareduceArray, addItem } = require('../../SharedKernel/odaUtility').toinit();
const { getodafilter } = require('../../SharedKernel/odaFiltered').toinit();
const { combineLatest, Observable, of, pipe, from } = require('rxjs');

const staticNttcomptebalance = (function () {
  const toCompteBalanceDetail = function (requestparamid, obj) {
    let isvalid = queryselector(obj);
    if (isvalid === true  && replaceNullToZero(obj.SoldeDebit)!==0
    || isvalid === true  && replaceNullToZero(obj.SoldeCredit)!==0 ) {
      return ({
        "nttcomptebalanceKey": requestparamid,
        "NumCompte": obj.NumCompte,
        "IntitulCompte": obj.IntitulCompte,
        "SoldeCredit": replaceNullToZero(obj.SoldeCredit),
        "SoldeDebit": replaceNullToZero(obj.SoldeDebit)
      });
    }
  };
  let toCreateModel = null;
  function BuildNttcomptebalancedetail(model,body, fn) {
    let toacreateinstance=fn;
    toCreateModel =toacreateinstance(model,body,toCompteBalanceDetail);
    const arr = addItem(toCreateModel);
    return odareduceArray(arr);
  }

        function toInitNttcomptebalancedetailInstance(model,body,fn) {
          const getCreatedModel = BuildNttcomptebalancedetail(model,body,fn);

          return odaremoveDupnumcompte(getCreatedModel.slice());

     }
  const togetnttcomptebalancedetail = function (argOne) {
    let initObj,
    odauditobj;
    return map(argOne, function (obj) {
      initObj = {
        "id": obj.id,
        "nttcomptebalanceKey": getStringValue(obj.nttcomptebalanceKey),
        "NumCompte": obj.NumCompte,
        "IntitulCompte": obj.IntitulCompte,
        "SoldeCredit": obj.SoldeCredit,
        "SoldeDebit": obj.SoldeDebit,
      };
      odauditobj = odauditObj(obj);
      return assign({}, initObj, odauditobj);
    });

  };
  function queryselector(obj) {
    let selector ;
    if (isValid(obj.NumCompte) === true && isValid(obj.IntitulCompte) === true
        || isValid(obj.NumCompte) === true
       && (isValid(obj.IntitulCompte) == true) ) {
      selector = true;
    } else {
      selector = false;
    }
    return selector;
  }

  const toLoadCompteBalanceDetail = function (obj) {
    let isvalid = queryselector(obj);
    if (isvalid === true  && (replaceNullToZero(obj.SoldeDebit))!==0
    || isvalid === true  && (replaceNullToZero(obj.SoldeCredit))!==0 ) {
      return ({
        "nttcomptebalanceKey": obj.nttcomptebalanceKey,
        "NumCompte": obj.NumCompte,
        "IntitulCompte": obj.IntitulCompte,
        "SoldeCredit": replaceNullToZero(obj.SoldeCredit),
        "SoldeDebit": replaceNullToZero(obj.SoldeDebit)
      });
    }
  };
  function toUpdateCompteBalanceDetail(body) {
    let d = new Date(), result={};
    if (result) {
      {
          result.id = body.id,
          result.nttcomptebalanceKey = body.nttcomptebalanceKey,
          result.NumCompte = body.NumCompte,
          result.IntitulCompte = body.IntitulCompte,
          result.SoldeDebit = body.SoldeDebit,
          result.SoldeCredit = body.SoldeCredit,
          result.ModifiedOn = d;
      }
    }
    return result;
  }
  const getobjnttcomptebalanceDetail = function (arr, value) {
    if (isValid(value) === true) {
      const validate = find(arr, function (o) {
          return o.NumCompte === getStringValue(value)
           || o.nttcomptebalanceDetailKey === getStringValue(value)
           || o.id === getStringValue(value)
           || o.nttcomptebalanceKey === getStringValue(value);
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
      toCompteBalanceDetail: toCompteBalanceDetail,
      togetnttcomptebalancedetail: togetnttcomptebalancedetail,
      toLoadCompteBalanceDetail:toLoadCompteBalanceDetail,
      toUpdateCompteBalanceDetail:toUpdateCompteBalanceDetail,
      getobjnttcomptebalanceDetail:getobjnttcomptebalanceDetail,
      toInitNttcomptebalancedetailInstance:toInitNttcomptebalancedetailInstance
    };
  }
  return {
    toinit: toinit
  };

})();
module.exports = {
  toinit: staticNttcomptebalance.toinit
};
