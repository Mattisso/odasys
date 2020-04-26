import { BrowserModule } from '@angular/platform-browser';
// import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import {ApolloModule, APOLLO_OPTIONS, Apollo} from 'apollo-angular';

import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExchangeRatesComponent } from './exchange-rates/exchange-rates.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


// Apollo
import {GraphqlModule}  from './graphql.module'

@NgModule({
  declarations: [
    AppComponent,
    ExchangeRatesComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    GraphqlModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
 
}
