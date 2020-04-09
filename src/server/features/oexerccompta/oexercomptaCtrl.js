
"use strict";
var _ = require('lodash');
const {getByid$,getexeccomptas$,getoExerciceEncour$,getoExercice$,GetComptaWithExercice$,toCreateExerccomptadata$,toUpdateExerccomptadata$,deleteExercCompta$,insertExercCompta$,editExercCompta$, odasearchBy,DropDownListExerComptable$} = require('./oexerccomptaRepository').toinit();
const { concatMap } = require('rxjs/operators');
const {seedoexercice$} = require('../oexercice/oexerciceCtrl').toinit();
const { seedOexerccompta$} = require('./oexercomptaSeed').toinit();

const { concat } = require('rxjs');

const oexercomptaCtrl = (function () {
  const seedoexcompta$ = function () {
    return seedOexerccompta$;
  };
  const index$ = function () {
    return getexeccomptas$;
  };
  const getbyid$ = function (id) {
    return getByid$(id);
  };
  const getoexerciceencour$ = function () {
    return getoExerciceEncour$;
  };
  const ddlexerComptable$ = function () {
    return DropDownListExerComptable$;
  };
  const Getcomptawithexercice$ = function () {
    return GetComptaWithExercice$;
  };
  const getoexercice$ = function () {
    return getoExercice$;
  };
  const odasearchby = function (body) {
    return odasearchBy(body);
  };
  const insertnstexercompta$ = function (body) {
    return toCreateExerccomptadata$(body).pipe(concatMap(function (x) {
        return concat(insertExercCompta$(x),seedoexercice$);
      }));
  };

  const updatenstexercompta$ = function (body, requestparamid) {
    return toUpdateExerccomptadata$(body,requestparamid).pipe(concatMap(function (x) {
        return concat(editExercCompta$(x, requestparamid),seedoexercice$);
      }));
  };
  const deletenstexercompta$ = function (requestparamid) {
    return concat(deleteExercCompta$(requestparamid), seedoexercice$);
  };
  function toinit() {
    return {
    index$: index$(),
    getbyid$: getbyid$,
    insert$: insertnstexercompta$,
    update$: updatenstexercompta$,
    delete$: deletenstexercompta$,
    odasearchby: odasearchby,
    getoexerciceencour$: getoexerciceencour$(),
    GetComptaWithExercice$: Getcomptawithexercice$(),
    getoexercice$: getoexercice$(),
    ddlexerComptable$:ddlexerComptable$(),
    seedoexcompta$:seedoexcompta$()
    };
  }

  return {
    toinit: toinit
  };
})();
module.exports = {
  toinit: oexercomptaCtrl.toinit
};
