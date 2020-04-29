import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { NttcomptebalancedetailFilterPipe } from './nttcomptebalancedetail-filter.pipe';
import { NttcomptebalancedetailListComponent } from './nttcomptebalancedetail-list/nttcomptebalancedetail-list.component';
import { NttcomptebalancedetailEditComponent } from './nttcomptebalancedetail-edit/nttcomptebalancedetail-edit.component';
import { NttcomptebalancedetailDetailComponent } from './nttcomptebalancedetail-detail/nttcomptebalancedetail-detail.component';
import { NttcomptebalancedetailSearchComponent } from './nttcomptebalancedetail-search/nttcomptebalancedetail-search.component';
import { NttcomptebalancedetailResolverService } from './nttcomptebalancedetail-resolver.service';



const nttcomptebalancedetailRoutes: Routes = [
  {
    path: 'nttcomptebalancedetails',
    // data: { preload: true },
    component: NttcomptebalancedetailListComponent,
  },
  {
    path: 'nttcomptebalancedetails/:id',
    //   data: { preload: true },
    //  canActivate: [NstbalanceinputDetailGuard],
    component: NttcomptebalancedetailDetailComponent,
    resolve: { balance: NttcomptebalancedetailResolverService }
  },
  {
    path: 'nttcomptebalancedetails/v2/:NumCompte',
    //   data: { preload: true },
    //  canActivate: [NstbalanceinputDetailGuard],
    component: NttcomptebalancedetailDetailComponent,
    resolve: { balance: NttcomptebalancedetailSearchComponent }
  },
  /* {
    path: 'nttcomptebalancedetails/v1/:NumCompte',
    //   data: { preload: true },
    //  canActivate: [NstbalanceinputDetailGuard],
    component: NstbalanceinputDetailComponent,
    resolve: { balance: NstbalanceinputResolverService }
  }, */

  {
    path: 'nttcomptebalancedetails/:id/edit',
 //   data: { preload: true },
    component: NttcomptebalancedetailEditComponent,
    //  canDeactivate: [NstbalanceinputEditGuard],
    resolve: { balance: NttcomptebalancedetailResolverService }
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(
      nttcomptebalancedetailRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    NttcomptebalancedetailResolverService
  ]
})
export class NttcomptebalancedetailRoutingModule { }
