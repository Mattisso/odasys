import { NgModule } from '@angular/core';

import { AdminComponent } from './admin/admin.component';
import { AdminDashboardComponent } from './admin-dashoard/admin-dashboard.component';
import { ManageNstbalanceinputsComponent } from './manage-nstbalanceinputs/manage-nstbalanceinputs.component';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminComponent,
    AdminDashboardComponent,
    ManageNstbalanceinputsComponent
  ]
})
export class AdminModule { }
