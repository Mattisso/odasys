import { NgModule } from '@angular/core';
import { NttbalanceFilterPipe } from './nttbalance-filter.pipe';
import { SharedModule } from '../../shared/shared.module';
import { NttbalanceListComponent , NttbalanceEditComponent, NttbalanceDetailComponent} from './index';
import { NttbalanceSearchComponent } from './nttbalance-search/nttbalance-search.component';
import { NttbalanceService } from './nttbalance.service';
import { NttbalanceResolverService } from './nttbalance-resolver.service';
// import { AuthGuard } from '../user/auth-guard.service';
import { NttbalanceRoutingModule } from './nttbalance-routing.module';
import { NttbalanceShellComponent } from './nttbalance-shell/nttbalance-shell.component';



// import { NttbalanceEditGuard } from './nttbalance-guard.service';

@NgModule({
  declarations: [NttbalanceFilterPipe,
    NttbalanceListComponent,
    NttbalanceEditComponent,
    NttbalanceDetailComponent,
    NttbalanceSearchComponent,
    NttbalanceShellComponent
      ],
  imports: [
    SharedModule,
    //   InMemoryWebApiModule.forRoot(InMemoryDataService),
    NttbalanceRoutingModule
  ],

  providers: [NttbalanceService
// , NttbalanceEditGuard
    //   ,NttbalanceDetailGuard
    , NttbalanceResolverService
  ]
})
export class NttbalanceModule { }
