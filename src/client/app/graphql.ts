


import  {INstbalanceinput} from  '../app/features/nstbalanceinputs/nstbalanceinput';
import gql from 'graphql-tag';
export  const  AllbalanceInputQuery = gql`($first: int, $skip:int,$orderBy:LinkOrderBy){
  getnstbalanceinputs(first:$first, skip:$skip,orderBy:$orderBy){
    id
    NumCompte
    IntitulCompte
    SoldeDebit
    SoldeCredit
  }
  _AllbalanceInputMeta {
    count
  }
}
`

export  interface AllbalanceInputResponse {
  ALlbalanceinputs: INstbalanceinput[];
  _allbalanceInputMeta: { count:number};
  loading:boolean
}
