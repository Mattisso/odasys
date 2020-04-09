const { Observable,pipe } = require('rxjs');
  function todeleteBuild(requestBody) {
    let DetailCount = 0,
    arrArg = [];
    var _getdata = toapiUpdateInstance(requestBody);
    // console.log(JSON.stringify(_getdata));
    if ((!hasitem(_getdata, arrArg)))
      arrArg.push(_getdata);

    if (isValid(arrArg.length) === true) {
      DetailCount = arrArg.length;
    }
    return {
      odasum: {
        DetailCount: DetailCount,
      },
      arrArg: arrArg.slice()
    };
  }
  const toDeleteInstance = function (body) {
    const data = todeleteBuild(body);
    return data;
  };

  const toDeleteInstance=(function(){
function toinit(){
return {
  toDeleteInstance:toDeleteInstance
}
}
return {
  toinit:toinit
}
  })()
  module.exports={

  }