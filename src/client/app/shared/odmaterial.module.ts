import { NgModule } from '@angular/core';

import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatInputModule} from '@angular/material/input';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';

@NgModule({
  declarations: [],
  imports: [
    MatPaginatorModule,
    MatProgressBarModule,
    MatInputModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatDatepickerModule,
    MatCardModule,
    MatFormFieldModule,
    MatMenuModule,
    MatToolbarModule
    ],
    exports:[
      MatPaginatorModule,
      MatProgressBarModule,
      MatInputModule,
      MatBottomSheetModule,
      MatButtonModule,
      MatDatepickerModule,
      MatCardModule,
      MatFormFieldModule,
      MatMenuModule,
      MatToolbarModule
    ],
    providers: [
      { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
    ]
})
export class OdmaterialModule { }
