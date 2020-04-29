import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UploaderComponent} from './uploader.component';
import {UploaderListComponent} from './uploader-list.component';
import {UploaderDetailsComponent} from './uploader-details.component';

const uploaderRoutes: Routes = [
  {path: 'file/upload', component: UploaderComponent},
  {path: 'file/:filename', component: UploaderDetailsComponent},
  {path: 'file/all', component: UploaderListComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(uploaderRoutes)
  ],
  exports: [RouterModule]
})
export class UploaderRoutingModule { }
