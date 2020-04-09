 "use strict";
const _ = require('lodash');
const {User} = require('../../omodels/modelsSchema/index').toinit();
const {userdata} = require('../../seed/data-seed/index').toinit();
const {toUser}=require('./Staticuser').toinit();
//const {odaCreateObj, odaseedUsersave$ ,odaDel$}=require('../../SharedKernel/').toinit();
const {svcodasave$,svcodaDel$, svcodaseedUsersave$, svctoseedOthersInstance}=require('../../SharedKernel/odaservice/odaservice').toinit();
const {toInitializeInstance}=require('../../SharedKernel/odainstance/toInitializeInstance').toinit();

const { concat } = require('rxjs');

const toseedarray=toInitializeInstance(User,userdata, toUser);

const userSeed = (function () {
  const _removeData$= function(model,item) {
    return  svcodaDel$(model,item);
  };
  const _insertuser$ = function(model, arr) {
  //  console.log(arr);
return svcodaseedUsersave$(model,arr);
  };
  const removeData$= _removeData$(User,'User');
  const insertuser$= _insertuser$(User, toseedarray);

const seedresult$= concat(removeData$,insertuser$);

  function toinit() {
    return {
      seedresult$:seedresult$
      ,toseedarray:toseedarray

    };
  }

return {
  toinit: toinit
};

}
)();
module.exports= {
toinit:userSeed.toinit
};

  