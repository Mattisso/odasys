const {oExercComptaType}=require('./oexerccomptaSchema').toinit();
const graphql = require('graphql');
const { GraphQLObjectType,  GraphQLString,   GraphQLNonNull} = graphql;
const {oExercCompta} = require('../../modelsSchema/index').toinit();



const OexerccomptaMutation = (function () {
	const toCreateOexerccompta = {
		type: oExercComptaType,
		args: {},
		resolve(parent, args, context, info) {
			let oexerccompta = new oExercCompta({});
			return oexerccompta.save();
		}
	};
	const toUpdateOexerccompta = {
		type: oExercComptaType,
		args: {},
		resolve(parent, args, context, info) {
			let oexerccompta = new oExercCompta({});
			return oexerccompta.save();
		}
	};
	const toDeleteOexerccompta = {
		type: oExercComptaType,
		args: {},
		resolve(parent, args, context, info) {
			let oexerccompta = new oExercCompta({});
			return oexerccompta.save();
		}
	};
	function toinit() {
		return {
			toCreateOexerccompta: toCreateOexerccompta,
			toUpdateOexerccompta: toUpdateOexerccompta,
			toDeleteOexerccompta: toDeleteOexerccompta,
		};
	}
	return {
		toinit: toinit
	};
})();
module.exports = {
	toinit: OexerccomptaMutation.toinit
};
