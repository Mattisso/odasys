
"use strict";
const _ = require('lodash');
const {index$,
  getall,
  getbyid$,
  insert$,
  update$,
  odasearchby,
  delete$,seedotableauposte$,ddlotableauposteWithcomptebalances$
} = require('./otableauposteCtrl').toinit();
const index = (function () {
  function toinit() {
    return {
seedotableauposte$: seedotableauposte$,
getall: getall,
index$: index$,
getbyid$: getbyid$,
insert$: insert$,
update$: update$,
odasearchby: odasearchby,
ddlotableauposteWithcomptebalances$:ddlotableauposteWithcomptebalances$,
delete$: delete$
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


