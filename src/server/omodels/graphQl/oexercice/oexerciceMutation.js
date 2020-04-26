const {oExerciceType}=require('./oexerciceSchema').toinit();
const graphql = require('graphql');
const { GraphQLObjectType,  GraphQLString,   GraphQLNonNull} = graphql;
const {oExercice} = require('../../modelsSchema/index').toinit();


const oexerciceMutation = (function () {
	const toCreateOExercice = {
		type: oExerciceType,
		args: {},
		resolve(parent, args, context, info) {
			let oexercice = new oExercice({});
			return oexercice.save();
		}
	};
	const toUpdateOExercice = {
		type: oExerciceType,
		args: {},
		resolve(parent, args, context, info) {
			let oexercice = new oExercice({});
			return oexercice.save();
		}
	};
	const toDeleteOExercice = {
		type: oExerciceType,
		args: {},
		resolve(parent, args, context, info) {
			let oexercice = new oExercice({});
			return oexercice.save();
		}
	};

	function toinit() {
		return {
			toCreateOExercice: toCreateOExercice,
			toUpdateOExercice: toUpdateOExercice,
			toDeleteOExercice: toDeleteOExercice,
		};
	}
	return {
		toinit: toinit
	};
})();
module.exports = {
	toinit: oexerciceMutation.toinit
};
