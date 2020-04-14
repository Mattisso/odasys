const graphql = require('graphql');
const {oReference} = require('../../modelsSchema/index').toinit();
const {OreferenceType}=require('./oreferenceSchema').toinit()
const { GraphQLID,   GraphQLList} = graphql;
const oreferenceQuery = (function () {

  const getoreference = {
    type: OreferenceType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                return oReference.findById(args.id);
            }
  }
  const getoreferences= {
    type: new GraphQLList(OreferenceType),
          resolve(parent, args) {
            return oReference.find({});
            }
  }

  function toinit(){
    return {
      getoreference:getoreference,
      getoreferences:getoreferences
    }
  }
  return {
toinit:toinit
  }
})()
module.exports={
toinit:oreferenceQuery.toinit
}
