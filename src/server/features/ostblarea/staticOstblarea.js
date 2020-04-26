//  async = require('async')
"use strict";
const { find, map, assign, filter, forEach } = require('lodash');
const { isValid, odauditObj, getStringValue, odaremoveDupnumcompte, odareduceArray,addItem } = require('../../SharedKernel/odaUtility').toinit();

const staticOstblarea= (function () {
  const toOstblarea = function (o) {
    return (
      {
        "AreaShortName": o.AreaShortName,
        "AreaLongName": o.AreaLongName,
        "ocomptes": o.ocomptes

      });
  };

  
let toCreateModel = null;
function BuildOstblarea(model,body, fn) {
  let toacreateinstance=fn;
  toCreateModel =toacreateinstance(model,body,toOstblarea);    
  const arr = addItem(toCreateModel);
  return odareduceArray(arr);
} 
            
     
      function toInitOstblareaInstance(model,body,fn) {
        const getCreatedModel = BuildOstblarea(model,body,fn);
        return (getCreatedModel.slice());

   }
function toUpdateostblarea (result, requestparamid, requestBody) {
  var d = new Date();

if (result) {
  {
    result.id = requestparamid,
    result.AreaShortName = requestBody.AreaShortName,
    result.AreaLongName = requestBody.AreaLongName,
    result.ModifiedOn = d;

  }
}
return result;
}

const togetostblarea = function (argOne) {
  let initObj, odauditobj;
  const arr = map(argOne, function (obj) {
    initObj = {
      "id": obj.id,
      "AreaShortName": obj.AreaShortName,
      "AreaLongName": obj.AreaLongName
    };
return  map(obj.ocomptes, function (ocompte) {
      var _tobj = {"OcompteKey": ocompte.id };
      odauditobj = odauditObj(obj);
      return assign({}, initObj, _tobj, odauditobj);
    }
    );
    //return _.assign({}, initObj, odauditobj);
  });
  return odareduceArray(arr);
};
const getobjOstblarea = function (arr, value) {
  if (isValid(value) === true) {
    const validate = find(arr, function (o) {
        return o.AreaShortName === getStringValue(value)
        || o.OstblareaKey === getStringValue(value)
         || o.id === getStringValue(value)
         || o.OcompteKey === getStringValue(value);
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
    toOstblarea:toOstblarea,
    toUpdateostblarea:toUpdateostblarea,
    getobjOstblarea:getobjOstblarea,
    togetostblarea:togetostblarea,
    toInitOstblareaInstance:toInitOstblareaInstance
  };

}

return {
  toinit: toinit
};




})();
module.exports= {
toinit:staticOstblarea.toinit
};
