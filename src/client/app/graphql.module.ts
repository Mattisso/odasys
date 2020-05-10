import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import {ApolloModule, APOLLO_OPTIONS, Apollo} from 'apollo-angular';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { environment } from '../environments/environment';

const apiUrl = environment.apiUrl;
export function createApollo(httpLink:HttpLink){
  return {
      link:httpLink.create({uri:apiUrl}),
      cache: new InMemoryCache()
    }



 }
//const uri='http:localhost:3000';

@NgModule({
  exports:[
HttpClientModule,
ApolloModule,
HttpLinkModule
  ],
  providers:[
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    }

  ]
})
export class GraphqlModule {
 /*  constructor( apollo:Apollo, httpLink:HttpLink){
     apollo.create({
        link:httpLink.create({uri:apiUrl}),
        cache: new InMemoryCache()
      }

      )

    } */
}
