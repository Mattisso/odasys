import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OtableauposteListComponent } from './otableauposte-list/otableauposte-list.component';
import { OtableauposteEditComponent } from './otableauposte-edit/otableauposte-edit.component';
import { OtableauposteDetailComponent } from './otableauposte-detail/otableauposte-detail.component';
import { OtableauposteResolverService } from './otableauposte-resolver.service';

const otableaupostesRoutes: Routes = [
  {
    path: 'otableaupostes',
    // data: { preload: true },
    component: OtableauposteListComponent,
  },
  {
    path: 'otableaupostes/v1/ddlotableauposteWithcomptebalances',
    // data: { preload: true },
    component: OtableauposteListComponent,
  },
  {
    path: 'otableaupostes/:id',
    //   data: { preload: true },
    //  canActivate: [OexccomptaDetailGuard],
    component: OtableauposteDetailComponent,
    resolve: { balance: OtableauposteResolverService }
  },
 /*  {
    path: 'otableaupostes/v1/:id',
    //   data: { preload: true },
    //  canActivate: [OexccomptaDetailGuard],
    component: OexccomptaDetailComponent,
    resolve: { balance: OexccomptaResolverService }
  }, */
 /*  {
    path: 'otableaupostes/:oExercComptaId',
    // data: { preload: true },
    component: OexccomptaDetailComponent,
    resolve: { balance: OexccomptaResolverService }
  },
 */
  {
    path: 'otableaupostes/:TableauName',
    // data: { preload: true },
    component: OtableauposteDetailComponent,
    resolve: { balance: OtableauposteResolverService }
  },
  {
    path: 'otableaupostes/:id/edit',
 //   data: { preload: true },
    component: OtableauposteEditComponent,
    //  canDeactivate: [OexccomptaEditGuard],
    resolve: { balance: OtableauposteResolverService }
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(
      otableaupostesRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    OtableauposteResolverService
  ]
})
export class OtableauposteRoutingModule { }
