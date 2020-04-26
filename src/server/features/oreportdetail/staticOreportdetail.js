
"use strict";
const { find, map, assign, filter, forEach,maxBy,ary,toString,toNumber} = require('lodash');
const {staticObjects} =require('../../SharedKernel/index').toinit();
const { isValid, odauditObj, getStringValue, addItem,odareduceArray} = require('../../SharedKernel/odaUtility').toinit();

const staticOreportdetail = (function () {
  const toOreportDetail = function (o) {
    return ({
      "OtableauposteKey": o.OtableauposteKey,
      "OreferenceKey": o.OreferenceKey,
      "olevelKey": o.olevelKey,
      "SortOrder": o.SortOrder
    });
  };


let toCreateModel = null;
function BuildOreportdetail(model,body, fn) {
  let toacreateinstance=fn;
  toCreateModel =toacreateinstance(model,body,toOreportDetail);
  const arr = addItem(toCreateModel);
  return odareduceArray(arr);
}


      function toInitOreportdetailInstance(model,body,fn) {
        const getCreatedModel = BuildOreportdetail(model,body,fn);
        return (getCreatedModel.slice());

   }
  const togetoreportdetail = function (argOne) {
    let initObj,
    odauditobj;
    return map(argOne, function (obj) {
      initObj = {
        "id": obj.id,
        "OtableauposteKey": getStringValue(obj.OtableauposteKey),
        "OreferenceKey": getStringValue(obj.OreferenceKey),
        "olevelKey": getStringValue(obj.olevelKey),
        "SortOrder": obj.SortOrder
      };
      odauditobj = odauditObj(obj);

      return assign({}, initObj, odauditobj);
    });

  };
  const getObjoreportdetail = function (arr, value) {
    if (isValid(value) === true) {
      const validate = find(arr, function (o) {
          return o.OreferenceKey === getStringValue(value)
           || o.OtableauposteKey === getStringValue(value)
           || o.olevelKey === getStringValue(value)
           || o.id === getStringValue(value);
        });
      return {
        odaObject: function () {
          return validate;
        },
        filteredObject: function () {
          return {
            olevelKey: validate.olevelKey,
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
  function toUpdateoreportdetail(body) {
    let d = new Date(), result={};
    if (result) {
      {
          result.id = body.id,
          result.OtableauposteKey= body.OtableauposteKey,
          result.OreferenceKey= body.OreferenceKey,
          result.olevelKey= body.olevelKey,
          result.SortOrder= body.SortOrder,
          result.ModifiedOn = d;
      }
    }
    return result;
  }
  function toinit() {
    return {
      toOreportDetail: toOreportDetail,
      togetoreportdetail: togetoreportdetail,
      getObjoreportdetail: getObjoreportdetail,
      toUpdateoreportdetail:toUpdateoreportdetail,
      toInitOreportdetailInstance:toInitOreportdetailInstance
    };
  }
  return {
    toinit: toinit
  };

})();
module.exports = {
  toinit: staticOreportdetail.toinit
};

