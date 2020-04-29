import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';


import { NttcomptebalanceService } from './nttcomptebalance.service';
import { NttcomptebalanceResolverService } from './nttcomptebalance-resolver.service';
 import { NttcomptebalanceGuard } from './nttcomptebalance.guard';
import { NttcomptebalanceRoutingModule } from './nttcomptebalance-routing.module';
import { NttcomptebalanceFilterPipe } from './nttcomptebalance-filter.pipe';
import { NttcomptebalanceListComponent , NttcomptebalanceDetailComponent, NttcomptebalanceEditComponent } from './index';
import { NttcomptebalanceShellComponent } from './nttcomptebalance-shell/nttcomptebalance-shell.component';


@NgModule({
  declarations: [
    NttcomptebalanceFilterPipe,
    NttcomptebalanceListComponent,
    NttcomptebalanceDetailComponent,
    NttcomptebalanceEditComponent,
    NttcomptebalanceShellComponent],
  imports: [
    SharedModule,
    NttcomptebalanceRoutingModule],
  providers: [
    NttcomptebalanceService,
    NttcomptebalanceResolverService
  ]
})
export class NttcomptebalanceModule { }
