import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {OexerccomptaListComponent} from './oexerccompta-list/oexerccompta-list.component'
import {OexerccomptaService} from './oexerccompta.service'
const oexerccomptaRoutes: Routes=[
{
  path:'oexerccomptas',
  component: OexerccomptaListComponent
}
]



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(
      oexerccomptaRoutes
    )


  ],
  exports:[
    RouterModule
  ],
  providers:[
OexerccomptaService
  ]
})
export class OexerccomptaRoutingModule { }
