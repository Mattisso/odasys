/* eslint-disable  no-console */
/* eslint-disable no-unused-vars */

const {getnstbalanceinputes$,getByid$,toCreateBalanceinputdata$,insertBalanceInput,editBalanceInput$,toUpdateBalanceinputdata$,deleteBalanceInput$,odasearchby,getloadnstbalanceinputs$,getloadnstbalanceinputs, toCreateBalanceinputdata, savebalanceInput, deleteBalanceInput, toUpdateBalanceinputdata, editBalanceInput} = require('./nstbalanceinputRepository').toinit();
const { concatMap } = require('rxjs/operators');


const nstbalanceinputCtrl = (function () {
const index$=function(){
return getnstbalanceinputes$;
};
const getloadnstBalanceinputs$=function(){
  return getloadnstbalanceinputs$;
  };
  const getloadnstBalanceinputs=function(callback){
    return getloadnstbalanceinputs(callback);
    };
const getbyid$=function(id){
  return getByid$(id);
  };

  const odasearchBy=function(body){
    return odasearchby(body);
    };
  const insertnstbalanceinput$ = function(body) {
 return toCreateBalanceinputdata$(body).pipe(concatMap(function (x) {
      return insertBalanceInput(x);
    }));
  };

  const insertnstbalanceinput = function(body) {
    const inserteddata=toCreateBalanceinputdata(body);
         return savebalanceInput(inserteddata);
     };
  const updatenstbalanceinput$ = function(body,requestparamid) {
    return toUpdateBalanceinputdata$(body).pipe(concatMap(function (x) {
      return editBalanceInput$(x,requestparamid);
    }));
     };


   const updatenstbalanceinput = function(body) {
      const updatedata= toUpdateBalanceinputdata(body);
        return editBalanceInput(updatedata);

       }; 


       const deletenstbalanceinput$ = function(requestparamid) {
return deleteBalanceInput$(requestparamid);

         };


       const deletenstbalanceinput = function(requestparamid) {
        return deleteBalanceInput(requestparamid);

                 };
  function toinit() {
    return {
      index$:index$(),
      getbyid$:getbyid$,
      insert$:insertnstbalanceinput$,
      update$:updatenstbalanceinput$,
      delete$:deletenstbalanceinput$,
      odasearchby:odasearchBy,
      getloadnstBalanceinputs$:getloadnstBalanceinputs$(),
      getloadnstBalanceinputs:getloadnstBalanceinputs,
      toInsert:insertnstbalanceinput,
      toDelete:deletenstbalanceinput,
      toUpdate:updatenstbalanceinput

    };
  }
  return {
    toinit: toinit
  };
}
)();
module.exports = {
  toinit: nstbalanceinputCtrl.toinit
};
