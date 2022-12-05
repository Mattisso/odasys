import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { AuthGuard } from '../_services/auth-guard.service';
import { AuthService } from '../_services/auth.service';
// import {OdmaterialModule} from '../../shared/odmaterial.module'
@NgModule({

  imports: [
  SharedModule,
  LoginRoutingModule,
  //OdmaterialModule
  ],
  declarations: [LoginComponent],
  providers: [
    AuthService,
    AuthGuard,

  ]
})
export class LoginModule { }
