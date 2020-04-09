"use strict";
const utils = (function () {

const LeftSubstr = function (comptenumber, number) {
    if (number <= 0)
        return "";
    else if (number > String(comptenumber).length)
        return String(comptenumber);
    else
        return String(comptenumber).substring(0, number);
};

const replaceString = function (comptenumber) {
    let arr = [];
    for (let i = 2; i <= 4; i++) {
        arr.push(LeftSubstr(comptenumber, i));
    }
    return arr;
};
const  getFullNameById = function (model, param, callback) {
    model.findOne({ _id: param }, {},
      function (err, data) {
        if (err) throw err;
        callback(null, data);
      });
  };

function toinit() {
    return {
        replaceString: replaceString,
        getFullNameById:getFullNameById
    };
}

return {
    toinit: toinit
};

})();
module.exports = {
toinit: utils.toinit
};
