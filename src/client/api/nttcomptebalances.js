/* eslint-disable  no-console */
/*eslint-disable no-unused-vars */
const express = require('express');
const nttcomptebalanceRouter = express.Router();
const {odaByarg} = require('../../server/SharedKernel/odaFiltered').toinit();
const {index$,insert$,delete$,update$,getbyid$,odasearchby,index$$,getcombinedbyid$,insertcomptebalancewithDetail$} = require('../../server/features/nttcomptebalance/index').toinit();
const {getapistreamdata$,getapiObserver, getapiCreateObserver,getapinotification}=require('../../server/SharedKernel/odaSubscribe').toinit();

nttcomptebalanceRouter.get('/nttcomptebalances', function (req, res, next) {
  const getdata= index$$;
  return  getapistreamdata$(getdata).subscribe(getapinotification(req,res)
  );
});

nttcomptebalanceRouter.get('/nttcomptebalances/:id', function (req, res, next) {
  console.log(req.url + ' : querying for ' + req.params.id);
  if (req.params.id) {
    const getdata= getcombinedbyid$(req.params.id);
    getapistreamdata$(getdata).subscribe(getapinotification(req, res));
  }else {
    next();
  }
});


nttcomptebalanceRouter.post('/nttcomptebalances', function (req, res, next) {
  const requestBody = req.body;
  const _comptenumber = odaByarg('OreferenceKey',requestBody.OreferenceKey);
  odasearchby(_comptenumber)
    .exec(function (err, data) {
      if (err) {
        return next(err);
      }
      if (data) {
        res.status(403).send({
          success:false,
          message:` OreferenceKey: ${requestBody.OreferenceKey}  already exists`
        });
      }
      if(!data){
        const getdata= insertcomptebalancewithDetail$(requestBody);
        getapistreamdata$(getdata).subscribe(getapiCreateObserver(req));
        next();
          }
    });
});

nttcomptebalanceRouter.delete('/nttcomptebalances/:id', function (req, res, next) {
  console.log(req.url + ' : querying for ' + req.params.id);
  const getdata= delete$(req.params.id);
  getapistreamdata$(getdata).subscribe(getapiCreateObserver(req));
  next();
});

nttcomptebalanceRouter.put('/nttcomptebalances/:id', function (req, res, next) {
  const requestBody = req.body;
  console.log(req.url + ' : querying for ' + req.params.id);
  var reqparamid = req.params.id;
  const getdata= update$(requestBody, reqparamid);
  getapistreamdata$(getdata).subscribe(getapiCreateObserver(req));
});
module.exports = nttcomptebalanceRouter;
