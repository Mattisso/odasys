"use strict";

const index = (function () {
    function toinit() {
        return {
         //   'base': require('./base').toinit(),
          //  'Spacer': require('./spacer').toinit(),
         //   'Shared': require('./oshared').toinit(),
            'filtered': require('./odaFiltered').toinit(),
            'staticObjects': require('./staticObjects').toinit(),
         //   'odaObjects': require('./odaObjects').toinit(),
         //   'odaObserver': require('./odaObserver').toinit()

        };
    }
    return {
        toinit: toinit
    };
})();
module.exports = {
    toinit: index.toinit
};
