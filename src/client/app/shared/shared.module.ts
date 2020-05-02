import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { ConvertToSpacesPipe } from './ConvertToSpacesPipe';
import { ConvertToDatePipe } from './ConvertToDatePipe';
// import {MatButpaton} from '@angular/material';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatInputModule} from '@angular/material/input';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';


import { NgxPaginationModule } from 'ngx-pagination';
import { LoadingSpinnerComponent } from './loading-spinner.component';

import {OdaDropDownListComponent} from '../core/oda-drop-down-list/oda-drop-down-list.component';

@NgModule({
  declarations: [ConvertToSpacesPipe,
    LoadingSpinnerComponent,
    ConvertToDatePipe,
    OdaDropDownListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatInputModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRippleModule
  ],
  exports:[
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ConvertToSpacesPipe,
    ConvertToDatePipe,
    NgxPaginationModule,
    LoadingSpinnerComponent,
    MatPaginatorModule,
    MatProgressBarModule,
    MatInputModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRippleModule,
    OdaDropDownListComponent
  ]
})
export class SharedModule { }
