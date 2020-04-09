"use strict";
const path = require('path');

const { find, map, assign, filter, forEach } = require('lodash');
const { isValid, odauditObj, getStringValue, replaceNullToZero } = require('../../SharedKernel/odaUtility').toinit();

const objQryParams = (function () {
 let d = new Date();
 function GetDSLookup(o) {
  return o.CompteNumber === '52' && o.RefCode === 'DS' && o.StableauName === 'tblBilanPassif';
 }
 function GetDSFiltered(o, obj) {
  return ((o.OreferenceKey === obj.OreferenceKey && o.SoldeCredit > 0)
   && (o.OreferenceKey !== obj.OreferenceKey && o.OtableauposteKey !== obj.OtableauposteKey));
 }

 function GetBSLookup(o) {
  return o.CompteNumber === '52' && o.RefCode === 'BS' && o.StableauName === 'tblBilanActif';
 }
 function GetBSFiltered(o, obj) {
  return ((o.OreferenceKey === obj.OreferenceKey && o.SoldeDebit > 0)
  && (o.OreferenceKey !== obj.OreferenceKey || o.OtableauposteKey !== obj.OtableauposteKey));

 }
 function GetCIFiltered(o, obj, oo) {
   return (o.OreferenceKey === obj.OreferenceKey
     || o.OreferenceKey === oo.OreferenceKey);
 }
 const toUpdateDS = function (nstbalance, ocomptreference) {
  let DSLookup,
  DSFilteredData,
  DSUpdateObject,
  DSObjectudate;
  if (isValid(nstbalance) === true && isValid(ocomptreference) === true) {
   const obj = find(ocomptreference, function (o) {
     return GetDSLookup(o);
    });
   DSLookup = function () {
    return obj;
   };
   DSFilteredData = function () {
    const validate = filter(nstbalance, function (o) {
      return GetDSFiltered(o, obj);
     });
    return validate;
   };
   DSUpdateObject = function () {
    if (isValid(obj) === true) {
     return {
      "OreferenceKey": obj.OreferenceKey,
      "OtableauposteKey": obj.OtableauposteKey,
      "ModifiedOn": d
     };
    }
   };
   DSObjectudate = function () {
    return {
    arrArg: DSFilteredData(),
    odaObjupd: DSUpdateObject(),
    DSLookup: DSLookup()
    };
   };
   return {
    DSObjectudate: DSObjectudate

   };

  } else {
   return new Error(
    'Invalid data');
  }

 };
 const toUpdateBS = function (nstbalance, ocomptreference) {
  let BSLookup,
  BSFilteredData,
  BSUpdateObject,
  BSObjectudate;
  if (isValid(nstbalance) === true && isValid(ocomptreference) === true) {
   const obj = find(ocomptreference, function (o) {
     return GetBSLookup(o);
    });
   BSLookup = function () {
    return obj;
   };
   BSFilteredData = function () {
    const validate = filter(nstbalance, function (o) {
      return GetBSFiltered(o, obj);
     });
    return validate;
   };
   BSUpdateObject = function () {
    if (isValid(obj) === true) {
     return {
      "OreferenceKey": obj.OreferenceKey,
      "OtableauposteKey": obj.OtableauposteKey,
      "ModifiedOn": d
     };
    }
   };
   BSObjectudate = function () {
    return {
    arrArg: BSFilteredData(),
    odaObjupd: BSUpdateObject(),
    odalookup: BSLookup()
    };
   };
   return {
    BSObjectudate: BSObjectudate

   };

  } else {
   return new Error(
    'Invalid data');
  }

 };
 const toUpdateCH = function (nstbalance, ocomptreference) {
  let CILookup,
  CIFilteredData,
  CHUpdateObject,
  CHObjectUpDate,
  CHLookup,
  result = {};
  if (isValid(nstbalance) === true && isValid(ocomptreference) === true) {
   const objch = find(ocomptreference, function (o) {
     return o.RefCode === 'CH';
    });
   const obj = find(ocomptreference, function (o) {
     return (o.RefCode === 'CI' && o.CompteNumber === '131');
    });
   const oo = find(ocomptreference, function (o) {
     return (o.RefCode === 'CI' && o.CompteNumber === '139');
    });
   CHLookup = function () {
    return objch;
   };
   CILookup = function () {
    return obj;
   };
   CIFilteredData = function () {
    const validate = filter(nstbalance, function (o) {
      return GetCIFiltered(o, obj, oo);
     });
    return validate;
   };
   CHUpdateObject = function () {
    if (isValid(result) === true) { {
      result.OreferenceKey = objch.OreferenceKey,
      result.IntitulCompte = objch.Description,
   //result.OcompteKey = objch.OcompteKey,
      result.NumCompte = objch.CompteNumber,
      result.ModifiedOn = d;
     }
    }
    return result;
   };
   CHObjectUpDate = function () {
    return {
      arrArg: CIFilteredData(),
     odaObjupd: CHUpdateObject(),
     CILookup: CILookup(),
     CHLookup: CHLookup()
    };
   };
   return {
    CHObjectUpDate: CHObjectUpDate

   };

  } else {
   return new Error(
    'Invalid data');
  }

 };
 const toupdateChgCredit = function (nstbalance, ocomptreference) {
  let ChgCreditLookup,
  ChgCreditFilteredData,
  ChgCreditObjectUpdate;
  if (isValid(nstbalance) === true && isValid(ocomptreference) === true) {
   const obj = find(ocomptreference, function (o) {
     return o.StableauName === 'tblResultChrges';
    });

   ChgCreditLookup = function () {
    return obj;
   };
   ChgCreditFilteredData = function () {
    const validate = filter(nstbalance, function (o) {
      return ((o.OtableauposteKey === obj.OtableauposteKey && o.SoldeCredit > 0));
     });
    const oarray = map(validate, function (elm) {
      return {
       'id': elm.id,
       "SoldeDebit": elm.SoldeCredit * (-1),
       "SoldeCredit": 0,
       "ModifiedOn": d
      };
     });
    return oarray;
   };
    ChgCreditObjectUpdate = function () {
    return {
      arrArg: ChgCreditFilteredData(),
     //  ChgCreditUpdateObject: ChgCreditUpdateObject(),
     ChgCreditLookup: ChgCreditLookup(),
    };
   };
   return {
    ChgCreditObjectUpdate: ChgCreditObjectUpdate

   };

  } else {
   return new Error(
    'Invalid data');
  }

 };
 const toupdatePrdtDebit = function (nstbalance, ocomptreference) {
  let PrdtDebitLookup,
  PrdtDebitFilteredData,
  PrdtDebitObjectUpdate;

  if (isValid(nstbalance) === true && isValid(ocomptreference) === true) {
   const obj = find(ocomptreference, function (o) {
     return o.StableauName === 'tblResultPrdts';
    });

   PrdtDebitLookup = function () {
    return obj;
   };
   PrdtDebitFilteredData = function () {
    const validate = filter(nstbalance, function (o) {
      return ((o.OtableauposteKey === obj.OtableauposteKey && o.SoldeDebit > 0));
     });
    const oarray = map(validate, function (elm) {
      return {
       'id': elm.id,
       "SoldeCredit": elm.SoldeDebit * (-1),
       "SoldeDebit": 0,
       "ModifiedOn": d
      };

     });
    return oarray;
   };

   PrdtDebitObjectUpdate = function () {
    return {
      arrArg: PrdtDebitFilteredData(),
     //    PrdtDebitUpdateObject: PrdtDebitUpdateObject(),
     PrdtDebitLookup: PrdtDebitLookup(),
    };
   };
   return {
    PrdtDebitObjectUpdate: PrdtDebitObjectUpdate

   };

  } else {
   return new Error(
    'Invalid data');
  }

 };
 const toupdateBPassif = function (nstbalance, ocomptreference) {
  let BPassifLookup,
  BPassifFilteredData,
  BPassifObjectUpdate;

  if (isValid(nstbalance) === true && isValid(ocomptreference) === true) {
   const obj = find(ocomptreference, function (o) {
     return o.StableauName === 'tblBilanPassif';
    });

   BPassifLookup = function () {
    return obj;
   };
   BPassifFilteredData = function () {
    const validate = filter(nstbalance, function (o) {
      return ((o.OtableauposteKey === obj.OtableauposteKey && o.SoldeDebit > 0));
     });
     const oarray = map(validate, function (elm) {
      return {
       'id': elm.id,
       "SoldeCredit": elm.SoldeDebit * (-1),
       "SoldeDebit": 0,
       "ModifiedOn": d
      };

     });
    return oarray;
   };

   BPassifObjectUpdate = function () {
    return {
      arrArg: BPassifFilteredData(),
     BPassifLookup: BPassifLookup(),
    };
   };
   return {
    BPassifObjectUpdate: BPassifObjectUpdate

   };

  } else {
   return new Error(
    'Invalid data');
  }

 };

 function toinit() {
  return {
   toUpdateDS: toUpdateDS,
   toUpdateBS: toUpdateBS,
   toUpdateCH: toUpdateCH,
   toUpdateChgCredit: toupdateChgCredit,
   toUpdatePrdtDebit: toupdatePrdtDebit,
   toUpdateBPassif: toupdateBPassif
  };
 }

 return {
  toinit: toinit
 };

})();
module.exports = {
 toinit: objQryParams.toinit
};
