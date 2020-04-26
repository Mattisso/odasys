import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import {ApolloModule, APOLLO_OPTIONS, Apollo} from 'apollo-angular';
import { InMemoryCache } from 'apollo-cache-inmemory';

const uri='http:localhost:3000';

@NgModule({
  exports:[
HttpClientModule,
ApolloModule,
HttpLinkModule
  ],
  providers:[

  ]
})
export class GraphqlModule {
  constructor( apollo:Apollo, httpLink:HttpLink){
     apollo.create({
        link:httpLink.create({uri:uri}),
        cache: new InMemoryCache()
      }

      )

    }
}
