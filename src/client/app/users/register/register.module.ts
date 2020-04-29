import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { RegisterComponent } from './register.component';
import { RegisterRoutingModule } from './register-routing.module';
import { UserService } from '../_services/user.service';
import { MustMatchDirective } from '../../shared/must-match.directive';

@NgModule({
  imports: [
    SharedModule,
    RegisterRoutingModule
  ],
  declarations: [RegisterComponent,
    MustMatchDirective
      ],
  providers: [
    UserService,
  ]
})
export class RegisterModule { }
