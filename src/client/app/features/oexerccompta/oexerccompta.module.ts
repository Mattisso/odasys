import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OexerccomptaFilterPipe } from './oexerccompta-filter.pipe';
import { OexerccomptaListComponent } from './oexerccompta-list/oexerccompta-list.component';
import { OexerccomptaEditComponent } from './oexerccompta-edit/oexerccompta-edit.component';
import { OexerccomptaDetailComponent } from './oexerccompta-detail/oexerccompta-detail.component';
import { OexerccomptaSearchComponent } from './oexerccompta-search/oexerccompta-search.component';



@NgModule({
  declarations: [OexerccomptaFilterPipe, OexerccomptaListComponent, OexerccomptaEditComponent, OexerccomptaDetailComponent, OexerccomptaSearchComponent],
  imports: [
    CommonModule
  ]
})
export class OexerccomptaModule { }
