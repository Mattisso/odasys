import { BrowserModule } from '@angular/platform-browser';
// import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { RequestCache, RequestCacheWithMap } from './request-cache.service';
import { httpInterceptorProviders } from './http-interceptors/index';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExchangeRatesComponent } from './exchange-rates/exchange-rates.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { WelcomeComponent } from './home/welcome.component';
import { SharedModule } from './shared/shared.module';

import { AuthService } from './users/_services/auth.service';
import { HttpErrorHandler } from './http-error-handler.service';
import { AuthGuard } from './users/_services/auth-guard.service';
import { UploaderModule } from './uploader/uploader.module';

/* Feature Modules */
import { NstbalanceinputModule } from './features/nstbalanceinputs/nstbalanceinput.module';
import { NstbalanceModule } from './features/nstbalances/nstbalance.module';
import { RegisterModule} from './users/register/register.module';
 import { UserModule } from './users/user.module';
import { MessageModule } from './messages/message.module';

import { LoginModule } from './users/login/login.module';
import { LogoutComponent } from './users/logout/logout.component';
import { AboutComponent } from './about/about.component';


import { OexerccomptaModule } from './features/oexerccompta/oexerccompta.module';
import { OreferenceModule } from './features/oreferences/oreference.module';
import { OtableauposteModule } from './features/otableaupostes/otableauposte.module';
import { NttbalanceModule } from './features/nttbalance/nttbalance.module';
import { NttcomptebalanceModule } from './features/nttcomptebalance/nttcomptebalance.module';
import {NttcomptebalancedetailModule} from './features/nttcomptebalancedetail/nttcomptebalancedetail.module';

import { MasterNavBarComponent } from './core/master-nav-bar/master-nav-bar.component';
import { NavBarComponent } from './core/nav-bar/nav-bar.component';
import { ConfigComponent } from './config/config.component';
// Apollo
import {GraphqlModule}  from './graphql.module'

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    PageNotFoundComponent,
    NavBarComponent,
    MasterNavBarComponent,
    ConfigComponent,
    LogoutComponent,
    AboutComponent
  ],
  imports: [
       BrowserModule,
    //    NgxPaginationModule,
        BrowserAnimationsModule,
        HttpClientModule,
        HttpClientXsrfModule.withOptions({
          cookieName: 'My-Xsrf-Cookie',
          headerName: 'My-Xsrf-Header',
        }),
      //  HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService),
        SharedModule,
        UserModule,
        NstbalanceinputModule,
        LoginModule,
        MessageModule,
        NstbalanceModule,
        RegisterModule,
        UploaderModule,
        OexerccomptaModule,
        OreferenceModule,
        OtableauposteModule,
        NttcomptebalanceModule,
        NttbalanceModule,
        NttcomptebalancedetailModule,
    GraphqlModule,
    AppRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: function tokenGetter() {
          return localStorage.getItem('token');
        },
        whitelistedDomains: ['localhost:3000', 'localhost:4200'],
    //  blacklistedRoutes: ['localhost:3000']
      }
    }),
  ],
  providers: [AuthGuard,
    AuthService,
  //  ConfigService,
  // JwtHelperService,
    // UserService,
      HttpErrorHandler,
   { provide: RequestCache, useClass: RequestCacheWithMap },
   httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(router: Router) {
    console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }
}
