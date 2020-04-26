const {oExercComptaType}=require('./oexerccomptaSchema').toinit();
const graphql = require('graphql');
const { GraphQLObjectType,  GraphQLString,   GraphQLNonNull} = graphql;
const {oExercCompta} = require('../../modelsSchema/index').toinit();
const oexerccomptaMutation = (function () {

	const toCreateOExercCompta = {
		type: oExercComptaType,
		args: {},
		resolve(parent, args, context, info) {
			let oexerccompta = new oExercCompta({});
			return oexerccompta.save();
		}
	};
	const toUpdateOExercCompta = {
		type: oExercComptaType,
		args: {},
		resolve(parent, args, context, info) {
			let oexerccompta = new oExercCompta({});
			return oexerccompta.save();
		}
	};
	const toDeleteOExercCompta = {
		type: oExercComptaType,
		args: {},
		resolve(parent, args, context, info) {
			let oexerccompta = new oExercCompta({});
			return oexerccompta.save();
		}
	};

	function toinit() {
		return {
			toCreateOExercCompta: toCreateOExercCompta,
			toUpdateOExercCompta: toUpdateOExercCompta,
			toDeleteOExercCompta: toDeleteOExercCompta,
		};
	}
	return {
		toinit: toinit
	};
})();
module.exports = {
	toinit: oexerccomptaMutation.toinit
};
