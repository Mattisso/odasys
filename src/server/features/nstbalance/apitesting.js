/* eslint-disable  no-console */
///*eslint-disable no-unused-vars */


const _ = require('lodash');
const fs = require("fs");
const path = require('path');
const outdirname = path.join(__dirname, '../../DataService/data//source/data.json');
const  callbackdirname = path.join(__dirname, '../../DataService/data/source/callbackdata.json');
// var nstbalancedata=require('../load/nstbalance/nstbalancedata');

const { combineLatest, Observable, of, pipe, from } = require('rxjs');
const { filter, map, tap, pluck, take, find, distinct, shareReplay } = require('rxjs/operators');
const {getstreamdata$, odagetObserver,getapistreamdata$,getapiObserver,getapiCreateObserver}=require('../../SharedKernel/odaSubscribe').toinit();

//var async = require('async')
require('../../config/ohadb').connectserver();

//const {Loadnstbalanceinput$} = require('./index').toinit();
const {index$$} = require('./index').toinit();
const  obj ={
  OreferenceKey: '5df3c0414755521574fef03b',
  OtableauposteKey: '5df3c04a4755521574fef2c3',
  OexercComptaKey: '5df3c02e4755521574feefba',
  NumCompte: '491800',
  IntitulCompte: 'Mensah',
  SoldeCredit: 13450000,
  SoldeDebit: 0,
};

const objupdate={
  id: '5df6a72dc8f26519b8c530c6',
 /*  OreferenceKey: '5df3c0414755521574fef03b',
  OtableauposteKey: '5df3c04a4755521574fef2c3',
  OexercComptaKey: '5df3c02e4755521574feefba', */
  NumCompte: '491100',
  IntitulCompte: 'Mensah',
  SoldeCredit: 10000,
  SoldeDebit: 0,
  CreatedOn: "2019-12-15T21:35:41.857Z",
  ModifiedOn: "2019-12-15T21:35:41.857Z",
  CreatedBy: 'Admin',
  ModifiedBy: 'Admin'
};
//console.log(nstbalanceinputInsert$(obj));
//Update$(objupdate,'5de4209ff5f8b20fe8229f97');
// insert$(obj);
// getByid$('5de4209ff5f8b20fe8229f97');
// Delete$('5de4209ff5f8b20fe8229f97');

const getLoaddData$ =  index$$;// getnstbalance$('5dfa4246b78f6f289c0d9b90');  // Update$(objupdate,'5df6a72dc8f26519b8c530c6'); //index$();

getstreamdata$(getLoaddData$).subscribe(odagetObserver());

