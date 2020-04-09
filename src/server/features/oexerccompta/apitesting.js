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
const {getstreamdata$, odagetObserver,getapistreamdata$,getapiObserver}=require('../../SharedKernel/odaSubscribe').toinit();

//var async = require('async')
require('../../config/ohadb').connectserver();

//const {Loadnstbalanceinput$} = require('./index').toinit();
const {update$, delete$ } = require('./index').toinit();
const {toCreateExerccomptadata$,toUpdateExerccomptadata$} = require('../oexerccompta/oexerccomptaRepository').toinit();

const {toseedOexercicedata$} = require('../oexercice/index').toinit();
const  obj ={
    "oExercComptaId" :"2008",
    "DateDebut" : "2008-01-31T23:21:59.010Z",
    "Datefin" : "2008-12-31T23:21:59.010Z"
  };


const objupdate={
  "_id" : "5dbac506aa1fc24648be97d1",
        "Cloture" : true,
        "isActive" : true,
        "oExercComptaId" : "2006",
  "DateDebut" : ("2006-01-01T23:21:59.010Z"),
  "Datefin" : ("2006-12-31T23:21:59.010Z"),
  "CreatedOn" : ("2019-12-09T00:17:05.787Z"),
  "ModifiedOn" : ("2019-12-09T00:17:05.787Z"),
  "CreatedBy" : "Admin",
  "ModifiedBy" : "Admin",
  "id" : "5dbac506aa1fc24648be97d1",
};

//Update$(objupdate,'5de4209ff5f8b20fe8229f97');
// insert$(obj);
//getAlloexerccompta$();
// getByid$('5de4209ff5f8b20fe8229f97');
// delete$('5de4209ff5f8b20fe8229f97');5ded92811d2b1a18540e9e41

const getLoaddData$ = delete$('5e154acceb22ba250093d660');
//update$(objupdate,'5dbac506aa1fc24648be97d1');
///delete$('5e0ff441a04861607811d19a') //insert$$(obj); //DropDownListexerComptable$ //getByid$ '5dbb6c97c2d9871f78c16a2a');

getstreamdata$(getLoaddData$).subscribe(odagetObserver());

