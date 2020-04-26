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


//import { NgxPaginationModule } from 'ngx-pagination';
import { LoadingSpinnerComponent } from './loading-spinner.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
