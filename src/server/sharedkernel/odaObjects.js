"use strict";
const _ = require('lodash');
const {isValid, odauditObj, replaceNullToZero,getStringValue}=require('./odaUtility').toinit();

const odaObjects = (function () {

  const getAmortAmnt = function (_obj) {
    let _AmortAmnt = 0;
    if ((isValid(_obj.StableauName) === true) && _obj.StableauName == 'tblAmortImmo') {
      _AmortAmnt = _obj.SoldeCredit ? _obj.SoldeCredit : 0;
    }
    return replaceNullToZero(_AmortAmnt);
  };
  const getSoldeCredit = function (_obj) {
    let _SoldeCredit = 0;
    if ((isValid(_obj.SoldeCredit) === true) && _obj.StableauName !== 'tblProvision'
       || (isValid(_obj.StableauName) === true) && _obj.StableauName !== 'tblAmortImmo') {
      _SoldeCredit = _obj.SoldeCredit ? _obj.SoldeCredit : 0;
    }
    return replaceNullToZero(_SoldeCredit);

  };
  const getProvAmnt = function (_obj) {
    let _ProvAmnt = 0;
    if ((isValid(_obj.StableauName) === true) && _obj.StableauName == 'tblProvision') {
      _ProvAmnt = _obj.SoldeCredit ? _obj.SoldeCredit : 0;
    }
    return replaceNullToZero(_ProvAmnt);
  };
  const getSoldeDebit = function (_obj) {
    let _SoldeDebit = 0;
    if ((isValid(_obj.SoldeCredit) === true) && _obj.StableauName !== 'tblProvision'
       || (isValid(_obj.StableauName) === true) && _obj.StableauName !== 'tblAmortImmo') {
      _SoldeDebit = _obj.SoldeDebit ? _obj.SoldeDebit : 0;
    } else {
      _SoldeDebit = _obj.SoldeCredit;
    }
    return replaceNullToZero(_SoldeDebit);
  };
  const getAmountNet = function (_obj) {
    let _netamount = 0,
    _AmortAmnt = getAmortAmnt(_obj),
    _ProvAmnt = getProvAmnt(_obj),
    _SoldeDebit = getSoldeDebit(_obj),
    _SoldeCredit = getSoldeCredit(_obj);
    if (_SoldeDebit > 0) {
      _netamount = _SoldeDebit - _AmortAmnt - _ProvAmnt;
    } else if (_SoldeCredit > 0) {
      _netamount = _SoldeCredit - _SoldeDebit;
    } else {
      _netamount = 0;
    }
    return Math.abs(_netamount);
  };
  const togetoexercice = function (argOne) {
    let initObj,
    odauditobj;
    return _.map(argOne, function (obj) {
      initObj = {
        "id": obj.id,
        "OexercComptaKey": obj.OexercComptaKey,
        "oExerciceEncour": obj.oExerciceEncour,
        "ExercicePrev": obj.ExercicePrev
      };
      odauditobj = odauditObj(obj);
      return _.assign({}, initObj, odauditobj);
    });
  };
  const togetoexerccompta = function (argOne) {
    let initObj,
    odauditobj;
    return _.map(argOne, function (obj) {
      initObj = {
        "id": obj.id,
        "oExercComptaId": obj.oExercComptaId,
        "DateDebut": obj.DateDebut,
        "Datefin": obj.Datefin,
        "Cloture": obj.Cloture
      };
      odauditobj = odauditObj(obj);
      return _.assign({}, initObj, odauditobj);
    });
  };
  const togetocompte = function (argOne) {
    let initObj,
    odauditobj;
    return _.map(argOne, function (obj) {
      initObj = {
        "id": obj.id,
        "CompteNumber": obj.CompteNumber
      };
      odauditobj = odauditObj(obj);
      return _.assign({}, initObj, odauditobj);
    });
  };
  const togetoreference = function (argOne) {
    let initObj,
    odauditobj;
    return _.map(argOne, function (obj) {
      initObj = {
        "id": obj.id,
        "RefCode": obj.RefCode,
        "Description": obj.Description,
        "fullDescription": obj.fullDescription
        //"ocomptes": obj.ocomptes
      };
      return _.map(obj.ocomptes, function (ocompte) {
        var _tobj = {
          "OcompteKey": ocompte.id
        };
        odauditobj = odauditObj(obj);
        return _.assign({}, initObj, _tobj, odauditobj);
      });
    });
  };
  const togetostblarea = function (argOne) {
    let initObj,
    odauditobj;
    return _.map(argOne, function (obj) {
      initObj = {
        "id": obj.id,
        "AreaShortName": obj.AreaShortName,
        "AreaLongName": obj.AreaLongName,
      };
      return _.map(obj.ocomptes, function (ocompte) {
        var _tobj = {
          "OcompteKey": ocompte.id
        };
        odauditobj = odauditObj(obj);
        return _.assign({}, initObj, _tobj, odauditobj);
      });
      //return _.assign({}, initObj, odauditobj);
    });
  };
  const togetObjnstbalance = function (sobj) {
    return {
      "OcompteKey": sobj.OcompteKey,
      "TableauName": sobj.TableauName,
      "RefCode": sobj.RefCode,
      "OreferenceKey": sobj.OreferenceKey,
      "OtableauposteKey": sobj.OtableauposteKey,
      "OexercComptaKey": sobj.OexercComptaKey,
      "Exception": sobj.Exception,
      "Taux": sobj.Taux,
      "CompteNumber": sobj.CompteNumber,
      "Description": sobj.Description,
      "fullDescription": sobj.fullDescription,
      "nstbalanceinputKey": sobj.nstbalanceinputKey,
      "NumCompte": sobj.NumCompte,
      "IntitulCompte": sobj.IntitulCompte,
      "SoldeCredit": sobj.SoldeCredit,
      "SoldeDebit": sobj.SoldeDebit
    };
  };
  const togetostableauposte = function (argOne) {
    let initObj,
    odauditobj;
    return _.map(argOne, function (obj) {
      initObj = {
        "id": obj.id,
        "StableauName": obj.StableauName,
        "StbleauLongName": obj.StbleauLongName
      };
      return _.map(obj.ostblareas, function (ostblarea) {
        var _tobj = {
          "OstblareaKey": ostblarea.id
        };
        odauditobj = odauditObj(obj);
        return _.assign({}, initObj, _tobj, odauditobj);
      });
      //return _.assign({}, initObj, odauditobj);
    });
  };
  const togetotableauposte = function (argOne) {
    let initObj,
    odauditobj;
    return _.map(argOne, function (obj) {
      initObj = {
        "id": obj.id,
        "TableauName": obj.TableauName,
        "tableauLongName": obj.tableauLongName
      };
      return _.map(obj.ostableaupostes, function (ostableauposte) {
        var _tobj = {
          "OstableauposteKey": ostableauposte.id
        };
        odauditobj = odauditObj(obj);
        return _.assign({}, initObj, _tobj, odauditobj);
      });
    });
  };
  const togetolevel = function (argOne) {
    let initObj,
    odauditobj;
    return _.map(argOne, function (obj) {
      initObj = {
        "id": obj.id,
        "olevelNum": obj.olevelNum,
        "olevelDescption": obj.olevelDescption
      };
      odauditobj = odauditObj(obj);
      return _.assign({}, initObj, odauditobj);

    });
  };
  const togetocomptereference = function (argOne) {
    let initObj,
    odauditobj;
    return _.map(argOne, function (obj) {
      initObj = {
        "id": obj.id,
        "OcompteKey": getStringValue(obj.OcompteKey),
        "OstblareaKey": getStringValue(obj.OstblareaKey),
        "OreferenceKey": getStringValue(obj.OreferenceKey),
        "OtableauposteKey": getStringValue(obj.OtableauposteKey),
        "OstableauposteKey": getStringValue(obj.OstableauposteKey),
        "Exception": obj.Exception,
        "Taux": obj.Taux
      };
      odauditobj = odauditObj(obj);
      return _.assign({}, initObj, odauditobj);
    });
  };
  const togetnstbalance = function (argOne) {
    let initObj,
    odauditobj;
    return _.map(argOne, function (obj) {
      initObj = {
        "id": obj.id,
        "OreferenceKey": obj.OreferenceKey,
        "OtableauposteKey": obj.OtableauposteKey,
        "OexercComptaKey": obj.OexercComptaKey,
        "OcompteKey": obj.OcompteKey,
        "NumCompte": obj.NumCompte,
        "IntitulCompte": obj.IntitulCompte,
        "SoldeCredit": replaceNullToZero(obj.SoldeCredit),
        "SoldeDebit": replaceNullToZero(obj.SoldeDebit)
      };
      odauditobj = odauditObj(obj);
      return _.assign({}, initObj, odauditobj);
    });
  };
  const togetnttbalance = function (argOne) {
    let initObj,
    odauditobj;
    return _.map(argOne, function (obj) {
      initObj = {
        "id": obj.id,
        "OreferenceKey": obj.OreferenceKey,
        "OtableauposteKey": obj.OtableauposteKey,
        "OexercComptaKey": obj.OexercComptaKey,
        "OcompteKey": obj.OcompteKey,
        "NumCompte": obj.NumCompte,
        "IntitulCompte": obj.IntitulCompte,
        "SoldeCredit": replaceNullToZero(obj.SoldeCredit),
        "SoldeDebit": replaceNullToZero(obj.SoldeDebit)
      };
      odauditobj = odauditObj(obj);
      return _.assign({}, initObj, odauditobj);

    });
  };
  const togetnttcomptebalance = function (argOne) {
    let initObj,
    odauditobj;
    return _.map(argOne, function (obj) {
      initObj = {
        "id": obj.id,
        // "nttcomptebalanceKey": obj.id,
        "OreferenceKey": getStringValue(obj.OreferenceKey),
        "OtableauposteKey": getStringValue(obj.OtableauposteKey),
        "OexercComptaKey": getStringValue(obj.OexercComptaKey),
        "totalSoldeCredit": (obj.totalSoldeCredit),
        "totalSoldeDebit": (obj.totalSoldeDebit),
        "AmountNet": (obj.AmountNet),
      };
      odauditobj = odauditObj(obj);
      return _.assign({}, initObj, odauditobj);

    });
  };
  const togetnstbalanceinput = function (argOne) {
    let initObj,
    odauditobj;
    return _.map(argOne, function (obj) {
      initObj = {
        "id": obj.id,
        "NumCompte": obj.NumCompte,
        "IntitulCompte": obj.IntitulCompte,
        "SoldeCredit": obj.SoldeCredit ? obj.SoldeCredit : 0,
        "SoldeDebit": obj.SoldeDebit ? obj.SoldeDebit : 0,
        "CompteNumber": obj.CompteNumber
      };
      odauditobj = odauditObj(obj);
      return _.assign({}, initObj, odauditobj);

    });
  };
  const togetnttcomptebalanceDetail = function (argOne) {
    let initObj,
    odauditobj;
    return _.map(argOne, function (obj) {

      initObj = {
        "id": obj.id,
        "nttcomptebalanceKey": getStringValue(obj.nttcomptebalanceKey) ? getStringValue(obj.nttcomptebalanceKey) : getStringValue(obj.id),
        "NumCompte": obj.NumCompte,
        "IntitulCompte": obj.IntitulCompte,
        "SoldeCredit": replaceNullToZero(obj.SoldeCredit),
        "SoldeDebit": replaceNullToZero(obj.SoldeDebit),
      };
      odauditobj = odauditObj(obj);

      return _.assign({}, initObj, odauditobj);
    });

  };
  const togetoreportdetail = function (argOne) {
    let initObj,
    odauditobj;
    return _.map(argOne, function (obj) {
      initObj = {
        "id": obj.id,
        "OtableauposteKey": getStringValue(obj.OtableauposteKey),
        "OreferenceKey": getStringValue(obj.OreferenceKey),
        "olevelKey": getStringValue(obj.olevelKey),
        "SortOrder": obj.SortOrder
      };
      odauditobj = odauditObj(obj);

      return _.assign({}, initObj, odauditobj);
    });

  };
  const togetoreportheader = function (argOne) {
    let initObj,
    odauditobj;
    return _.map(argOne, function (obj) {
      initObj = {
        "id": obj.id,
        "OtableauposteKey": obj.OtableauposteKey,
        "OreferenceKey": obj.OreferenceKey,
        "SortOrderH": obj.SortOrderH
      };
      odauditobj = odauditObj(obj);

      return _.assign({}, initObj, odauditobj);
    });

  };
  function toinit() {
    return {
      togetnstbalanceinput: togetnstbalanceinput,
      togetoexercice: togetoexercice,
      togetotableauposte: togetotableauposte,
      togetocompte: togetocompte,
      togetoreference: togetoreference,
      togetostblarea: togetostblarea,
      togetostableauposte: togetostableauposte,
      togetnstbalance: togetnstbalance,
      togetnttbalance: togetnttbalance,
      togetnttcomptebalance: togetnttcomptebalance,
      togetnttcomptebalanceDetail: togetnttcomptebalanceDetail,
      togetocomptereference: togetocomptereference,
      togetolevel: togetolevel,
      togetoreportdetail: togetoreportdetail,
      togetoreportheader: togetoreportheader,
      togetObjnstbalance: togetObjnstbalance,
      togetoexerccompta: togetoexerccompta,
      odauditObj: odauditObj,
      replaceNullToZero: replaceNullToZero
    };
  }

  return {
    toinit: toinit
  };

})();
module.exports = {
  toinit: odaObjects.toinit
};
