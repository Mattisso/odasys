/* eslint-disable  no-console */
/*eslint-disable no-unused-vars */

const express = require('express');

const userRouter = express.Router();
const User = require('../../server/omodels/modelsSchema/index').toinit().User;
const jwt = require('jsonwebtoken');
const config = require('../../server/config/database');
const bcrypt = require('bcryptjs');
const {odaByarg} = require('../../server/SharedKernel/odaFiltered').toinit();
const {index$,insert$,delete$,update$,getbyid$,odasearchby} = require('../../server/features/user/index').toinit();
const {getapistreamdata$,getapiObserver, getapiCreateObserver,getapinotification}=require('../../server/SharedKernel/odaSubscribe').toinit();

//users
  userRouter.get('/users', function(req, res, next){
    const getdata= index$;
    return  getapistreamdata$(getdata).subscribe(getapinotification(req,res)
    );
  //  next();
});


  userRouter.get('/users/:id', function(req, res, next){
    console.log(req.url + ' : querying for ' + req.params.id);
    if (req.params.id) {
      const getdata= getbyid$(req.params.id);
      getapistreamdata$(getdata).subscribe(getapinotification(req, res));
    }else {
      next();
    }

 }
 );


  userRouter.post('/login',function (req, res, next) {
    User.getAuthenticated(req.body.username, req.body.password, function (err, user, reason) {
      if (err)
        throw err;

      // login was successful if we have a user
      if (user) {
        // handle login success
        const payload = {
          id: user.id,
          username: user.username,
          role: user.role
        };

        const token = jwt.sign(payload, config.JWT_SECRET, { expiresIn: '2h' });

        return res.status(200).send({
          id: user.id,
          username: user.username,
          role: user.role,
          token: token
        });
      }
      else {
        return res.status(403).send({
          success: false,
          message: 'Access Denied'
        });
      }

    });

  });


    userRouter.post('/register', function (req, res, next) {
      const requestBody = req.body;
      const _comptenumber = odaByarg('username',requestBody.username);
      odasearchby(_comptenumber)
        .exec(function (err, data) {
          console.log(data);
          if (err) {
            return next(err);
          }
          if (data) {
            res.status(403).send({
              success:false,
              message:` username: ${requestBody.username}  already exists`
            });
          }
          if(!data){
            const getdata= insert$(requestBody);
            getapistreamdata$(getdata).subscribe(getapiCreateObserver(req));
            next();

          }

        });



    });
    userRouter.put('/users/:id', function (req, res, next) {
      const requestBody = req.body;
      console.log(req.url + ' : querying for ' + req.params.id);
      var reqparamid = req.params.id;
      const getdata= update$(requestBody, reqparamid);
      getapistreamdata$(getdata).subscribe(getapiCreateObserver(req));
    });
    userRouter.delete('/users/:id', function (req, res, next) {
      console.log(req.url + ' : querying for ' + req.params.id);
      const getdata= delete$(req.params.id);
      getapistreamdata$(getdata).subscribe(getapiCreateObserver(req));
      next();
    });
    module.exports = userRouter;
