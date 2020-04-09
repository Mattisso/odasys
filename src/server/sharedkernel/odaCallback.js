const odaCallback=(function(){

  const getstreams = function(fn){
    let odata;
   return  fn(function(err, data){
      if(err) console.log(err)
      console.log(data[9])
   return data[9];
    })
    // return odata
  }
  function toinit() {
    return {
      getstreams:getstreams
    }
  }
  return {
    toinit:toinit
  }

})()
module.exports={
  toinit:odaCallback.toinit

}