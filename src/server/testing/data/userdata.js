
const userdata = (function () {

    const arruserdata = function () {
        return [{
                "username": "admin",
                "role": "admin",
                "password": "Password123"
            }, {
                "username": "user",
                "role": "user",
                "password": "Password123"
            }
        ];
    }

    const objuserdata = function () {
        return {
            "username": "admin",
            "role": "admin",
            "password": "Password123"
        };
    }

    function toinit() {
        return {
            arruserdata: arruserdata,
            objuserdata: objuserdata
        }
    }
    return {
        toinit: toinit
    }
})();
module.exports = {
    toinit: userdata.toinit
}
