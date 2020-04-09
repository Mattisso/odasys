/* eslint-disable  no-console */
///*eslint-disable no-unused-vars */
const _ = require('lodash');
const fs = require("fs");
const path = require('path');
var async = require('async');
const outdirname = path.join(__dirname, '../../DataService/data//source/data.json');
const  callbackdirname = path.join(__dirname, '../../DataService/data/source/callbackdata.json');
const {createData,editData}=require('../../testing/data/comptebalancedata').toinit();
const {getstreamdata$, odagetObserver,getapistreamdata$,getapiObserver}=require('../../SharedKernel/odaSubscribe').toinit();

const {odaremove, odareduceArray}=require('../../SharedKernel/odaUtility').toinit();
const { combineLatest, Observable, of, pipe, from } = require('rxjs');
const { filter, map, tap, pluck, take, find, distinct, shareReplay } = require('rxjs/operators');
//var async = require('async')
// require('../../config/ohadb').connectserver();

const{comptebalancedata}=require('../../testing/data/index').toinit();
const {getodaAggreateData} =require('../../SharedKernel/odaStats').toinit();
const { toCreateBalancedata$} = require('./nttcomptebalanceRepository').toinit();

const getoreportdetail$ = toCreateBalancedata$; 


getstreamdata$(getoreportdetail$(createData)).subscribe(odagetObserver());
