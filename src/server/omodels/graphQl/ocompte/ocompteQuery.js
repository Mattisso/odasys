const graphql = require('graphql');
const {Ocompte} = require('../../modelsSchema/index').toinit();
const {OcompteType}=require('./ocompteSchema').toinit();
const { GraphQLObjectType,  GraphQLID,  GraphQLList} = graphql;

const ocompteQuery = (function () {

  const  getocompte ={
    type: OcompteType,
    //argument passed by the user while making the query
    args: {
        id: {
            type: GraphQLID
        }
    },
    resolve(parent, args) {
        //Here we define how to get data from database source

        //this will return the book with id passed in argument by the user
        return Ocompte.findById(args.id);
    }
};
const getocomptes= {
  type: new GraphQLList(OcompteType),
  //argument passed by the user while making the query
  resolve(parent, args) {

      return Ocompte.find({});
  }
};
  function toinit(){
    return {
      getocompte:getocompte,
      getocomptes:getocomptes

    };
  }
  return {
toinit:toinit
  };
})();
module.exports={
toinit:ocompteQuery.toinit
};
