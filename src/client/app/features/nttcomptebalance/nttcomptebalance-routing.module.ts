import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NttcomptebalanceListComponent } from './nttcomptebalance-list/nttcomptebalance-list.component';
import { NttcomptebalanceEditComponent } from './nttcomptebalance-edit/nttcomptebalance-edit.component';
import { NttcomptebalanceDetailComponent } from './nttcomptebalance-detail/nttcomptebalance-detail.component';
import {NttcomptebalanceShellComponent} from './nttcomptebalance-shell/nttcomptebalance-shell.component';
import { NttcomptebalanceResolverService } from './nttcomptebalance-resolver.service';


const nttcomptebalancesRoutes: Routes = [
  {
    path: 'nttcomptebalances',
    // data: { preload: true },
    component: NttcomptebalanceListComponent,
  },
  {
    path: 'nttcomptebalances/:alternate',
    component: NttcomptebalanceShellComponent
  },
  {
    path: 'nttcomptebalances/:id',
    //   data: { preload: true },
    //  canActivate: [NstbalanceDetailGuard],
    component: NttcomptebalanceDetailComponent,
    resolve: { comptebalance: NttcomptebalanceResolverService }
  },
  {
    path: 'nttcomptebalances/:NumCompte',
    // data: { preload: true },
    component: NttcomptebalanceDetailComponent,
    resolve: { comptebalance: NttcomptebalanceResolverService }
  },

  {
    path: 'nttcomptebalances/:id/edit',
 //   data: { preload: true },
    component: NttcomptebalanceEditComponent,
    //  canDeactivate: [NstbalanceEditGuard],
    resolve: { comptebalance: NttcomptebalanceResolverService }
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(
      nttcomptebalancesRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    NttcomptebalanceResolverService  ]
})
export class NttcomptebalanceRoutingModule {


 }
