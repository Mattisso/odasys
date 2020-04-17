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
const {insert$,update$,Delete$,getByid$,index$} = require('./index').toinit();
const {toCreateOComptedata$}=require('../ocompte/ocompteRepository').toinit();
const  obj ={
  "CompteNumber": '485'
};


//console.log(nstbalanceinputInsert$(obj));
//Update$(objupdate,'5e6c1d38f83ac10fd8de514d');
// insert$(obj);
// getByid$('getByid');
// Delete$('5de4209ff5f8b20fe8229f97');

//index$
const getLoaddData$ = toCreateOComptedata$;

/* update$(objupdate,'5e6c1d38f83ac10fd8de514d'); */
//toUpdateOComptedata$(objupdate)
/* update$(objupdate,'5e6c1d38f83ac10fd8de514d'); */
//index$;

//update$(objupdate,//'5e6c1d38f83ac10fd8de514d')
//index$

/* update$(objupdate,'5e6c1d38f83ac10fd8de514d') */

//index$ //insert$(obj);

getstreamdata$(getLoaddData$(obj)).subscribe(odagetObserver());

