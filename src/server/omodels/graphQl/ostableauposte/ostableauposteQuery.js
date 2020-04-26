const graphql = require('graphql');
const {
  oStableauPoste
} = require('../../modelsSchema/index').toinit();
const {
  oStableauPosteType
} = require('./ostableauposteSchema').toinit();
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLList
} = graphql;


const ostableauposteQuery = (function () {
	const getostableauposte = {
		type: oStableauPosteType,
		args: {
			id: {
				type: GraphQLID
			}
		},
		resolve(parent, args, context, info) {
			return oStableauPoste.findById(args.id);
		}
	};
	const getostableaupostes = {
		type: new GraphQLList(oStableauPosteType),
		resolve(parent, args, context, info) {
			return oStableauPoste.find({});
		}
	};
	function toinit() {
		return {
			getostableauposte: getostableauposte,
			getostableaupostes: getostableaupostes,
		};
	}
	return {
		toinit: toinit
	};
})();
module.exports = {
	toinit: ostableauposteQuery.toinit
};
