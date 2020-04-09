"use strict";
const { getStringValue,isValid,odauditObj, odareduceArray} = require('../../SharedKernel/odaUtility').toinit();
const { find, map, assign, filter, forEach } = require('lodash');


const staticOlevel = (function () {
 const toOlevel =function (obj) {
  return ({
    "olevelNum": obj.olevelNum,
    "olevelDescption": obj.olevelDescption
  });
 };

 
let toCreateModel = null
function BuildOlevel(model,body, fn) {
  let toacreateinstance=fn;
  toCreateModel =toacreateinstance(model,body,toOlevel);    
  const arr = addItem(toCreateModel);
  return odareduceArray(arr);
} 
            
    function toInitOlevelInstance(model,body,fn) {
     const getCreatedModel = BuildOlevel(model,body,fn);
     return (getCreatedModel.slice());


   }
 const togetolevel = function (argOne) {
  let initObj, odauditobj;
  return map(argOne, function (obj) {
    initObj = {
      "id": obj.id,
      "olevelNum": obj.olevelNum,
      "olevelDescption": obj.olevelDescption
    };
    odauditobj = odauditObj(obj);
    return assign({}, initObj, odauditobj);
  }

  );
};
const getobjolevel = function (arr, value) {
  if (isValid(value) === true) {
    const validate = find(arr, function (o) {
        return o.olevelNum === getStringValue(value)
        || o.olevelKey === getStringValue(value)
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
function toUpdateolevel(body) {
  let d = new Date(), result={};
  if (result) {
    {
        result.id = body.id,
        result.olevelNum = body.olevelNum,
        result.olevelDescption = body.olevelDescption,
        result.ModifiedOn = d;
    }
  }
  return result;
}
  function toinit() {
    return {
      toOlevel:toOlevel,
      togetolevel:togetolevel,
      getobjolevel:getobjolevel,
      toUpdateolevel:toUpdateolevel,
      toInitOlevelInstance:toInitOlevelInstance
    };
  }

return {
  toinit: toinit
};



}
)();
module.exports= {
toinit:staticOlevel.toinit
};


