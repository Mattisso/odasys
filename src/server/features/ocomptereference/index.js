
"use strict";
const _ = require('lodash');
const {insert$,update$,delete$,getallcomptereferences,getbyid$,getloadcomptereferencedata$,seedocomptereference$,index$,odasearchby}=require('./ocomptreferenceCtrl').toinit();

const  index = (function () {

  function toinit() {
    return {
seedocomptereference$:seedocomptereference$,
getocomptreferences$:index$,
getallcomptereferences:getallcomptereferences,
getloadcomptereferencedata$:getloadcomptereferencedata$,
Insert$:insert$,
Update$:update$,
Delete$:delete$,
getByid$:getbyid$,
index$:index$,
odasearchby:odasearchby,
    };
  }

  return {
    toinit: toinit
  };

}
)();
module.exports= {
toinit:index.toinit
};


