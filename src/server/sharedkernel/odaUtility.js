"use strict";
const {remove,isEmpty, isUndefined, isNull, toString, toNumber, reject, forEach, isArray, flattenDeep, difference, maxBy,map, ary, parseInt} = require('lodash');
const odaUtility = (function () {
const removeodauditobj = ['CreatedBy', 'ModifiedOn', 'ModifiedBy', 'CreatedOn', 'id'];



const  addItem = function(item)  {
  let arr=[];
  if (!hasitem(item, arr))
  arr.push(item);
  return arr;
  };
const odareomoveInvalidObject = function(arr,fn){
  return remove(arr, function(n) {
    return fn(n)===true;
  });
};
const odaremoveDupnumcompte = function (array) {
  let arr , objKey;
   arr = array.filter(function (a) {
       objKey = a.NumCompte + '|' + a.SoldeDebit + '|' + a.SoldeCredit;
      if (!this[objKey]) {
        this[objKey] = true;
        return true;
      }
    }, {});

  return arr;
};
  const isValid = function (val) {
    return !isUndefined(val) && !isNull(val);
  };
  const isnotempty = function (obj) {
    if (isEmpty(obj) === false) {
      return obj;
    }
  };
  const replaceNullToZero = function (val) {
    if (isNaN(val)) {
      return 0;
    }
    return val;
  };
  const oarray = function (array) {
    var passed = [];
    for (var i = 0; i < array.length; i++) {
      if (!hasitem(array[i],passed))
        passed.push(array[i]);
    }
    return passed;
  };

  function hasitem (obj, arr) {
    return arr.indexOf(obj) != -1;
  }

  const odauditObj = function (obj) {
    return {
      "CreatedOn": obj.CreatedOn,
      "ModifiedOn": obj.ModifiedOn,
      "CreatedBy": obj.CreatedBy,
      "ModifiedBy": obj.ModifiedBy
    };
  };

  function _remove(n) {
    return (n !== undefined && n !== null && n !== '');
  }
  function odaremoveFromArr(array) {
    return remove(array, function (obj) {
      if (_remove(obj) === true)
        return obj;
      //  return (n !== undefined && n !== null && n !== '');
    });
  }

  function odaremoveObj(obj) {
    if (_remove(obj) === true)
      return obj;
  }

  const odaremove = function (obj) {
    if (inArray(obj) === false && isValid(obj) === true) {
      return odaremoveObj(obj);
    } else if (inArray(obj) === true && isValid(obj) === true) {
      return odaremoveFromArr(obj);
    } else {
      return;
    }
  };

   function inArray (value) {
    return isArray(value);
  }
  const getStringValue = function (value) {
    if (typeof value === 'object') {
      return toString(value);
    } else if (typeof value === 'string') {
      return toString(value);
    } else if (typeof value === 'number') {
      return toString(value);
    } else {
      return value;
    }
  };

  const getValue = function (value) {
    if (typeof value === 'object') {
      return toString(value).toLowerCase();
    } else if (typeof value === 'string') {
      return value.toString().toLowerCase();
    } else if (typeof value === 'number') {
      return toNumber(value);
    } else {
      return value;
    }
  };
  const odaRemoveObject = function (argone) {
    const filterArg = `${argone} removed!`;
    return filterArg;
  };
  const odaInsertObject = function (argone) {
    const filterArg = `${argone} Inserted!`;
    return filterArg;
  };
  const ConvertString = function (n) {
    let localVariable = n;
    return toString(localVariable);
  };
function odareduceArray(options) {
    return flattenDeep(odaremove(options));
  }

  var removeDupbalanceinputs = function (array) {
    var arr = array.filter(function (a) {
        var key = a.NumCompte + '|' + a.SoldeDebit + '|' + a.Exception + '|' + a.SoldeCredit;
        if (!this[key]) {
          this[key] = true;
          return true;
        }
      }, {});

    return arr;
  };

  const checkDuplicateInObject = function (propertyName, array) {
    var seenDuplicate = false,
    testObject = {};

    array.map(function (item) {
      var itemPropertyName = item[propertyName];
      if (itemPropertyName in testObject) {
        testObject[itemPropertyName].duplicate = true;
        item.duplicate = true;
        seenDuplicate = true;
      } else {
        testObject[itemPropertyName] = item;
        delete item.duplicate;
      }
    });

    return seenDuplicate;
  };

  const AssignedDuplicateToObject = function (prop, array) {
    const _array = removeDupbalanceinputs(array);
    const _unArray = [];
    forEach(_array, function (item) {
      var arfinddup = checkDuplicateInObject(prop, _array);
      var isPresent = _unArray.filter(function (elem) {
          return arfinddup == true && elem.NumCompte === item.NumCompte
           && elem.SoldeDebit === item.SoldeDebit
           && elem.SoldeCredit === item.SoldeCredit
           && elem.Exception === item.Exception;

        });

      if (isPresent.length == 0) {
        {
          _unArray.push(item);

        }

      }
    });
    return _unArray;
  };
  const SelectedDuplicateObject = function (prop, array) {
    let arr = [];
    const _array = AssignedDuplicateToObject(prop, array);
    forEach(_array, function (item) {
      if (item.duplicate === true && item.Exception === 1) {
        reject(_array, 'Exception');
        arr.push(item);
      }

    });

    return difference(_array, arr);
  };
  function toinit() {
    return {
      isValid: isValid,
      isnotempty: isnotempty,
      replaceNullToZero: replaceNullToZero,
      odauditObj: odauditObj,
      odaremove: odaremove,
      oarray: oarray,
      inArray: inArray,
      getStringValue: getStringValue,
      getValue: getValue,
      ConvertString: ConvertString,
      odareduceArray: odareduceArray,
      hasitem: hasitem,
      odaRemoveObject: odaRemoveObject,
      odaInsertObject: odaInsertObject,
      removeodauditobj: removeodauditobj,
      SelectedDuplicateObject: SelectedDuplicateObject,
      odaremoveDupnumcompte:odaremoveDupnumcompte,
      odareomoveInvalidObject:odareomoveInvalidObject,
      addItem:addItem
    };
  }

  return {
    toinit: toinit
  };

})();
module.exports = {
  toinit: odaUtility.toinit
};
