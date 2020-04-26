//  async = require('async')
const { find, map, assign, filter, forEach } = require('lodash');
const { isValid, odauditObj, getStringValue, odareduceArray, addItem } = require('../../SharedKernel/odaUtility').toinit();

const staticOstableauposte = (function () {
  const toOstableauposte = function (o) {

    return (
      {
        "StableauName": o.StableauName,
        "StbleauLongName": o.StbleauLongName,
        "ostblareas": o.ostblareaids

      });
  };


let toCreateModel = null;
function BuildOstableauposte(model,body, fn) {
  let toacreateinstance=fn;
  toCreateModel =toacreateinstance(model,body,toOstableauposte);
  const arr = addItem(toCreateModel);
  return odareduceArray(arr);
}


      function toInitOstableauposteInstance(model,body,fn) {
        const getCreatedModel = BuildOstableauposte(model,body,fn);
        return (getCreatedModel.slice());

   }
  const togetostableauposte = function (argOne) {
    let initObj, odauditobj;
    const arr = map(argOne, function (obj) {
      initObj = {
        "id": obj.id,
        "StableauName": obj.StableauName,
        "StbleauLongName": obj.StbleauLongName
      };
      return map(obj.ostblareas, function (ostblarea) {
        var _tobj = { "OstblareaKey": ostblarea.id };
        odauditobj = odauditObj(obj);
        return assign({}, initObj, _tobj, odauditobj);
      });
    });
    return odareduceArray(arr);
  };

  const getobjOstableauposte = function (arr, value) {
    if (isValid(value) === true) {
      const validate = find(arr, function (o) {
        return o.StableauName === getStringValue(value)
          || o.OstableauposteKey === getStringValue(value)
          || o.id === getStringValue(value)
          || o.OstblareaKey === getStringValue(value);
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
  function toUpdateOstableauposte(body) {
    let d = new Date(), result={};
    if (result) {
      {
          result.id = body.id,
          result.StableauName = body.StableauName,
          result.StbleauLongName = body.StbleauLongName,
          result.ostblareas = body.ostblareaids,
          result.ModifiedOn = d;
      }
    }
    return result;
  }
  function toinit() {

    return {
      toUpdateOstableauposte: toUpdateOstableauposte,
      toOstableauposte: toOstableauposte,
      getobjOstableauposte: getobjOstableauposte,
      togetostableauposte: togetostableauposte,
      toInitOstableauposteInstance:toInitOstableauposteInstance
    };

  }

  return {
    toinit: toinit
  };




})();
module.exports = {
  toinit: staticOstableauposte.toinit
};
