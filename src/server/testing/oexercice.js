const _=require('lodash');
const {arroexerccomptadata,objoexerccomptadata,oexcomptadata}=require('../testing/data/index').toinit().oexerccomptadata;

const {oExercCompta, oExercice}=require('../omodels/modelsSchema/index').toinit();
const {toInitOexerccomptaInstance,toOexercompta}=require('../features/oexerccompta/staticOxerccompta').toinit();
// const {tocreateOexerciceObject}=require('../features/oexercice/StaticOexercice').toinit();

const {odaremoveDupnumcompte, isValid} = require('../sharedkernel/odaUtility').toinit();
const {toInitializeInstance}=require('../sharedkernel/odainstance/toInitializeInstance').toinit();
const {getstreamdata$, odagetObserver,getapistreamdata$,getapiObserver}=require('../sharedkernel/odaSubscribe').toinit();
const { toCreateExerccomptadata$} = require('../features/oexerccompta/oexerccomptaRepository').toinit();
const { _tocreateoexerciceobject} = require('../features/oexercice/oexerciceRepository').toinit();
const {getobjOexercCompta} =require('../SharedKernel/staticObjects').toinit();


const {toseedoexercompta} = require('../features/oexerccompta/oexercomptaSeed').toinit();
// require('../config/ohadb').connectserver()
/*

const getoreportdetail$ =  toCreateExerccomptadata$
getstreamdata$(getoreportdetail$(objoexerccomptadata())).subscribe(odagetObserver()); */

// console.log((toseedoexercompta));
 const tocreateOexerciceObject= function() {
  const  _getcurrentYear= _.maxBy(_.map(_.map(oexcomptadata,'oExercComptaId'), _.ary(parseInt, 1)));
  const _getPreviousYear= (_.maxBy(_.map(_.map(oexcomptadata,'oExercComptaId'), _.ary(parseInt, 1))))-1;
  let getcurrentObject = getobjOexercCompta(oexcomptadata, _.toString(_getcurrentYear)).odaObject();
  let  getPreviousYearObject = getobjOexercCompta(oexcomptadata, _.toString(_getPreviousYear)).odaObject();
  let  getDefaultYearObject = getobjOexercCompta(oexcomptadata, '1900').odaObject();
  if(isValid(getPreviousYearObject)===false)
  getPreviousYearObject=getDefaultYearObject;
    // getcurrentObject.getPreviousYearObject=getPreviousYearObject;
    const currentYearObj={
      'oExerciceEncour': getcurrentObject.oExercComptaId,
      'OexercComptaEncourKey': getcurrentObject._id
      };
      const PreviousYearObj={
        'ExercicePrev': getPreviousYearObject.oExercComptaId,
        'OexercComptaPrevKey': getPreviousYearObject._id
        };
        const arr= _.assign({},currentYearObj,PreviousYearObj);
    return   arr;
    /*   getcurrentYear: function() {
        return {
        'oExerciceEncour': getcurrentObject.oExercComptaId,
        'OexercComptaEncourKey': getcurrentObject.id
        };
      },
      getPreviousYear: function(){
        return {
          'ExercicePrev': getPreviousYearObject.oExercComptaId,
        'OexercComptaEncourKey': getPreviousYearObject.id
        }
      } */



};
 /* function testing(option){
   return {

   }
 }
 */
console.log(tocreateOexerciceObject());
