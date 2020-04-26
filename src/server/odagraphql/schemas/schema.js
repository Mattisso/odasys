/* const{UserRootQuery } =require('./userQuery').toinit();
const{createUserMutation} =require('./userMutation').toinit();
const {GraphQLSchema} = require('graphql');

const schema=(function(){
    const myresolver= new GraphQLSchema({
        query:UserRootQuery,
        mutation:createUserMutation} );
function toinit(){
    return myresolver;
}
return {
    toinit:toinit
};
})();
module.exports={
    toinit:schema.toinit
};
 */