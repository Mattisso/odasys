/* eslint-disable  no-console */
///*eslint-disable no-unused-vars */

const _ = require('lodash');
const fs = require("fs");
const path = require('path');
const outdirname = path.join(__dirname, '../../DataService/data//source/data.json');
const  callbackdirname = path.join(__dirname, '../../DataService/data/source/callbackdata.json');
const {comptebalancedata}=require('../../testing/data/index').toinit();
// var nstbalancedata=require('../load/nstbalance/nstbalancedata');

const { combineLatest, Observable, of, pipe, from } = require('rxjs');
const { filter, map, tap, pluck, take, find, distinct, shareReplay } = require('rxjs/operators');
const {getstreamdata$, odagetObserver,getapistreamdata$,getapiObserver}=require('../../SharedKernel/odaSubscribe').toinit();

//var async = require('async')
require('../../config/ohadb').connectserver();

//const {Loadnstbalanceinput$} = require('./index').toinit();
const {Insert$,Update$,Delete$,getByid$,index$$,insertcomptebalancewithDetail$} = require('./index').toinit();
const  obj ={
      "RefCode": "UL",
      "TableauName": "tblProduidts",
      "oExercComptaId": "2006",
      "NumCompte": "666666",
      "IntitulCompte": "akoli",
      "SoldeDebit":12000
};

const  obj2 ={
  "RefCode": "ac",
  "TableauName": "tblProduidts",
  "oExercComptaId": "2006",
  "NumCompte": "10222",
  "IntitulCompte": "Mensah",
  "SoldeCredit":98000
};
const objupdate={
  "_id" : "5de4209ff5f8b20fe8229f97",
  "NumCompte" : "81288",
  "IntitulCompte" : "efoetesing",
  "SoldeDebit" : 4952197,
  "SoldeCredit" : 0,
  "CreatedOn" : ("2019-12-01T20:20:47.575Z"),
  "ModifiedOn" : ("2019-12-01T20:20:47.575Z"),
  "CreatedBy" : "Admin",
  "ModifiedBy" : "Admin",
  "__v" : 0
};
//console.log(nstbalanceinputInsert$(obj));
//Update$(objupdate,'5de4209ff5f8b20fe8229f97');
// insert$(obj);
// getByid$('5de4209ff5f8b20fe8229f97');
// Delete$('5de4209ff5f8b20fe8229f97');

const getLoaddData$ =  index$$; //insertcomptebalancewithDetail$(comptebalancedata.createData);
getstreamdata$(getLoaddData$).subscribe(odagetObserver());
