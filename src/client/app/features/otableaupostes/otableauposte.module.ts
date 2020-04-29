import { NgModule } from '@angular/core';
import { OtableauposteFilterPipe } from './otableauposte-filter.pipe';
import { OtableauposteSearchComponent } from './otableauposte-search/otableauposte-search.component';

import { SharedModule } from '../../shared/shared.module';
import { OtableauposteListComponent } from '../otableaupostes/otableauposte-list/otableauposte-list.component';
import { OtableauposteDetailComponent } from '../otableaupostes/otableauposte-detail/otableauposte-detail.component';
import { OtableauposteEditComponent } from '../otableaupostes/otableauposte-edit/otableauposte-edit.component';

// import { InMemoryDataService } from './otableaupostedata';

// import { ConvertToSpacesPipe } from '../../shared/ConvertToSpacesPipe';
// import { OtableaupostDetailGuard,OtableaupostEditGuard} from './otableauposte-guard.service';
import { OtableauposteService } from './otableauposte.service';
import { OtableauposteResolverService } from './otableauposte-resolver.service';
// import { AuthGuard } from '../user/auth-guard.service';
import { OtableauposteRoutingModule } from './otableauposte-routing.module';
import { OtableauposteGuardService } from './otableauposte-guard.service';


@NgModule({
  imports: [
    SharedModule,
    //   InMemoryWebApiModule.forRoot(InMemoryDataService),
    OtableauposteRoutingModule


  ],
  declarations: [
    OtableauposteListComponent,
    OtableauposteDetailComponent,
    OtableauposteEditComponent,
    OtableauposteFilterPipe,
    OtableauposteSearchComponent
 ],

  providers: [OtableauposteService
    , OtableauposteGuardService
    //   ,OtableaupostDetailGuard
    , OtableauposteResolverService
  ]
})
export class OtableauposteModule { }
