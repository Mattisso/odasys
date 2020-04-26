//  async = require('async')
const { find, map, assign, filter, forEach,maxBy,ary,toString,toNumber} = require('lodash');
const {staticObjects} =require('../../SharedKernel/index').toinit();
const { isValid, odauditObj, getStringValue,odaremoveDupnumcompte, odareduceArray,addItem} = require('../../SharedKernel/odaUtility').toinit();
const {getodaAggreateData} = require('../../SharedKernel/odaStats').toinit();
const staticOxerccompta= (function () {
  const odaqueryselector = function (obj) {
    let selector;
    if (isValid(obj.oExercComptaId) === true && isValid(obj.DateDebut) === true
       && isValid(obj.Datefin ) === true && isValid(obj.IntitulCompte) == true) {
      selector = true;
    }
     else {
      selector = false;
    }
    return selector;
  };
function toOexercompta(o) {
  return ({
    "oExercComptaId": o.oExercComptaId,
    "DateDebut": o.DateDebut,
    "Datefin": o.Datefin,
    "Cloture": o.Cloture,

  });
}

let toCreateModel = null;
  function BuildOexerccompta(model,body,fn) {
    let toacreateinstance=fn;
    toCreateModel =toacreateinstance(model,body,toOexercompta);
 //   console.log(toCreateModel)
    const arr = addItem(toCreateModel);
   // console.log(arr);
    return odareduceArray(arr);
  }
    function toInitOexerccomptaInstance(model,body,fn) {
       const getCreatedModel = BuildOexerccompta(model,body,fn);
     //  console.log(balance);
       return getCreatedModel.slice();
        }
const togetoexerccompta = function (argOne) {
  let initObj, odauditobj;
  return map(argOne, function (obj) {
    initObj = {
      "id": obj.id,
      "oExercComptaId": obj.oExercComptaId,
      "DateDebut": obj.DateDebut,
      "Datefin": obj.Datefin,
     "Cloture": obj.Cloture
    };
    odauditobj = odauditObj(obj);
    return assign({}, initObj, odauditobj);
  });
};
/* const toOexercice= function (model, arr) {
  const  _getcurrentYear= maxBy(map(map(arr,'oExercComptaId'), ary(parseInt, 1)));
 var getcurrentObject = staticObjects.getobjOexercCompta(arr, toString(_getcurrentYear)).odaObject();
 return new model({
  "oExerciceEncour": getcurrentObject.oExercComptaId,
   "ExercicePrev":  toString(toNumber(getcurrentObject.oExercComptaId)-1)?toString(toNumber(getcurrentObject.oExercComptaId)-1):'1900',
   "OexercComptaKey":  getcurrentObject.id
 });
}; */


const staticDropListExerComptable=function(execcomptas) {
 const arr =map(execcomptas, function (obj) {
  return ({
      "OexercComptaKey": obj.id,
      "oExercComptaId": obj.oExercComptaId
  });

});
return arr;
};

function toUpdateOexercompta (requestBody) {
  let d = new Date(), result={};
  if (result) {
  {
    result.id = requestBody.id,
    result.oExercComptaId = requestBody.oExercComptaId,
    result.DateDebut = requestBody.DateDebut,
    result.Datefin = requestBody.Datefin,
    result.Cloture = requestBody.Cloture,
    result.ModifiedOn = d;
  }
}
return result;
}
const getobjOexercCompta = function (arr, value) {
  if (isValid(value) === true) {
    const validate = find(arr, function (o) {
      return o.oExercComptaId === getStringValue(value)
      || o.id === getStringValue(value);
      });
    return {
      odaObject: function () {
        return validate;
      }
    };

  } else {
    return new Error(`No Data return for ${value}`);
  }
};

function toinit() {

  return {
    toOexercompta:toOexercompta,
    toUpdateOexercompta:toUpdateOexercompta,
  //  toOexercice:toOexercice,
    togetoexerccompta:togetoexerccompta,
    odaqueryselector:odaqueryselector,
    getobjOexercCompta:getobjOexercCompta,
    staticDropListExerComptable:staticDropListExerComptable,
    toInitOexerccomptaInstance:toInitOexerccomptaInstance
  };

}

return {
  toinit: toinit
};
})();
module.exports= {
toinit:staticOxerccompta.toinit
};
