import { NgModule } from '@angular/core';

import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatInputModule} from '@angular/material/input';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';

@NgModule({
  declarations: [],
  imports: [
    MatPaginatorModule,
    MatProgressBarModule,
    MatInputModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatDatepickerModule
    ]
})
export class OdmaterialModule { }
