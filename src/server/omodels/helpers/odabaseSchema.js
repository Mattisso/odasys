
'use strict';
// const _ = require('lodash');
let mongoose = require('mongoose');
const  bcrypt = require('bcryptjs');
let SALT_WORK_FACTOR = 10;
//Schema = mongoose.Schema;
// const Schema = mongoose.Schema;
const odabaseSchema = (function () {
 const currentDate = new Date();
const extendSchema =  function(Schema, definition, options) {
return new mongoose.Schema(Object.assign({}, Schema.obj, definition), options);
};
const getauditentity = {
CreatedOn: {type: Date, default: Date.now },
CreatedBy: {type: String },
ModifiedOn: {type: Date,default: Date.now },
ModifiedBy: {type: String },
isActive: {type: Boolean, default:true }
};
const getbaseBalancesheet={
        NumCompte: {type: String, required: true },
        IntitulCompte:{type: String, required: true },
        SoldeDebit: {type: Number, default:0},
        SoldeCredit: {type: Number, default:0 }
};
const gettoObject = {toObject: {
virtuals: true  },
toJSON: { virtuals:true }
    };

    const auditEntityPlugin = function (schema, options) {
        schema.set('toObject', {
            getters: true
        });
        schema.set('toJSON', {
            getters: true
        });
        //  let self = this;
        schema.pre(['save', 'create'], function (next) {
            if (!this.CreatedOn)
                this.CreatedOn = currentDate;
            if (!this.ModifiedOn)
                this.ModifiedOn = currentDate;
            if (!this.CreatedBy)
                this.CreatedBy = 'Admin';
            if (!this.ModifiedBy)
                this.ModifiedBy = 'Admin';
            next();
        });
    };


    const auditUserEntityPlugin = function (schema, options) {
        schema.set('toObject', {
            getters: true
        });
        schema.set('toJSON', {
            getters: true
        });
        //  let self = this;
     /*    schema.pre(['save', 'create'], function (next) {
            let user = this;
            if (!this.CreatedOn)
                this.CreatedOn = currentDate;
            if (!this.ModifiedOn)
                this.ModifiedOn = currentDate;
            if (!this.CreatedBy)
                this.CreatedBy = 'Admin';
            if (!this.ModifiedBy)
                this.ModifiedBy = 'Admin';
            next();

            // only hash the password if it has been modified (or is new)
            if (!user.isModified('password'))
                return next();

            // generate a salt
            bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
                if (err)
                    return next(err);

                // hash the password using our new salt
                bcrypt.hash(user.password, salt, function (err, hash) {
                    if (err)
                        return next(err);

                    // override the cleartext password with the hashed one
                    user.password = hash;
                    next();
                });
            });
        }); */
    };


function toinit() {
return {
//auditBaseSchema: auditBaseSchema,
//balanceSheetBaseSchema: balanceSheetBaseSchema,
extendSchema: extendSchema,
getauditentity:getauditentity,
getbaseBalancesheet:getbaseBalancesheet,
gettoObject:gettoObject,
auditEntityPlugin:auditEntityPlugin,
auditUserEntityPlugin:auditUserEntityPlugin
};
}
return {
toinit: toinit
};

})();
module.exports = {
toinit: odabaseSchema.toinit
};
