
"use strict";
const { find, map, assign, filter, forEach,maxBy,ary,toString,toNumber} = require('lodash');
const {staticObjects} =require('../../SharedKernel/index').toinit();
const { isValid, odauditObj, getStringValue, replaceNullToZero,odaremoveDupnumcompte, odareduceArray,addItem} = require('../../SharedKernel/odaUtility').toinit();
const staticOreportheader = (function () {
  const toOreportheader = function (o) {
    return (
      {
      "OtableauposteKey": o.OtableauposteKey,
      "OreferenceKey": o.OreferenceKey,
      "SortOrderH": o.SortOrderH
      });
  };

  let balanceinputs = null;
  function BuildOreportheader(model,body, fn) {
    let toacreateinstance=fn;
    balanceinputs =toacreateinstance(model,body,toOreportheader);    
    const arr = addItem(balanceinputs);
    return odareduceArray(arr);
  } 
              
       
        function toInitOreportheaderInstance(model,body,fn) {
          const getCreatedModel = BuildOreportheader(model,body,fn);
          return (getCreatedModel.slice());

     }

  const togetoreportheader = function (argOne) {
    let initObj, odauditobj;
    return map(argOne, function (obj) {
      initObj = {
        "id": obj.id,
        "OtableauposteKey": obj.OtableauposteKey,
        "OreferenceKey": obj.OreferenceKey,
        "SortOrderH": obj.SortOrderH
      };
      odauditobj = odauditObj(obj);
      return assign({}, initObj, odauditobj);
    }
    );
  };
  const getObjoreportheader = function (arr, value) {
    if (isValid(value) === true) {
      const validate = find(arr, function (o) {
          return  o.OreferenceKey === getStringValue(value)
          || o.OtableauposteKey === getStringValue(value)
          || o.id === getStringValue(value);
        });
      return {
        odaObject: function () {
          return validate;
        },
        filteredObject: function () {
          return {
            OreferenceKey: validate.OreferenceKey,
            OtableauposteKey: validate.OtableauposteKey
          };
        }
      };
    } else {
      return new Error(
`Invalid  ${value}`);
    }
  };
  function toUpdateoreportheader(body) {
    let d = new Date(), result={};
    if (result) {
      {
          result.id = body.id,
          result.OtableauposteKey = body.OtableauposteKey,
          result.OreferenceKey = body.OreferenceKey,
          result.SortOrderH = body.SortOrderH,
          result.ModifiedOn = d;
      }
    }
    return result;
  }
  function toinit() {
    return {
      toOreportheader:toOreportheader,
      togetoreportheader:togetoreportheader,
      getObjoreportheader:getObjoreportheader,
      toUpdateoreportheader:toUpdateoreportheader,
      toInitOreportheaderInstance:toInitOreportheaderInstance
    };
  }

return {
  toinit: toinit
};

}
)();
module.exports= {
toinit:staticOreportheader.toinit
};


