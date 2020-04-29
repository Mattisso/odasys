import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { NstbalanceinputListComponent, NstbalanceinputDetailComponent , NstbalanceinputEditComponent} from '../nstbalanceinputs/index';
// import { NstbalanceinputDetailComponent } from '../nstbalanceinputs/nstbalanceinput-detail/nstbalanceinput-detail.component';
// import { NstbalanceinputEditComponent } from '../nstbalanceinputs/nstbalanceinput-edit/nstbalanceinput-edit.component';
import {NstbalanceinputSearchComponent} from './nstbalanceinput-search/nstbalanceinput-search.component';

// Imports for loading & configuring the in-memory web api
// import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryDataService } from './nstbalanceinputdata';

// import { ConvertToSpacesPipe } from '../../shared/ConvertToSpacesPipe';
import { NstbalanceinputFilterPipe } from './nstbalanceinput-filter.pipe';
// import { NstbalanceinputDetailGuard,NstbalanceinputEditGuard} from './nstbalanceinput-guard.service';
import { NstbalanceinputService } from './nstbalanceinput.service';
import { NstbalanceinputResolverService } from './nstbalanceinput-resolver.service';
// import { AuthGuard } from '../user/auth-guard.service';
import { NstbalanceinputRoutingModule } from './nstbalanceinput-routing.module';



import { NstbalanceinputEditGuard } from './nstbalanceinput-guard.service';


@NgModule({
  imports: [
    SharedModule,
    //   InMemoryWebApiModule.forRoot(InMemoryDataService),
    NstbalanceinputRoutingModule


  ],
  declarations: [
    NstbalanceinputListComponent,
    NstbalanceinputDetailComponent,
    NstbalanceinputEditComponent,
    NstbalanceinputFilterPipe,
    NstbalanceinputSearchComponent
  ],

  providers: [NstbalanceinputService
    , NstbalanceinputEditGuard
    //   ,NstbalanceinputDetailGuard
    , NstbalanceinputResolverService
  ]

})
export class NstbalanceinputModule { }
