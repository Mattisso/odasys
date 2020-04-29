import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
// tslint:disable-next-line:max-line-length
import {NttcomptebalancedetailDetailComponent, NttcomptebalancedetailEditComponent, NttcomptebalancedetailListComponent} from '../nttcomptebalancedetail/index';
import { NttcomptebalancedetailFilterPipe } from './nttcomptebalancedetail-filter.pipe';

import { NttcomptebalancedetailSearchComponent } from './nttcomptebalancedetail-search/nttcomptebalancedetail-search.component';

import { NttcomptebalancedetailService } from './nttcomptebalancedetail.service';
import { NttcomptebalancedetailResolverService } from './nttcomptebalancedetail-resolver.service';
import { NttcomptebalancedetailRoutingModule } from './nttcomptebalancedetail-routing.module';
import {NttcomptebalancedetailEditGuard} from './nttcomptebalancedetail.guard';



@NgModule({
  declarations: [NttcomptebalancedetailFilterPipe,
     NttcomptebalancedetailListComponent,
      NttcomptebalancedetailEditComponent, NttcomptebalancedetailDetailComponent,  NttcomptebalancedetailSearchComponent],
  imports: [
    SharedModule,
    NttcomptebalancedetailRoutingModule
  ],
  providers: [NttcomptebalancedetailService
    , NttcomptebalancedetailEditGuard
    , NttcomptebalancedetailResolverService
  ]
})
export class NttcomptebalancedetailModule { }
