'use strict';
const {find,map,assign} = require('lodash');
const {getStringValue, isValid, odauditObj}=require('../../SharedKernel/odaUtility').toinit();
const user= (function () {
  let  _arrusers =[];

function toUser (requestBody) {
  return (
    {
      username: requestBody.username,
      password: requestBody.password,
      role: requestBody.role
    });
}

function UpdateUser (result, requestparamid, requestBody) {
  var d = new Date();
if (result) {
  {
    result.id = requestparamid,
    result.username = requestBody.username,
    result.role= requestBody.role,
    result.password= requestBody.password,
    result.ModifiedOn = d;
  }
}
return result;
}


function toinit(){
  return {
    toUser:toUser,
    UpdateUser:UpdateUser
  };

}


return {
  toinit: toinit
};


})();
module.exports= {
  toinit: user.toinit
};
