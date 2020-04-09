"use strict";
const _ = require('lodash');
// const objqryparams = require('./objQryParams');
const {
isValid,
odareduceArray,
odaremove,
getStringValue,
inArray,
getValue
} = require('./odaUtility').toinit();

const odaFiltered = (function () {
const objQueryByArg = function (objkey, value) {
if (isValid(value) === true) {
const filterArg = `{"${(objkey)}": "${getStringValue(value)}"}`;
const filter = JSON.parse(filterArg);
return filter;
}

};
const _arrQueryByArg = function (objkey, value) {
var filters = [];
_.forEach(value, function (o) {
if (isValid(o) === true) {
    var filterArg = `{"${objkey}" : "${getStringValue(o)}"}`;
    var filter = JSON.parse((filterArg));
    filters.push(filter);
}
});

return filters;
};
const odaByarg = function (key, value) {
if (inArray(value) === false) {
return objQueryByArg(key, value);
} else {
return _arrQueryByArg(key, value);
}
};

const _filterkey = function (obj) {
var filterKeys = Object.keys(obj);
return filterKeys;
};

const filterfromarray = function (_arr, filters) {
var filterKeys;
return _.map(filters, function (o) {
filterKeys = _filterkey(o);
return _.filter(_arr, function (item) {
    return _.every(filterKeys, function (key) {
        if (!o[key].length) {
            return true;
        } else {
            return getValue(o[key]) === getValue(item[key]);
        }
    });
});

});

};
const filterfromObj = function (_arr, filters) {
const filterKeys = _filterkey(filters);
return _.filter(_arr, function (item) {
// validates all filter criteria
return _.every(filterKeys, function (key) {
    if (!filters[key].length) {
        return true;
    } else {
        return getValue(filters[key]) === getValue(item[key]);
    }
});
});
};

const odafilter = function (arr, o) {
var _arr = [];
if (inArray(o) === false && isValid(o) === true) {
return filterfromObj(arr, o);
} else if (inArray(o) === true && isValid(o) === true) {
_arr = filterfromarray(arr, o);
return odareduceArray(_arr);
} else {
return;
}
};
const getodafilter = function (argOne, values) {
//	var values = f;
let filteredocomptereference = odafilter(argOne, values);
return (odareduceArray(filteredocomptereference));
};

const reducegroupby = function (arr) {
var hash = Object.create(null),
grouped = [];
arr.forEach(function (o) {
var key = ['OexercComptaKey', 'OreferenceKey', 'OtableauposteKey'].map(function (k) {
    return o[k];
}).join('|');

if (!hash[key]) {
    hash[key] = {
        'OexercComptaKey': o.OexercComptaKey,
        'OreferenceKey': o.OreferenceKey,
        'OtableauposteKey': o.OtableauposteKey,
        'SoldeDebit': 0,
        'SoldeCredit': 0
    };
    grouped.push(hash[key]);
}
['SoldeCredit', 'SoldeDebit'].forEach(function (k) {
    hash[key][k] += o[k];
});
});
return odaremove(grouped);

};

function toinit() {
return {
odaByarg: odaByarg,
getodafilter: getodafilter,
reducegroupby: reducegroupby
};
}
return {
toinit: toinit
};
})();
module.exports = {
toinit: odaFiltered.toinit
};