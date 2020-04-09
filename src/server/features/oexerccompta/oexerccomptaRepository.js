/* eslint-disable  no-console */
/* eslint-disable no-unused-vars */
const _ = require('lodash');
const  {oExercCompta} = require('../../omodels/modelsSchema/index').toinit();
const {getoexercices$} = require('../oexercice/').toinit();
const {odaByarg,getodafilter} =require('../../SharedKernel/odaFiltered').toinit();
const {togetoexerccompta,toUpdateOexercompta, staticDropListExerComptable, toInitOexerccomptaInstance}=require('./staticOxerccompta').toinit();
const {getobjOexercCompta} =require('../../SharedKernel/staticObjects').toinit();
const { combineLatest, Observable, pipe } = require('rxjs');
const { map} = require('rxjs/operators');
const {svcodasave$, svcodaApiDel$,svcodaSearchBy}=require('../../SharedKernel/odaservice/odaservice').toinit();
const {getodaindex$, odaindex,getodaByid$,getodaApiByid$,getodaindexapi$}=require('../../SharedKernel/odaservice/dataservices').toinit();
const {svctoUpdateInstance$, toInitCustomInstance,svctoInitCustomInstance$,svcapiupdate$}=require('../../sharedkernel/odainstance/index').toinit(); 
const oexerccomptaRepository = (function () {
  const toInitializeFinalInstance = function (model, body) {
    const data = toInitCustomInstance(model, body,toInitOexerccomptaInstance);
    return data;
  };
  const index = function (callback) {
    return odaindex(oExercCompta, togetoexerccompta, callback);
  };
  const getoExerciceEncour$ = Observable.create(function (observer) {
      try {
        return odaindex(oExercCompta, togetoexerccompta, function (err, data) {
          if (err) {
            observer.next(err);
          } else {
            const finalObj = _.maxBy(_.map(_.map(data, 'oExercComptaId'), _.ary(parseInt, 1)));
            const getcurrent = getobjOexercCompta(data, _.toString(finalObj)).odaObject();
            observer.next(getcurrent);
            setTimeout(() => {
              observer.complete();
            }, 100);
          }
        });
      } catch (err) {
        observer.error(err);
      }
    });
    const getexeccomptas$ =  function() {
      return  getodaindex$(oExercCompta, togetoexerccompta);
    };

    const getapiexeccomptas$ =  function() {
      return  getodaindexapi$(oExercCompta);
    };

    const getapiByid$ = function (requestparamid) {
      return  getodaApiByid$(oExercCompta, requestparamid,getobjOexercCompta);
    };

  const GetComptaWithExercice$ = combineLatest(getexeccomptas$(), getoexercices$).pipe(
      //  tap(ev => console.log(ev)),
      map(function ([getoexcomptas, getoexercices]) {
        const filteredvalue = _.map(getoexercices, 'OexercComptaKey');
        return getodafilter(getoexcomptas, odaByarg('id', filteredvalue));
      }));

      const _DropDownListExerComptable = pipe(
        map(function (n) {
          return staticDropListExerComptable(n);
        })
      );
      const DropDownListExerComptable$ = _DropDownListExerComptable(getexeccomptas$());

  const toCreateExerccomptadata$ = function (requestBody) {

    return svctoInitCustomInstance$(oExercCompta, requestBody, toInitializeFinalInstance);
  };
  /* const toCreateExerccomptadata$ = function (requestBody) {

    return svctoInitializeInstance$(oExercCompta, requestBody, toOexercompta);
  }; */

  const toUpdateExerccomptadata$ = function (requestBody) {
    return svctoUpdateInstance$(requestBody, toUpdateOexercompta);
  };

  const insertExercCompta$ = function (arr) {
    return svcodasave$(arr);
  };

  const editExercCompta$ = function (body, requestparamid) {
    return (svcapiupdate$(oExercCompta, body, requestparamid));
  };
  const odasearchBy = function (body) {
    return svcodaSearchBy(oExercCompta, body);
  };
  const deleteExercCompta$ = function (requestparamid) {
    return  svcodaApiDel$(oExercCompta, requestparamid);
  };

  function toinit() {
    return {
      getoExercice$: getoexercices$,
      index: index,
      GetComptaWithExercice$: GetComptaWithExercice$,
      getoExerciceEncour$: getoExerciceEncour$,
      getexeccomptas$: getapiexeccomptas$(),
      getByid$: getapiByid$,
      toCreateExerccomptadata$: toCreateExerccomptadata$,
      insertExercCompta$: insertExercCompta$,
      toUpdateExerccomptadata$: toUpdateExerccomptadata$,
      editExercCompta$: editExercCompta$,
      odasearchBy: odasearchBy,
      deleteExercCompta$: deleteExercCompta$,
      DropDownListExerComptable$:DropDownListExerComptable$

    };
  }

  return {
    toinit: toinit
  };

})();
module.exports = {
  toinit: oexerccomptaRepository.toinit
};
