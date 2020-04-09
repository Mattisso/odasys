"use strict";
//var async = require('async');
/* eslint-disable  no-console */
/* eslint-disable no-unused-vars */
var async = require('async');
var _ = require('lodash');

var objQueriesParams = require('../../objQueriesParams');
var nttCompteBalanceView = require('./nttCompteBalanceView');

//var _createcompte= require('../createcomptebalance');
var Models = require('../../../omodels');

function isValid(val) {
  return !_.isUndefined(val) && !_.isNull(val);
}

function notIsValid(val){
  return _.isUndefined(val) || _.isNull(val);

}

var nttcomptebalance = (function () {

  var searchBy =function (requestBody, callback) {
    var qy = selector(requestBody);
    Models.nttCompteBalance.findOne(qy, {},
      function (err, nttcomptebalance) {
        if (err) {
          throw err;
        }
        else {
          var qyrparm = requestBody._id;
          Models.nttCompteBalanceDetail.find({ nttcomptebalanceKey: qyrparm }, {},
            function (err, nttcomptebalancedetails) {
              if (err) {
                throw err;
              }
              else {
                nttcomptebalance.nttcomptebalancedetails = nttcomptebalancedetails;

                callback(null, nttcomptebalance);

              }
            });

        }
      });

  };

  var compteBalanceExists = function (id) {
  //var reqparamid= objQueriesParams.getid(paramId);
  var getquery = Models.nttCompteBalance.findOne({id:id}, {})
    .populate('nttcomptebalancedetails');
  return getquery;
};
  var comptebalance = null;



  function BuildnttCompteBalance(body) {
comptebalance = new Models.nttCompteBalance(
  {
    'OexercComptaKey':  body.OexercComptaKey,
    'OtableauposteKey': body.OtableauposteKey,
    'OreferenceKey': body.OreferenceKey
  });

body.nttcomptebalancedetails.forEach(function (entry) {
  comptebalance.addBalanceDetail(entry);

});
comptebalance.getTotalSoldedebit;
comptebalance.getTotalSoldecredit;

     // console.log(viewModel)


    // let nttcomptebalancedetails=[];

    return comptebalance;
  }


  function BuildupdateCompteBalance(body) {
    // let nttcomptebalancedetails=[];
    comptebalance = body;
    return comptebalance;
  }



  function toInitializeInstance(body) {
    var balance = BuildnttCompteBalance(body);
    return {
      balance: balance,
      getData: balance.getData()
    };

  }


  function toCompteBalanceDetail(requestparamid, body) {

    return new Models.nttCompteBalanceDetail(
      {
        nttcomptebalanceKey: requestparamid,
        IntitulCompte: body.IntitulCompte,
        SoldeDebit: body.SoldeDebit,
        SoldeCredit: body.SoldeCredit

      });
  }



  function queryselector(requestBody) {
    var selector = false;
    if ((isValid(requestBody.OexercComptaKey)===true) && (isValid(requestBody.OtableauposteKey)===true)
     && (isValid(requestBody.OreferenceKey)===true)) {

      selector = true;
    }
    else {
      selector = false;

    }
    return selector;
  }


  function selector(requestBody) {
    var queryselector;

    if ((isValid(requestBody.OexercComptaKey)===true)
    && (notIsValid(requestBody.OtableauposteKey)===true)
     && (notIsValid(requestBody.OreferenceKey)===true)) {
      queryselector = {
        '$and': [
          { 'OexercComptaKey': requestBody.OexercComptaKey }

        ]
      };
    }
    else if ((isValid(requestBody.OexercComptaKey)===true)
    &&  (isValid(requestBody.OtableauposteKey)===true)
    && (notIsValid(requestBody.OreferenceKey)===true)){

      queryselector = {
        '$and': [
          { 'OexercComptaKey': requestBody.OexercComptaKey },
          { 'OtableauposteKey': requestBody.OtableauposteKey }
        ]
      };
    }

   else if ((isValid(requestBody.OexercComptaKey)===true) && (isValid(requestBody.OtableauposteKey)===true)
   && (isValid(requestBody.OreferenceKey)===true)) {

      queryselector = {
        '$and': [
          { 'OexercComptaKey': requestBody.OexercComptaKey },
          { 'OtableauposteKey': requestBody.OtableauposteKey },
          { 'OreferenceKey': requestBody.OreferenceKey }
        ]
      };
    }
    else {
      queryselector = {};

    }
    return queryselector;
  }


  function toUpdateCompteBalance(result, requestparamid, requestBody) {
    var d = new Date();
   // result = result || {};
//requestBody = requestBody || {};
var obj=requestBody.CompteBalanceData;
    result._id = requestparamid,
      result.OexercComptaKey = obj.OexercComptaKey,
      result.OtableauposteKey = obj.OtableauposteKey,
      result.OreferenceKey = obj.OreferenceKey;
    result.ModifiedOn = d;
    return result;
  }




  function log(detail) {
    if (comptebalance !== null) {
      comptebalance.addBalanceDetail(detail);
      nttCompteBalanceView.render(comptebalance);
      return "Thanks for logging your Detail.";
    }
    else {
      return "Please wait for user details to load.";
    }

  }
  function toinit() {
    return {
      log: log,
      toInitializeInstance: toInitializeInstance,
      BuildupdateCompteBalance: BuildupdateCompteBalance,
      toCompteBalanceDetail: toCompteBalanceDetail,
      toUpdateCompteBalance: toUpdateCompteBalance,
      selector: selector,
      queryselector: queryselector,
      compteBalanceExists:compteBalanceExists,
      searchBy:searchBy

    };

  }

  return {
    toinit: toinit
  };

})();

module.exports = {
  toinit: nttcomptebalance.toinit
};
