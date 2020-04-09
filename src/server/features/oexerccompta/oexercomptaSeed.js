
"use strict";
const { oExercCompta} = require('../../omodels/modelsSchema/index').toinit();
const {oexercomptadata} = require('../../seed/data-seed/index').toinit();
const { toOexercompta} = require('./staticOxerccompta').toinit();
const {seedoexercice$} =require('../oexercice/index').toinit();
const {svctoseedOthersInstance, svcodaDel$, svcodasave$} = require('../../SharedKernel/odaservice/odaservice').toinit();
const { concat } = require('rxjs');
const {toInitializeInstance}=require('../../sharedkernel/odainstance/toInitializeInstance').toinit(); 

const oexercomptaSeed = (function () {
  const toseedoexercompta=toInitializeInstance(oExercCompta,oexercomptadata,toOexercompta);
  const  _removeoExercCompta$= function(model,item) {
    return   svcodaDel$(model,item);
      };
      const _insertoExercCompta$ = function(arr) {
     return  svcodasave$(arr);
        };
        const removeoExercCompta$=_removeoExercCompta$(oExercCompta,'oExercCompta');
      const insertoExercCompta$ =_insertoExercCompta$(toseedoexercompta);

        const seedOexerccompta$ = concat(removeoExercCompta$,insertoExercCompta$,seedoexercice$);


  function toinit() {
    return {
      seedOexerccompta$:seedOexerccompta$,
      toseedoexercompta:toseedoexercompta
//result$:seedOexerccompta$,
//seedOexercice$:seedOexercice$
// insertoExercCompta:insertoExercCompta,
//removeoExercCompta$:removeoExercCompta$,
//insertoExercCompta$:insertoExercCompta$
    };
  }

return {
  toinit: toinit
};
}
)();
module.exports= {
toinit:oexercomptaSeed.toinit
};
