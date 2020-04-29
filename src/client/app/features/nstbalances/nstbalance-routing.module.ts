import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NstbalanceListComponent } from './nstbalance-list/nstbalance-list.component';
import { NstbalanceEditComponent } from './nstbalance-edit/nstbalance-edit.component';
import { NstbalanceDetailComponent } from './nstbalance-detail/nstbalance-detail.component';
import { NstbalanceResolverService } from './nstbalance-resolver.service';

const nstbalancesRoutes: Routes = [
  {
    path: 'nstbalances',
    // data: { preload: true },
    component: NstbalanceListComponent,
  },
  {
    path: 'nstbalances/:id',
    //   data: { preload: true },
    //  canActivate: [NstbalanceDetailGuard],
    component: NstbalanceDetailComponent,
    resolve: { balance: NstbalanceResolverService }
  },
  {
    path: 'v1/nstbalances/:NumCompte',
    // data: { preload: true },
    component: NstbalanceDetailComponent,
    resolve: { balance: NstbalanceResolverService }
  },

  {
    path: 'nstbalances/:id/edit',
 //   data: { preload: true },
    component: NstbalanceEditComponent,
    //  canDeactivate: [NstbalanceEditGuard],
    resolve: { balance: NstbalanceResolverService }
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(
      nstbalancesRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    NstbalanceResolverService
  ]
})
export class NstbalanceRoutingModule { }
