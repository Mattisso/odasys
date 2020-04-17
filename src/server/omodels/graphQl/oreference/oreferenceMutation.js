const graphql = require('graphql');
const {oReference} = require('../../modelsSchema/index').toinit();
const {OreferenceType} = require('../oreference/oreferenceSchema').toinit();


const {GraphQLString,GraphQLNonNull} = graphql;

const  oreferenceMutation =(function(){
 const  toCreateOreference ={
    type:OreferenceType,
    args:{
        RefCode: { type: new GraphQLNonNull(GraphQLString)},
        Description: { type: new GraphQLNonNull(GraphQLString)}
    },
    resolve(parent,args){
        let oreference = new oReference({
            RefCode:args.RefCode,
            Description:args.Description
        });
        return oreference.save();
    }
};
  function toinit(){
    return {
      toCreateOreference:toCreateOreference
    };
  }
  return {
toinit:toinit
  };
})();
module.exports={
toinit:oreferenceMutation.toinit
};
