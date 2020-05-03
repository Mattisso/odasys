const _=require('lodash');
const {arroexerccomptadata,objoexerccomptadata,oexcomptadata}=require('../testing/data/index').toinit().oexerccomptadata;

const {oExercCompta, oExercice}=require('../omodels/modelsSchema/index').toinit();
const {toInitOexerccomptaInstance,toOexercompta}=require('../features/oexerccompta/staticOxerccompta').toinit();
// const {tocreateOexerciceObject}=require('../features/oexercice/StaticOexercice').toinit();

const {odaremoveDupnumcompte, isValid} = require('../sharedkernel/odaUtility').toinit();
const {toInitializeInstance}=require('../sharedkernel/odainstance/toInitializeInstance').toinit();
const {getstreamdata$, odagetObserver,getapistreamdata$,getapiObserver}=require('../sharedkernel/odaSubscribe').toinit();
const { toCreateExerccomptadata$} = require('../features/oexerccompta/oexerccomptaRepository').toinit();

const { _tocreateoexerciceobject, getoexercices$,toseedOexercicedata$} = require('../features/oexercice/oexerciceRepository').toinit();
const {getobjOexercCompta} =require('../SharedKernel/staticObjects').toinit();

const {getsrdoExercices$}=require('../sharedkernel/odarepository/sharedRepository').toinit();

const {toseedoexercompta} = require('../features/oexerccompta/oexercomptaSeed').toinit();
require('../config/ohadb').connectserver();
const getoreportdetail$ =getsrdoExercices$;

getstreamdata$(getoreportdetail$).subscribe(odagetObserver());
