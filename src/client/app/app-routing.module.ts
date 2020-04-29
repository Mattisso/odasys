import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './users/_services/auth-guard.service';
import { SelectivePreloadingStrategy } from './selective-preloading-strategy';


const appRoutes: Routes = [
  {path: 'welcome', component: WelcomeComponent},
  {
    path: '',
    loadChildren: './admin/admin.module#AdminModule',
    canLoad: [AuthGuard]
  },
   /*{ path: 'users',
  // canActivate: [AuthGuard],
  data: { preload: true },
    loadChildren: 'app/users/user.module#UserModule'
   },*/
/*   { path: 'nstbalanceinputs',
//  canActivate: [AuthGuard],
  data: { preload: true },
  loadChildren: 'app/models/nstbalanceinputs/nstbalanceinput.module#NstbalanceinputModule' }, */
  {path: '', redirectTo: '/welcome', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];


@NgModule({
imports: [
  RouterModule.forRoot(
    appRoutes,
     {enableTracing: true,
      preloadingStrategy: SelectivePreloadingStrategy})
],
providers: [SelectivePreloadingStrategy],
exports: [RouterModule]
})

export  class AppRoutingModule {}
