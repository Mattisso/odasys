const {OcompteType}=require('./ocompteSchema').toinit();
const graphql = require('graphql');
const { GraphQLObjectType,  GraphQLString,   GraphQLNonNull} = graphql;
const {Ocompte} = require('../../modelsSchema/index').toinit();

const ocompteMutation=(function(){
  const tocreateOcompte= {
            type: OcompteType,
            args: {
                CompteNumber: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                let ocompte = new Ocompte({
                    CompteNumber: args.CompteNumber
                                  });
                return ocompte.save();
            }
        };

  function toinit(){
    return {
      tocreateOcompte:tocreateOcompte
    };
  }
  return {
toinit:toinit
  };
})();
module.exports = {
  toinit: ocompteMutation.toinit
};
