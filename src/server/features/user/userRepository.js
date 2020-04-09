
"use strict";
const  {User} = require('../../omodels/modelsSchema/index').toinit();
const {userdata} = require('../../seed/data-seed/index').toinit();
const {togetuser,togetObjuser,toUpdateUser,toUser}=require('./staticUser').toinit();
const {getodaindex$, odaindex,getodaByid$}=require('../../sharedkernel/odaservice/dataservices').toinit();
const {svcodaseedUsersave$, svcodaApiDel$,svcodaSearchBy,svcodaDel$}=require('../../sharedkernel/odaservice/odaservice').toinit();
const {toInitializeInstance, svctoInitializeInstance$,svctoUpdateInstance$,svcapiupdate$}=require('../../sharedkernel/odainstance/index').toinit();  
const { concat } = require('rxjs');
/* const {toUpdateInstance,svctoUpdateInstance$} = require('../../sharedkernel/odainstance/toUpdateInstance').toinit();

const {toInitializeInstance,svctoInitializeInstance} = require('../../sharedkernel/odainstance/toInitializeInstance').toinit(); */

const userRepository = (function () {
  const index = function (callback) {
    return odaindex(User,togetuser,callback);
  };

  const index$ = function(){
    return getodaindex$(User,togetuser);
  };
  const getByid$ = function (requestparamid) {
    return  getodaByid$(User,togetuser,requestparamid,togetObjuser);
  };

   const toCreateuserdata$ = function (requestBody,requestparamid) {
    return svctoInitializeInstance$(User, requestBody, requestparamid,toUser);
   };
   const insertuser$ = function (arr) {
    return svcodaseedUsersave$(User,arr);
   };  
   const toUpdateuserdata$ = function (requestBody) {
    return svctoUpdateInstance$(requestBody, toUpdateUser);
   };

   const edituser$ = function (body, requestparamid) {
    return svcapiupdate$(User, body, requestparamid);
   };
   const odasearchBy = function (body) {
    return svcodaSearchBy(User, body);
   };
   const Deleteuser$ = function (requestparamid) {
    return svcodaApiDel$(User, requestparamid);
   };
 
  function toinit() {
    return {
      getusers$: index$(),
      getAll: index,
      getByid$:getByid$,
      insertuser$:insertuser$,
      toCreateuserdata$:toCreateuserdata$,
      toUpdateuserdata$:toUpdateuserdata$,
      edituser$:edituser$,
      odasearchBy:odasearchBy,
      Deleteuser$:Deleteuser$
     
    };
  }

  return {
    toinit: toinit
  };



}
)();
module.exports = {
  toinit: userRepository.toinit
};

