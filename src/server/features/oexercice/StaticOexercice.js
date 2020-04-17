
"use strict";
const _ = require('lodash');
const {getobjOexercCompta} =require('../../SharedKernel/staticObjects').toinit();
const { isValid, odauditObj, getStringValue,  odareduceArray,addItem} = require('../../SharedKernel/odaUtility').toinit();

const StaticOexercice = (function () {

  const tocreateOexerciceObject = function (oexcomptadata) {
    const _getcurrentYear = _.maxBy(_.map(_.map(oexcomptadata, 'oExercComptaId'), _.ary(parseInt, 1)));
    const _getPreviousYear = (_.maxBy(_.map(_.map(oexcomptadata, 'oExercComptaId'), _.ary(parseInt, 1)))) - 1;
    let getcurrentObject = getobjOexercCompta(oexcomptadata, _.toString(_getcurrentYear)).odaObject();
    let getPreviousYearObject = getobjOexercCompta(oexcomptadata, _.toString(_getPreviousYear)).odaObject();
      let getDefaultYearObject = getobjOexercCompta(oexcomptadata, '1900').odaObject();
      if (isValid(getPreviousYearObject) === false)
        getPreviousYearObject = getDefaultYearObject;
      const currentYearObj = {
      'oExerciceEncour': getcurrentObject.oExercComptaId,
      'OexercComptaEncourKey': getcurrentObject.id
    };
    const PreviousYearObj = {
      'ExercicePrev': getPreviousYearObject.oExercComptaId,
      'OexercComptaPrevKey': getPreviousYearObject.id
    };
    const finalobj = _.assign({}, currentYearObj, PreviousYearObj);
      return finalobj;

  };

  const toOexercice= function (o) {
   return ({
    "oExerciceEncour": o.oExerciceEncour,
     "ExercicePrev":  o.ExercicePrev,
    "OexercComptaEncourKey":  o.OexercComptaEncourKey,
    "OexercComptaPrevKey":o.OexercComptaPrevKey
   });
  }; 

  let toCreateModel = null;
  function BuildOexercice(model,body, fn) {
    let toacreateinstance=fn;
    toCreateModel =toacreateinstance(model,body,toOexercice);
    const arr = addItem(toCreateModel);
    return odareduceArray(arr);
  }
        function toInitOexerciceInstance(model,body,fn) {
          const getCreatedModel = BuildOexercice(model,body,fn);
          return getCreatedModel.slice();
     }
  const togetoexercices = function (argOne) {
    let initObj, odauditobj;
    return _.map(argOne, function (obj) {
      initObj = {
        "id": obj.id,
        "oExerciceEncour": obj.oExerciceEncour,
        "ExercicePrev":  obj.ExercicePrev,
       "OexercComptaEncourKey":  obj.OexercComptaEncourKey,
       "OexercComptaPrevKey":obj.OexercComptaPrevKey
      };
      odauditobj = odauditObj(obj);
      return _.assign({}, initObj, odauditobj);
    }
    );
  };
  const getobjOexercice = function (arr, value) {
    if (isValid(value) === true) {
      const validate = _.find(arr, function (o) {
        return o.OexercComptaKey === getStringValue(value)
          || o.oExerciceEncour === getStringValue(value)
          || o.OexercComptaPrevKey === getStringValue(value)
          || o.ExercicePrev === getStringValue(value)
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
  function toinit() {
    return {
// toOexercice:toOexercice,
      togetoexercices:togetoexercices,
      tocreateOexerciceObject:tocreateOexerciceObject,
      getobjOexercice:getobjOexercice,
      toInitOexerciceInstance:toInitOexerciceInstance
    };
  }
return {
  toinit: toinit
};



}
)();
module.exports= {
toinit:StaticOexercice.toinit
};

