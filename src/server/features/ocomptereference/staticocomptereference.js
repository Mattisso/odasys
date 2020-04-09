
"use strict";
const { find, map, assign } = require('lodash');
const { isValid, getStringValue, odauditObj ,odaremoveDupnumcompte, odareduceArray,addItem} = require('../../SharedKernel/odaUtility').toinit();

const staticocomptereference = (function () {

  const toOcomptereference = function (o) {
    return (
      {
        "OcompteKey": o.OcompteKey,
        "OstblareaKey": o.OstblareaKey,
        "OreferenceKey": o.OreferenceKey,
        "OtableauposteKey": o.OtableauposteKey,
        "OstableauposteKey": o.OstableauposteKey,
        "Exception": o.Exception,
        "Taux": o.Taux
      });
  };

  
let toCreateModel = null
function BuildOcomptereference(model,body,fn) {
  let toacreateinstance=fn;
  toCreateModel =toacreateinstance(model,body,toOcomptereference);    
  const arr = addItem(toCreateModel);
  return odareduceArray(arr);
} 
            
     
      function toInitOcomptereferenceInstance(model,body,fn) {
        const getCreatedModel = BuildOcomptereference(model,body,fn);
        return getCreatedModel.slice();
       }

  const toUpdateocomptereference=function(requestBody) {
    let d = new Date(), result={};
    if (result) {
      {
        result.OcompteKey= requestBody.OcompteKey,
        result.OstblareaKey = requestBody.OstblareaKey,
        result.OreferenceKey = requestBody.OreferenceKey,
        result.OtableauposteKey = requestBody.OtableauposteKey,
        result.OstableauposteKey = requestBody.OstableauposteKey,
        result.Exception = requestBody.Exception,
        result.Taux = requestBody.Taux,
        result.ModifiedOn = d;
      }
    }
    return result;
  };
  const getObjOcomptereference = function (arr, value) {
    if (isValid(value) === true) {
      const validate = find(arr, function (o) {
          return  o.CompteNumber === getStringValue(value)
          || o.OcompteKey === getStringValue(value)
          || o.OreferenceKey === getStringValue(value)
          || o.OtableauposteKey === getStringValue(value)
          || o.OstableauposteKey === getStringValue(value)
          || o.OstblareaKey === getStringValue(value)
          || o.id === getStringValue(value);
        });
      return {

        odaObject: function () {
          return validate;
        },
        filteredObject: function () {
          return {
            compteKey: validate.OcompteKey,
            OstblareaKey: validate.OstblareaKey,
            OreferenceKey: validate.OreferenceKey,
            OstableauposteKey: validate.OstableauposteKey,
            OtableauposteKey: validate.OtableauposteKey
          };
        }

      };
    } else {
      return new Error(
`Invalid  ${value}`);
    }
  };
  const getObjOcomptereferenceCombined = function (arr, value) {
    if (isValid(value) === true) {
      const validate = find(arr, function (o) {
          return (o.OcompteKey === value.OcompteKey && o.OreferenceKey === value.OreferenceKey
             && o.OtableauposteKey === value.OtableauposteKey)
          ||( o.OreferenceKey === value.OreferenceKey && o.OtableauposteKey === value.OtableauposteKey);
        });
      return {
              odaObject: function () {
          return validate;
        },
        filteredObject: function () {
          return {
            compteKey: validate.OcompteKey,
            OstblareaKey: validate.OstblareaKey,
            OreferenceKey: validate.OreferenceKey,
            OstableauposteKey: validate.OstableauposteKey,
            OtableauposteKey: validate.OtableauposteKey
          };
        }

      };
    } else {
      return new Error(
`Invalid  ${value}`);
    }
  };
  const togetocomptereference = function (argOne) {
    let initObj, odauditobj;
    return map(argOne, function (obj) {
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
      return assign({}, initObj, odauditobj);

    }

    );
  };
  function toinit() {
    return {
      toOcomptereference: toOcomptereference,
      getObjOcomptereference:getObjOcomptereference,
      getObjOcomptereferenceCombined:getObjOcomptereferenceCombined,
      togetocomptereference:togetocomptereference,
      toUpdateocomptereference:toUpdateocomptereference,
      toInitOcomptereferenceInstance:toInitOcomptereferenceInstance
    };
  }
  return {
    toinit: toinit
  };
}
)();
module.exports = {
  toinit: staticocomptereference.toinit
};





