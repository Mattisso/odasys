
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule } from '@angular/common/http';
import { UserService} from './_services/user.service';
import {AuthGuard } from './_services/auth-guard.service';
// import { AuthGuardAdmin } from './_services/auth-guard-admin.service';
// import { JwtInterceptorProvider, ErrorInterceptorProvider } from './_helper';
import { AuthService} from './_services/auth.service';
import {UserRoutingModule} from './user-routing.module';


import { SharedModule } from '../shared/shared.module';
// import { RegisterComponent } from './register/register.component';
// import { LogoutComponent } from './logout/logout.component';
// import { AdminComponent } from '../admin/admin.component';
 import { AccountComponent } from './account/account.component';
// import { AboutComponent } from './about/about.component';


@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
    UserRoutingModule
  ],
  declarations: [
 // RegisterComponent,
  //  LoginComponent,
   //  LogoutComponent
   //  AdminComponent,
    AccountComponent,
  //  AboutComponent
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
  ]
})


export class UserModule { }
