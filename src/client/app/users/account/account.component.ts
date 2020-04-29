import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

import { MessageService } from '../../messages/message.service';
import { UserService} from '../_services/user.service';
import { AuthService} from '../_services/auth.service';
import { switchMap } from 'rxjs/operators';

import { IUser } from '../user';



@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  user: IUser | undefined;
  isLoading = true;
  errorMessage: string;
  constructor(private authService: AuthService,
     private messageService: MessageService,
     private route: ActivatedRoute,
     private router: Router,
    private userService: UserService) { }

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
if (param) {
const id = param;
this.getUser(id);
}

  }
  getCurrentuser(): IUser {
    return this.authService.currentUserValue;
  }


  getUser(id: string) {
    this.userService.getUser(id).subscribe(
      data => this.user = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  getUserName(user: IUser) {
    this.userService.getUserByName(user).subscribe(
      data => this.user = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }


  saveBalance(): void {
          this.userService.updateUser(this.user)
        .subscribe(
          () => this.onSaveComplete(`${this.user.username} was saved`),
          (error: any) => this.errorMessage = <any>error
        );

        }


  onSaveComplete(message?: string): void {
   if (message) {
    this.messageService.getMessage();
  }
    // Navigate back to the user list
 this.router.navigate(['/users']);
}



}
