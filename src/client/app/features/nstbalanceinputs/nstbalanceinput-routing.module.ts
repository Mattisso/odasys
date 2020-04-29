import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// Imports for loading & configuring the in-memory web api
// import { InMemoryWebApiModule  } from 'angular-in-memory-web-api';
// import { InMemoryDataService } from '../mock-data/nstbalanceinputdata';

// import { SharedModule } from '../shared/shared.module';
/*
import { NstbalanceinputListComponent, NstbalanceinputDetailComponent, NstbalanceinputEditComponent,
   NstbalanceinputResolverService } from './index';*/

import { NstbalanceinputListComponent } from './nstbalanceinput-list/nstbalanceinput-list.component';
import { NstbalanceinputEditComponent } from './nstbalanceinput-edit/nstbalanceinput-edit.component';
import { NstbalanceinputDetailComponent } from './nstbalanceinput-detail/nstbalanceinput-detail.component';
import { NstbalanceinputResolverService } from './nstbalanceinput-resolver.service';

const nstbalanceinputsRoutes: Routes = [
  {
    path: 'nstbalanceinputs',
    // data: { preload: true },
    component: NstbalanceinputListComponent,
  },
  {
    path: 'nstbalanceinputs/:id',
    //   data: { preload: true },
    //  canActivate: [NstbalanceinputDetailGuard],
    component: NstbalanceinputDetailComponent,
    resolve: { balance: NstbalanceinputResolverService }
  },
  {
    path: 'nstbalanceinputs/v2/:NumCompte',
    //   data: { preload: true },
    //  canActivate: [NstbalanceinputDetailGuard],
    component: NstbalanceinputDetailComponent,
    resolve: { balance: NstbalanceinputResolverService }
  },
  /* {
    path: 'nstbalanceinputs/v1/:NumCompte',
    //   data: { preload: true },
    //  canActivate: [NstbalanceinputDetailGuard],
    component: NstbalanceinputDetailComponent,
    resolve: { balance: NstbalanceinputResolverService }
  }, */

  {
    path: 'nstbalanceinputs/:id/edit',
 //   data: { preload: true },
    component: NstbalanceinputEditComponent,
    //  canDeactivate: [NstbalanceinputEditGuard],
    resolve: { balance: NstbalanceinputResolverService }
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(
      nstbalanceinputsRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    NstbalanceinputResolverService
  ]
})
export class NstbalanceinputRoutingModule { }
