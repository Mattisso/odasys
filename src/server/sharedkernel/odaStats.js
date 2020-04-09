"use strict";
const {
    pipe
} = require('rxjs');
const {
    map,
    mergeMap,
    reduce,
    catchError
} = require('rxjs/operators');
const {
    isValid,
    replaceNullToZero,
    oarray,
     odaremoveDupnumcompte
} = require('./odaUtility').toinit();

const odaStats = (function () {
    // Totals the prices for all items
    let ItemsCount = 0,
    TotalSoldeDebit = 0,
    TotalSoldeCredit = 0;

    const getTotalSoldedebit = function (_arr) {
        //  let totalSoldedebit = 0;
        const arr = odaremoveDupnumcompte(oarray(_arr));
        for (let item of arr) {
            if (isValid(item.SoldeDebit) === true) {
                TotalSoldeDebit += replaceNullToZero(item.SoldeDebit)
            } else if (isValid(item.totalSoldeDebit) === true) {
                TotalSoldeDebit += replaceNullToZero(item.totalSoldeDebit); //totalSoldeDebit
            } else {
                return 0;
            }

        }
        return TotalSoldeDebit;
    };

    const getTotalSoldecredit = function (_arr) {
        const arr = odaremoveDupnumcompte(oarray(_arr));   
             for (let item of arr) {
            if (isValid(item.SoldeCredit) === true) {
                TotalSoldeCredit += replaceNullToZero(item.SoldeCredit)
            } else if (isValid(item.totalSoldeCredit) === true) {
                TotalSoldeCredit += replaceNullToZero(item.totalSoldeCredit);
            } else {
                return 0;
            }
        }
        return TotalSoldeCredit;
    };

    const getTotalCount = function (_arr) {
        const arr = oarray(_arr);
        if (isValid(arr.length) === true) {
            ItemsCount = arr.length;
        }
        return ItemsCount;
    };

    const getObservertotalSoldDebit = pipe(
            map(n => odaremoveDupnumcompte(n)),
            mergeMap(item => item),
            reduce((acc, item) => acc + item.SoldeDebit ? item.SoldeDebit : (acc + item.totalSoldeDebit), 0),
            catchError());

    // Totals the prices for all items
    const getObservertotalSoldeCredit = pipe(
            map(n => n),
            mergeMap(item => item),
            reduce((acc, item) => acc + item.SoldeCredit ? item.SoldeCredit : (acc + item.totalSoldeCredit), 0),
            catchError());
    // const getstreamdata$ = getObserverdata(getdata$);

    const odagetObserver = function () {
        return {
            next: x => console.log(x),
            error: err => console.error('Observer got an error: ' + err)
            // complete: () =>() //{console.log('Observer got a complete notification')
        };
    };
    const gettotalSoldDebit$ = function (getdata) {
        return getObservertotalSoldDebit(getdata);
    };
    const gettotalSoldeCredit$ = function (getdata) {
        return getObservertotalSoldeCredit(getdata);
    };
    const gettotalSolde = pipe(
            map(function (n) {
                return {
                    "totalDebit": getObservertotalSoldDebit(n),
                    "totalCredit": getObservertotalSoldeCredit(n)
                };
            }));
    const gettotalSolde$ = function (getdata) {
        return gettotalSolde(getdata);
    };
    const getodaAggreateData = function (argone) {
        return {
            'totalSoldeDebit': getTotalSoldedebit(argone),
            'totalSoldeCredit': getTotalSoldecredit(argone),
            'ItemsCount': getTotalCount(argone),

        };
    };
    function toinit() {
        return {
            getTotalCount:getTotalCount,
            gettotalSoldDebit$: gettotalSoldDebit$,
            gettotalSoldeCredit$: gettotalSoldeCredit$,
            getTotalSoldecredit:getTotalSoldecredit,
            getTotalSoldedebit:getTotalSoldedebit,
            odagetObserver: odagetObserver,
            gettotalSolde$: gettotalSolde$,
            getodaAggreateData: getodaAggreateData
        };
    }

    return {
        toinit: toinit
    };

})();
module.exports = {
    toinit: odaStats.toinit
};
