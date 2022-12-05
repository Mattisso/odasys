
const ocomptedata = (function () {

    const arrocomptedata = [{
            "CompteNumber": "000"
        }, {
            "CompteNumber": "101"
        }, {
            "CompteNumber": "102"
        }, {
            "CompteNumber": "103"
        }, {
            "CompteNumber": "104"
        }, {
            "CompteNumber": "105"
        }, {
            "CompteNumber": "106"
        }
    ];

    const objocomptedata = {
        "CompteNumber": "106"
    };

    function toinit() {
        return {
            arrocomptedata: arrocomptedata,
            objocomptedata: objocomptedata
        };
    }
    return {
        toinit: toinit
    };
})();
module.exports = {
    toinit: ocomptedata.toinit
};
