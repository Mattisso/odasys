/* eslint-disable  no-console */
/*eslint-disable no-unused-vars */
const express = require('express');
const url = require('url');
const nstbalanceinputsRouter = express.Router();
const {odaByarg} = require('../../server/SharedKernel/odaFiltered').toinit();
const {index$,insert$,delete$,update$,getbyid$,odasearchby} = require('../../server/features/nstbalanceinput/index').toinit();
const {getapistreamdata$,getapiObserver, getapiCreateObserver,getapinotification}=require('../../server/SharedKernel/odaSubscribe').toinit();

nstbalanceinputsRouter.get('/nstbalanceinputs', function (req, res, next) {
  const getdata= index$;
  return  getapistreamdata$(getdata).subscribe(getapinotification(req,res)
  );
});

nstbalanceinputsRouter.get('/nstbalanceinputs/:id', function (req, res, next) {
  console.log(req.url + ' : querying for ' + req.params.id);
  if (req.params.id) {
    const getdata= getbyid$(req.params.id);
    getapistreamdata$(getdata).subscribe(getapinotification(req, res));
  }else {
    next();
  }
});

nstbalanceinputsRouter.post('/nstbalanceinputs', function (req, res, next) {
  let requestBody = req.body;
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

nstbalanceinputsRouter.delete('/nstbalanceinputs/:id', function (req, _res,next) {
  console.log(req.url + ' : querying for ' + req.params.id);
  const getdata= delete$(req.params.id);
  getapistreamdata$(getdata).subscribe(getapiCreateObserver(req));
  next();

    });

nstbalanceinputsRouter.put('/nstbalanceinputs/:id', function (req, res) {
  const requestBody = req.body;
  console.log(req.url + ' : querying for ' + req.params.id);
  const reqparamid = req.params.id;
  const getdata= update$(requestBody, reqparamid);
  getapistreamdata$(getdata).subscribe(getapiCreateObserver(req));

});

module.exports = nstbalanceinputsRouter;
