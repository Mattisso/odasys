import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { UploaderComponent } from './uploader.component';
import { UploaderService } from './uploader.service';

import { UploaderRoutingModule } from './uploader-routing.module';
import { UploaderListComponent } from './uploader-list.component';
import { UploaderDetailsComponent } from './uploader-details.component';

@NgModule({
  imports: [
    SharedModule,
    UploaderRoutingModule
  ],
  declarations: [UploaderComponent, UploaderListComponent, UploaderDetailsComponent],
  providers: [
    UploaderService
  ]


})
export class UploaderModule { }
