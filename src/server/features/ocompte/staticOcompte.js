"use strict";
const {find,map,assign} = require('lodash');
const {getStringValue, isValid, odauditObj,odaremoveDupnumcompte, odareduceArray,addItem}=require('../../SharedKernel/odaUtility').toinit();
const StaticOcompte = (function () {

  const toOCompte = function (o) {
    return      {
        "CompteNumber": o.CompteNumber
      };
  };

  
let toCreateModel = null;
function BuildOcompte(model,body, fn) {
  let toacreateinstance=fn;
  toCreateModel =toacreateinstance(model,body,toOCompte);    
  const arr = addItem(toCreateModel);
  return odareduceArray(arr);
} 
               
      function toInitOcompteInstance(model,body,fn) {
        const getCreatedModel = BuildOcompte(model,body,fn);
        return getCreatedModel.slice();

   }
  const togetocompte = function (argOne) {
    let initObj, odauditobj;
    return map(argOne, function (obj) {
      initObj = {
        "id": obj.id,
        "CompteNumber": obj.CompteNumber
      };
      odauditobj = odauditObj(obj);
      return assign({}, initObj, odauditobj);
    });
  };
  const getobjOcompte = function (arr, value) {
    if (isValid(value) === true) {
      const validate = find(arr, function (o) {
          return o.CompteNumber === getStringValue(value)
        || o.OcompteKey === getStringValue(value)
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
  function toUpdateocompte (body) {
    let d = new Date(), result={};
    if (result) {
      {
          result.id = body.id,
          result.CompteNumber = body.CompteNumber,
          result.ModifiedOn = d;
      }
    }
    return result;
  }
  function toinit() {
    return {
      toOCompte:toOCompte,
      getobjOcompte:getobjOcompte,
      togetocompte:togetocompte,
      toUpdateocompte:toUpdateocompte,
      toInitOcompteInstance:toInitOcompteInstance

    };
  }
  return {
    toinit: toinit
  };
}
)();
module.exports= {
toinit:StaticOcompte.toinit
};


