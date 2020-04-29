
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';
import { AccountComponent } from './account/account.component';

const usersRoutes: Routes = [
{ path: 'login', component: LoginComponent },
{ path: 'register/:id/edit', component: RegisterComponent },
 { path: 'v2/users/:username', component: AccountComponent },
// { path: 'users/', component: RegisterComponent },

// { path: 'logout', component: LogoutComponent },
{ path: 'users/:id', // canActivate: [AuthGuardLogin],
      component: AccountComponent},
   /* { path: 'admin',
   //  canActivate: [AuthGuard] ,
    component: AdminComponent},*/

];

@NgModule({
  imports: [
    RouterModule.forChild(usersRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
  ]
})
export class UserRoutingModule { }
