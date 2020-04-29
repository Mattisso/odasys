import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { AuthGuard } from '../_services/auth-guard.service';
import { AuthService } from '../_services/auth.service';

@NgModule({

  imports: [
  SharedModule,
  LoginRoutingModule
  ],
  declarations: [LoginComponent],
  providers: [
    AuthService,
    AuthGuard,

  ]
})
export class LoginModule { }
