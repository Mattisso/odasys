import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OreferenceListComponent } from './oreference-list/oreference-list.component';
import { OreferenceEditComponent } from './oreference-edit/oreference-edit.component';
import { OreferenceDetailComponent } from './oreference-detail/oreference-detail.component';
import { OreferenceResolverService } from './oreference-resolver.service';

const oreferencesRoutes: Routes = [
  {
    path: 'oreferences',
    // data: { preload: true },
    component: OreferenceListComponent,
  },
  {
    path: 'oreferences/v2/ddlreferencebyotableauposteVM',
    // data: { preload: true },
    component: OreferenceListComponent,
  },
  {
    path: 'oreferences/:id',
    //   data: { preload: true },
    //  canActivate: [OexccomptaDetailGuard],
    component: OreferenceDetailComponent,
    resolve: { balance: OreferenceResolverService }
  },
 /*  {
    path: 'oreferences/v1/:id',
    //   data: { preload: true },
    //  canActivate: [OexccomptaDetailGuard],
    component: OexccomptaDetailComponent,
    resolve: { balance: OexccomptaResolverService }
  }, */
 /*  {
    path: 'oreferences/:oExercComptaId',
    // data: { preload: true },
    component: OexccomptaDetailComponent,
    resolve: { balance: OexccomptaResolverService }
  },
 */
  {
    path: 'oreferences/:Refcode',
    // data: { preload: true },
    component: OreferenceDetailComponent,
    resolve: { balance: OreferenceResolverService }
  },
  {
    path: 'oreferences/:id/edit',
 //   data: { preload: true },
    component: OreferenceEditComponent,
    //  canDeactivate: [OexccomptaEditGuard],
    resolve: { balance: OreferenceResolverService }
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(
      oreferencesRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    OreferenceResolverService
  ]
})
export class OreferenceRoutingModule { }
