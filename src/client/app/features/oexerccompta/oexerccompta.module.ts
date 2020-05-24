import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { OexerccomptaFilterPipe } from './oexerccompta-filter.pipe';
import { OexerccomptaListComponent } from './oexerccompta-list/oexerccompta-list.component';
import { OexerccomptaEditComponent } from './oexerccompta-edit/oexerccompta-edit.component';
import { OexerccomptaDetailComponent } from './oexerccompta-detail/oexerccompta-detail.component';
import { OexerccomptaSearchComponent } from './oexerccompta-search/oexerccompta-search.component';
import {OexerccomptaRoutingModule} from './oexerccompta-routing.module'
import {OexerccomptaService} from './oexerccompta.service'



@NgModule({
  declarations: [OexerccomptaFilterPipe,
     OexerccomptaListComponent,
     OexerccomptaEditComponent,
      OexerccomptaDetailComponent,
      OexerccomptaSearchComponent],
  imports: [
    SharedModule,
    OexerccomptaRoutingModule
  ],
  providers:[
    OexerccomptaService
  ]
})
export class OexerccomptaModule { }
