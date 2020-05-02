/* eslint-disable  no-console */
/*eslint-disable no-unused-vars */
const express = require('express');
const url = require('url');
const _=require('lodash');
const ostableaupostesRouter = express.Router();
const {odaByarg} = require('../../server/SharedKernel/odaFiltered').toinit();
const {index$,insert$,delete$,update$,getbyid$,odasearchby} = require('../../server/features/ostableauposte/index').toinit();
const {getapistreamdata$,getapiObserver, getapiCreateObserver, getapinotification}=require('../../server/SharedKernel/odaSubscribe').toinit();

ostableaupostesRouter.get('/ostableaupostes', function (req, res, next) {
  const getdata = index$;
  return  getapistreamdata$(getdata).subscribe(getapinotification(req,res)
  );

});

ostableaupostesRouter.get('/ostableaupostes/:id', function (req, res, next) {
  console.log(req.url + ' : querying for ' + req.params.id);
  if (req.params.id) {
    const getdata = getbyid$(req.params.id);
    getapistreamdata$(getdata).subscribe(getapinotification(req, res));
  } else {
    next();
  }
});

ostableaupostesRouter.post('/ostableaupostes', function (req, res, next) {
  let requestBody = req.body;
  const _comptenumber = odaByarg('StableauName', requestBody.StableauName);
  odasearchby(_comptenumber)
  .exec(function (err, data) {
    console.log(data);
    if (err) {
      return next(err);
    }
    if (data) {
      res.status(403).send({
        success: false,
        message: ` StableauName: ${requestBody.StableauName}  already exists`
      });
    }
    if (!data) {
      const getdata = insert$(requestBody);
      getapistreamdata$(getdata).subscribe(getapiCreateObserver(req));
      next();
    }
  });
});

ostableaupostesRouter.put('/ostableaupostes/:id', function (req, res, next) {
  const requestBody = req.body;
  console.log(req.url + ' : querying for ' + req.params.id);
  var reqparamid = req.params.id;
  const getdata = update$(requestBody, reqparamid);
  getapistreamdata$(getdata).subscribe(getapiCreateObserver(req));
});

ostableaupostesRouter.delete('/ostableaupostes/:id', function (req, res, next) {

  console.log(req.url + ' : querying for ' + req.params.id);
  const getdata = delete$(req.params.id);
  getapistreamdata$(getdata).subscribe(getapiCreateObserver(req));
  next();
});
module.exports = ostableaupostesRouter;
