"use strict";
const {odaupdate$, odasave$, odaseedUsersave$,odaDel$,odaLoadupdate$,odaSearchBy}=require('../odarepository/odarepository').toinit();
const {odaApiBulkDel$, odaApisave$,odapiDel$}=require('../odarepository/odaApirepository').toinit();

// const {odapiupdate$}=require('../odainstance/toUpdateInstance').toinit();
/* const {toUpdateInstance,toInitializeInstance, svctoInitializeInstance$,svctoUpdateInstance$}=require('../odainstance/index').toinit(); */
//const {toseedInstance}=require('./toSeedInstance').toinit();
const {isValid } = require('../odaUtility').toinit();

const  odaservice = (function () {
  
  /* const svcapiupdate$=function(model, obj,reqparmid) {
    return odapiupdate$(model,obj,reqparmid);
  }; */
  const svcodasave$=function(option) {
    return odasave$(option);
  };
/*   const svcodaupdate$=function(model,option) {
    if( isValid(option.arrArg)===true && isValid(option.odaObjupd)===true){
      return odaLoadupdate$(model,option);
    }
    if( isValid(option.arrArg)===true && isValid(option.odaObjupd)===false){
      return odaupdate$(model,option);
    }
  }; */
  const svcodaSearchBy=function(model,obj) {
    if(isValid(obj)===true){
      return odaSearchBy(model,obj);
    }
  };
  const svcodaseedUsersave$=function(model, option) {
    return odaseedUsersave$(model,option);
  };
  const svcodaDel$=function(model, item) {
    return odaDel$(model,item);
  };
  const svcodaApisave$=function(argone) {
    return odaApisave$(argone);
  };
 /*  const svcodaApiupdate$=function(model, ArgOne,reqparmid) {
    return odapiupdate$(model, ArgOne,reqparmid);
  }; */
  const svcodaApiBulkDel$=function(model, item) {
    return odaApiBulkDel$(model,item);
  };
  const svcodaApiDel$=function(model, requestparamid) {
    return odapiDel$(model,requestparamid);
  };
 
 
  function toinit() {
    return {
// svcapiupdate$:svcapiupdate$,
      svcodasave$:svcodasave$,
   //  svcodaupdate$:svcodaupdate$,
      svcodaseedUsersave$:svcodaseedUsersave$,
      svcodaDel$:svcodaDel$,
      svcodaApisave$:svcodaApisave$,
    //  svcodaApiupdate$:svcodaApiupdate$,
      svcodaApiBulkDel$:svcodaApiBulkDel$,
   //   svctoInitializeInstance:svctoInitializeInstance,
   //   svctoUpdateInstance:svctoUpdateInstance,
      svcodaApiDel$:svcodaApiDel$,
      svcodaSearchBy:svcodaSearchBy,
     // svctoapiInitializeinstance:svctoapiInitializeinstance,

    };
  }
return {
  toinit: toinit
};

}
)();
module.exports= {
toinit:odaservice.toinit
};


