import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NttbalanceListComponent , NttbalanceEditComponent, NttbalanceDetailComponent,
NttbalanceShellComponent} from './index';
import { NttbalanceResolverService } from './nttbalance-resolver.service';

const nttbalancesRoutes: Routes = [
  {
    path: 'nttbalances',
    // data: { preload: true },
    component: NttbalanceListComponent,
  },
  {
    path: ':alternate',
    component: NttbalanceShellComponent
  },
  {
    path: 'nttbalances/:id',
    //   data: { preload: true },
    //  canActivate: [NttbalanceDetailGuard],
    component: NttbalanceDetailComponent,
    resolve: { balance: NttbalanceResolverService }
  },
  {
    path: 'v1/nttbalances/:NumCompte',
    // data: { preload: true },
    component: NttbalanceDetailComponent,
    resolve: { balance: NttbalanceResolverService }
  },

  {
    path: 'nttbalances/:id/edit',
 //   data: { preload: true },
    component: NttbalanceEditComponent,
    //  canDeactivate: [NttbalanceEditGuard],
    resolve: { balance: NttbalanceResolverService }
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(
      nttbalancesRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    NttbalanceResolverService
  ]
})
export class NttbalanceRoutingModule { }
