import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_services/auth-guard.service';
import { AuthService } from '../_services/auth.service';
import {RegisterComponent} from './register.component';

const registerRoutes: Routes = [
  {path: 'register/:id/edit', component: RegisterComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(registerRoutes)
  ],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }
