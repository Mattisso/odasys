"use strict";
const { find, map, assign, filter, forEach,uniqBy } = require('lodash');
const { isValid, odauditObj, getStringValue, odareduceArray ,odaExclude, addItem} = require('../../SharedKernel/odaUtility').toinit();
const { odaByarg} = require('../../SharedKernel/odaFiltered').toinit();

const staticOtableauposte = (function () {
  const toOtableauposte = function (o) {
    return ({
      "TableauName": o.TableauName,
      "tableauLongName": o.tableauLongName,
      "ostableaupostes": o.ostableauposteids

    });
  };

  let toCreateModel = null;
  function BuildOtableauposte(model,body, fn) {
    let toacreateinstance=fn;
    toCreateModel =toacreateinstance(model,body, toOtableauposte);    
    const arr = addItem(toCreateModel);
    return odareduceArray(arr);
  }              
        function toInitOtableauposteInstance(model,body,fn) {
          const getCreatedModel = BuildOtableauposte(model,body,fn);
          return getCreatedModel.slice();

     }
  function toUpdateOtableauposte(result, requestparamid, requestBody) {
    var d = new Date();

    if (result) { {
        result._id = requestparamid,
        result.TableauName = requestBody.TableauName,
        result.tableauLongName = requestBody.tableauLongName,
        result.ModifiedOn = d;
      }
    }
    return result;
  }
  const getobjOtableauposte = function (arr, value) {
    if (isValid(value) === true) {
      let validate = find(arr, function (o) {
          return o.TableauName === getStringValue(value)
           || o.OtableauposteKey === getStringValue(value)
           || o.id === getStringValue(value)
           || o.OstableauposteKey === getStringValue(value);
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
  const togetotableauposte = function (argOne) {
    let initObj,
    odauditobj;
    const arr = map(argOne, function (obj) {
        initObj = {
          "id": obj.id,
          "TableauName": obj.TableauName,
          "tableauLongName": obj.tableauLongName
        };
        return map(obj.ostableaupostes, function (ostableauposte) {
          var _tobj = {
            "OstableauposteKey": ostableauposte.id
          };
          odauditobj = odauditObj(obj);
          return assign({}, initObj, _tobj, odauditobj);
        });
      });
    return odareduceArray(arr);
  };

  const totableaupostesNoChifAffair =function(argOne){
    const _gettableauname = odaByarg('TableauName','tblChifAffair');
    const filtereddata = odareduceArray(odaExclude(argOne, _gettableauname));
     const finalObj= map(filtereddata, function (data) {
        return ({
      "OtableauposteKey": data.id
      ,"TableauName": data.TableauName
      ,"tableauLongName": data.tableauLongName
    //  ,"OstableauposteKey": data.OstableauposteKey
        });
      });
      return  odareduceArray(finalObj);
  };

  const staticotableauPosteWithcomptebalances = function(comptebalances,otableaupostes) {
    const arr = map(comptebalances, function (obj) {
      //      console.log( oreference.OtableauposteKey);
       var validate = getobjOtableauposte(otableaupostes, obj.OtableauposteKey).odaObject();
      //  return validate;
      return ({
           "OtableauposteKey": validate.id,
           "OexercComptaKey": obj.OexercComptaKey,
           "tableauLongName": validate.tableauLongName,
           "TableauName": validate.TableauName,
          // OstableauposteKey: validate.OstableauposteKey
         });
       });
 return  uniqBy(arr,'OtableauposteKey');
  };

  function toinit() {
    return {
      toUpdateOtableauposte: toUpdateOtableauposte,
      toOtableauposte: toOtableauposte,
      togetotableauposte: togetotableauposte,
      getobjOtableauposte: getobjOtableauposte,
      totableaupostesNoChifAffair:totableaupostesNoChifAffair,
      staticotableauPosteWithcomptebalances:staticotableauPosteWithcomptebalances,
      toInitOtableauposteInstance:toInitOtableauposteInstance
    };
  }

  return {
    toinit: toinit
  };

})();
module.exports = {
  toinit: staticOtableauposte.toinit
};
