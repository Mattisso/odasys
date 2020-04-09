
require('../config/ohadb').connectserver();

const {arroexerccomptadata,objoexerccomptadata}=require('../testing/data/index').toinit().oexerccomptadata;

const {oExercCompta}=require('../omodels/modelsSchema/index').toinit();
const {toInitOexerccomptaInstance,toOexercompta}=require('../features/oexerccompta/staticOxerccompta').toinit();
const {odaremoveDupnumcompte} = require('../sharedkernel/odaUtility').toinit();
const {toInitializeInstance}=require('../sharedkernel/odainstance/toInitializeInstance').toinit()
const {getstreamdata$, odagetObserver,getapistreamdata$,getapiObserver}=require('../sharedkernel/odaSubscribe').toinit();
const { toCreateExerccomptadata$} = require('../features/oexerccompta/oexerccomptaRepository').toinit();
const {update$, delete$, index$$,insert$$ } = require('../features/oexerccompta/index').toinit();

const {toseedoexercompta} = require('../features/oexerccompta/oexercomptaSeed').toinit();

const getoreportdetail$ =index$$;
//update$(objoexerccomptadata,'5e8b7a140310040e3c00481d')
// getstreamdata$(getoreportdetail$(objoexerccomptadata())).subscribe(odagetObserver());

// console.log((toseedoexercompta));
//Update$(objupdate,'5de4209ff5f8b20fe8229f97');
// insert$(obj);
// getByid$('5de4209ff5f8b20fe8229f97');
// delete$('5de4209ff5f8b20fe8229f97');5ded92811d2b1a18540e9e41

//update$(objupdate,'5dbac506aa1fc24648be97d1');
///delete$('5e0ff441a04861607811d19a')
//insert$$(obj); //DropDownListexerComptable$ //getByid$ '5dbb6c97c2d9871f78c16a2a');

getstreamdata$(getoreportdetail$).subscribe(odagetObserver());
