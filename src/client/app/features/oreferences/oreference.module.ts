import { NgModule } from '@angular/core';
import { OreferenceFilterPipe } from './oreference-filter.pipe';
import { OreferenceSearchComponent } from './oreference-search/oreference-search.component';

import { SharedModule } from '../../shared/shared.module';
import { OreferenceListComponent } from '../oreferences/oreference-list/oreference-list.component';
import { OreferenceDetailComponent } from '../oreferences/oreference-detail/oreference-detail.component';
import { OreferenceEditComponent } from '../oreferences/oreference-edit/oreference-edit.component';

// import { InMemoryDataService } from './oreferencedata';

// import { ConvertToSpacesPipe } from '../../shared/ConvertToSpacesPipe';
// import { OreferenceDetailGuard,OreferenceEditGuard} from './oreference-guard.service';
import { OreferenceService } from './oreference.service';
import { OreferenceResolverService } from './oreference-resolver.service';
// import { AuthGuard } from '../user/auth-guard.service';
import { OreferenceRoutingModule } from './oreference-routing.module';
import { OreferenceGuardService } from './oreference-guard.service';


@NgModule({
  imports: [
    SharedModule,
    //   InMemoryWebApiModule.forRoot(InMemoryDataService),
    OreferenceRoutingModule


  ],
  declarations: [
    OreferenceListComponent,
    OreferenceDetailComponent,
    OreferenceEditComponent,
    OreferenceFilterPipe,
    OreferenceSearchComponent
 ],

  providers: [OreferenceService
    , OreferenceGuardService
    //   ,OreferenceDetailGuard
    , OreferenceResolverService
  ]
})
export class OreferenceModule { }
