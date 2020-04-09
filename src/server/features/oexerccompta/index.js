
"use strict";

const {  index$,  insert$,  GetComptaWithExercice$,  update$,  delete$,  getbyid$,  getoexercice$,  getoexerciceencour$,  odasearchby,ddlexerComptable$,seedoexcompta$} = require('./oexercomptaCtrl').toinit();


//const {toCreateExerccomptadata$} = require('./oexerccomptaRepository').toinit();

const index = (function () {

  function toinit() {
    return {
      seedoexcompta$: seedoexcompta$,
      insert$$: insert$,
      update$: update$,
      delete$: delete$,
      getbyid$: getbyid$,
      getAlloexerccompta$: index$,
      odasearchby: odasearchby,
      GetComptaWithExercice$: GetComptaWithExercice$,
      getoexercice$: getoexercice$,
      getoexerciceencour$: getoexerciceencour$,
      index$$: index$,
      ddlexerComptable$:ddlexerComptable$
    //  toCreateExerccomptadata$:toCreateExerccomptadata$
    };
  }

  return {
    toinit: toinit
  };

})();
module.exports = {
  toinit: index.toinit
};
