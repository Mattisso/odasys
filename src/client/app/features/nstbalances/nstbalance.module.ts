import { NgModule } from '@angular/core';
import { NstbalanceFilterPipe } from './nstbalance-filter.pipe';
import { SharedModule } from '../../shared/shared.module';
import { NstbalanceListComponent } from '../nstbalances/nstbalance-list/nstbalance-list.component';
import { NstbalanceDetailComponent } from '../nstbalances/nstbalance-detail/nstbalance-detail.component';
import { NstbalanceEditComponent } from '../nstbalances/nstbalance-edit/nstbalance-edit.component';

// Imports for loading & configuring the in-memory web api
// import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryDataService } from './nstbalancedata';

// import { ConvertToSpacesPipe } from '../../shared/ConvertToSpacesPipe';
// import { NstbalanceDetailGuard,NstbalanceEditGuard} from './nstbalance-guard.service';
import { NstbalanceService } from './nstbalance.service';
import { NstbalanceResolverService } from './nstbalance-resolver.service';
// import { AuthGuard } from '../user/auth-guard.service';
import { NstbalanceRoutingModule } from './nstbalance-routing.module';



import { NstbalanceEditGuard } from './nstbalance-guard.service';
import { NstbalanceSearchComponent } from './nstbalance-search/nstbalance-search.component';

@NgModule({
  imports: [
    SharedModule,
    //   InMemoryWebApiModule.forRoot(InMemoryDataService),
    NstbalanceRoutingModule


  ],
  declarations: [
    NstbalanceListComponent,
    NstbalanceDetailComponent,
    NstbalanceEditComponent,
    NstbalanceFilterPipe,
    NstbalanceSearchComponent
 ],

  providers: [NstbalanceService
    , NstbalanceEditGuard
    //   ,NstbalanceDetailGuard
    , NstbalanceResolverService
  ]
})
export class NstbalanceModule { }
