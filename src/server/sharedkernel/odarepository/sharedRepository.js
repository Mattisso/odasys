"use strict";
const _ = require('lodash')
const Model = require('../../omodels/modelsSchema/index').toinit();
const { getodaindex$ } = require('../odaservice/dataservices').toinit();
const odaObjects = require('../odaObjects').toinit();
const {isValid}=require('../odaUtility').toinit();
const {getobjOcompte,getobjOstableauposte,getobjOstblarea,getobjOtableauposte,getobjOreference} = require('../staticObjects').toinit();
const {getObshareddata$ } = require('../odaSubscribe').toinit();

const { combineLatest, pipe, concat} = require('rxjs');
const { map ,shareReplay} = require('rxjs/operators');

const sharedRepository = (function () {
  const getsrdnstbalances$ = function () {
    const getdata$ = getodaindex$(Model.nstBalance, odaObjects.togetnstbalance);
    return getObshareddata$(getdata$);
  };
  const getsrdnstbalanceinputes$ = function () {
    const getdata$ = getodaindex$(Model.nstBalanceInput, odaObjects.togetnstbalanceinput);
    return getObshareddata$(getdata$);
  };
  const getsrdnttbalances$ = function () {
    const getdata$ = getodaindex$(Model.nttBalance, odaObjects.togetnttbalance);
    return getObshareddata$(getdata$);

  };
  const getsrdocomptes$ = function () {
    const getdata$ = getodaindex$(Model.oCompte, odaObjects.togetocompte);
    return getObshareddata$(getdata$);
  };
  const getsrdexeccomptas$ = function () {
    const getdata$ = getodaindex$(Model.oExercCompta, odaObjects.togetoexerccompta);
    return getObshareddata$(getdata$);
  };
  const getsrdoExercices$ = function () {
    const getdata$ = getodaindex$(Model.oExercice, odaObjects.togetoexercice);
    return getObshareddata$(getdata$);
  };
  const getsrdostableaupostes$ = function () {
    const getdata$ = getodaindex$(Model.oStableauPoste, odaObjects.togetostableauposte);
    return getObshareddata$(getdata$);
  };
  const getsrduser$ = function () {
    const getdata$ = getodaindex$(Model.User, odaObjects.togetuser);
    return getObshareddata$(getdata$);
  };
  const getsrdcomptebalances$ = function () {
    const getdata$ = getodaindex$(Model.nttCompteBalance, odaObjects.togetnttcomptebalance);
    return getObshareddata$(getdata$);
  };
  const getsrdcomptebalanceDetails$ = function () {
    const getdata$ = getodaindex$(Model.nttCompteBalanceDetail, odaObjects.togetnttcomptebalanceDetail);
    return getObshareddata$(getdata$);
  };
  const getsrdocomptreferences$ = function () {
    const getdata$ = getodaindex$(Model.OcompteReference, odaObjects.togetocomptereference);
    return getObshareddata$(getdata$);
  };
  const getsrdolevels$ = function () {
    const getdata$ = getodaindex$(Model.olevel, odaObjects.togetolevel);
    return getObshareddata$(getdata$);
  };
  const getsrdoreferences$ = function () {
    const getdata$ = getodaindex$(Model.oReference, odaObjects.togetoreference);
    return getObshareddata$(getdata$);
  };

  const getsrdostblareas$ = function () {
    const getdata$ = getodaindex$(Model.oStblArea, odaObjects.togetostblarea);
    return getObshareddata$(getdata$);
  };
  const getsrdreportDetails$ = function () {
    const getdata$ = getodaindex$(Model.oReportDetail, odaObjects.togetoreportdetail);
    return getObshareddata$(getdata$);
  };
  const getsrdreportheaders$ = function () {
    const getdata$ = getodaindex$(Model.oReportHeader, odaObjects.togetoreportheader);
    return getObshareddata$(getdata$);
  };
  const getsrdotableaupostes$ = function () {
    const getdata$ = getodaindex$(Model.oTableauPoste, odaObjects.togetotableauposte);
    return getObshareddata$(getdata$);
  };
  const getocomptreferences$ = combineLatest(getsrdocomptreferences$(), getsrdoreferences$(), getsrdocomptes$(), getsrdostblareas$(), getsrdostableaupostes$(), getsrdotableaupostes$()).pipe(//   tap(ev => console.log(ev)),

      map(function ([getocomptreferencindex, getoreferences, getocomptes, getostblareas, getostableaupostes, getotableaupostes]) {
        let neobj;
        neobj = _.map(getocomptreferencindex, function (obj) {
            const Objocompte = getobjOcompte(getocomptes, obj.OcompteKey).filteredObject();
            const Objoreference = getobjOreference(getoreferences, obj.OreferenceKey).filteredObject();
            const Objosblarea = getobjOstblarea(getostblareas, obj.OstblareaKey).filteredObject();
            const Objostableauposte = getobjOstableauposte(getostableaupostes, obj.OstableauposteKey).filteredObject();
            const Objotableauposte = getobjOtableauposte(getotableaupostes, obj.OtableauposteKey).filteredObject();
            if (isValid(Objocompte) === true && isValid(Objoreference) === true && isValid(Objosblarea) === true && isValid(Objostableauposte) === true && isValid(Objotableauposte) === true) {
              return _.assign({},{'Exception': obj.Exception,'Taux': obj.Taux},Objocompte,Objoreference,Objosblarea,Objostableauposte,Objotableauposte);
              /* return ({
                "OreferenceKey": Objoreference.id,
                "TableauName": Objotableauposte.TableauName,
                "RefCode": Objoreference.RefCode,
                "Description": Objoreference.Description,
                "fullDescription": Objoreference.fullDescription,
                "OcompteKey": Objocompte.id,
                "CompteNumber": Objocompte.CompteNumber,
                "OstblareaKey": Objosblarea.id,
                "AreaShortName": Objosblarea.AreaShortName,
                "OstableauposteKey": Objostableauposte.id,
                "StableauName": Objostableauposte.StableauName,
                "OtableauposteKey": Objotableauposte.id,
                'Exception': obj.Exception,
                'Taux': obj.Taux,
              }); */
            }
          });
        return neobj;
      }),
      shareReplay(1));
  //  const getsrdolevels$ const getsrdoreferences$   const getsrdreportDetails$  const getsrdreportheaders$ let getostblareas$   const getsrdotableaupostes$
  function toinit() {
    return {
      getsrdnstbalances$: getsrdnstbalances$(),
      getsrdnstbalanceinputes$: getsrdnstbalanceinputes$(),
      getsrdnttbalances$: getsrdnttbalances$(),
      getsrdocomptes$: getsrdocomptes$(),
      getsrdexeccomptas$: getsrdexeccomptas$(),
      getsrdoExercices$: getsrdoExercices$(),
      getsrdostableaupostes$: getsrdostableaupostes$(),
      getsrdcomptebalances$: getsrdcomptebalances$(),
      getsrdolevels$: getsrdolevels$(),
      getsrdoreferences$: getsrdoreferences$(),
      getsrduser$: getsrduser$(),
      getsrdostblareas$: getsrdostblareas$(),
      getsrdreportDetails$: getsrdreportDetails$(),
      getsrdreportheaders$: getsrdreportheaders$(),
      getsrdotableaupostes$: getsrdotableaupostes$(),
      getsrdocomptreferences$: getsrdocomptreferences$(),
      getocomptreferences$:getocomptreferences$,
      getsrdcomptebalanceDetails$:getsrdcomptebalanceDetails$()
    };
  }
  return {
    toinit: toinit
  };
})();
module.exports = {
  toinit: sharedRepository.toinit
};
