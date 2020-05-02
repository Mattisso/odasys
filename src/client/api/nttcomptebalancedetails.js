
/* eslint-disable  no-console */
/*eslint-disable no-unused-vars */
const path = require('path');
const express = require('express');
const async = require('async');
const nttcomptebalancedetailRouter = express.Router({ mergeParams: true });
const {odaByarg} = require('../../server/SharedKernel/odaFiltered').toinit();
const {index$,insert$,delete$,update$,getbyid$,odasearchby} = require('../../server/features/nttcomptebalancedetail/index').toinit();
const {getapistreamdata$,getapiObserver, getapiCreateObserver,getapinotification}=require('../../server/SharedKernel/odaSubscribe').toinit();


/*
var nttCompteBalance = require('../omodels').nttCompteBalance;
var nttCompteBalanceDetail = require('../omodels').nttCompteBalanceDetail; */

nttcomptebalancedetailRouter.get('/nttcomptebalancedetails', function (req, res, next) {
  const getdata= index$;
  return  getapistreamdata$(getdata).subscribe(getapinotification(req,res)
  );
});


nttcomptebalancedetailRouter.get('/nttcomptebalancedetails/:id', function (req, res, next) {
  console.log(req.url + ' : querying for ' + req.params.id);
  if (req.params.id) {
    const getdata= getbyid$(req.params.id);
    getapistreamdata$(getdata).subscribe(getapinotification(req, res));
  }else {
    next();
  }
});

nttcomptebalancedetailRouter.post('/nttcomptebalancedetails', function (req, res, next) {
  const requestBody = req.body;
  const _comptenumber = odaByarg('NumCompte',requestBody.NumCompte);
  odasearchby(_comptenumber)
    .exec(function (err, data) {
      console.log(data);
      if (err) {
        return next(err);
      }
      if (data) {
        res.status(403).send({
          success:false,
          message:`NumCompte: ${requestBody.NumCompte}  already exists`
        });
      }
      if(!data){
        const getdata= insert$(requestBody);
        getapistreamdata$(getdata).subscribe(getapiCreateObserver(req));
        next();
      }

    });
});

nttcomptebalancedetailRouter.delete('/nttcomptebalancedetails/:id', function (req, res, next) {
  console.log(req.url + ' : querying for ' + req.params.id);
  const getdata= delete$(req.params.id);
  getapistreamdata$(getdata).subscribe(getapiCreateObserver(req));
  next();
});

nttcomptebalancedetailRouter.put('/nttcomptebalancedetails/:id', function (req, res, next) {
  const requestBody = req.body;
  console.log(req.url + ' : querying for ' + req.params.id);
  const reqparamid = req.params.id;
  const getdata= update$(requestBody, reqparamid);
  getapistreamdata$(getdata).subscribe(getapiCreateObserver(req));
next();


});
module.exports = nttcomptebalancedetailRouter;
