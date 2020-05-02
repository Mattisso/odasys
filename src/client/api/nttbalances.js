/* eslint-disable  no-console */
/*eslint-disable no-unused-vars */

let express = require('express');
let url = require('url');
let nttbalancesRouter = express.Router();

const {odaByarg} = require('../../server/SharedKernel/odaFiltered').toinit();
const {index$,index$$, insert$,delete$,update$,getbyid$,odasearchby,getallbyid$} = require('../../server/features/nttbalance/index').toinit();
const {getapistreamdata$, getapiCreateObserver,getapinotification}=require('../../server/SharedKernel/odaSubscribe').toinit();
nttbalancesRouter.get('/nttbalances', function (req, res) {
  const getdata= index$$;
  return  getapistreamdata$(getdata).subscribe(getapinotification(req,res)
  );

});


nttbalancesRouter.get('/nttbalances/:id', function(req, res, next){
  console.log(req.url + ' : querying for ' + req.params.id);
  if (req.params.id) {
    const getdata= getallbyid$(req.params.id);
    getapistreamdata$(getdata).subscribe(getapinotification(req, res));

  } else {
    next();
  }
}
);


nttbalancesRouter.post('/nttbalances', function (req, res, next) {

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

nttbalancesRouter.put('/nttbalances/:id', function (req, res, next) {
  let requestBody = req.body;
  console.log(req.url + ' : querying for ' + req.params.id);
  var reqparamid = req.params.id;
  const getdata= update$(requestBody, reqparamid);
  getapistreamdata$(getdata).subscribe(getapiCreateObserver(req));
});


nttbalancesRouter.delete('/nttbalances/:id', function (req, res, next) {
  console.log(req.url + ' : querying for ' + req.params.id);
  const getdata= delete$(req.params.id);
  getapistreamdata$(getdata).subscribe(getapiCreateObserver(req));
  next();
});

module.exports = nttbalancesRouter;
