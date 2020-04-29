import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';


import { IUser } from '../users/user';

import { UserService} from '../users/_services/user.service';

import { AuthService} from '../users/_services/auth.service';

@Component({
    templateUrl: './welcome.component.html'
})
export class WelcomeComponent implements OnInit, OnDestroy   {
    public pageTitle = 'Welcome';

   users: IUser[] = [];
  currentUser: IUser;
  currentUserSubscription: Subscription;


  constructor(private userService: UserService,
    private authService: AuthService) {

   // this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.currentUserSubscription = this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
  });
  }

  ngOnInit() {
   // this.loadAllUsers();
  }
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
}


  deleteUser( user: IUser) {
    const id = user.id;
    this.userService.deleteUser(user).pipe(first()).subscribe(() => {
        this.loadAllUsers();
    });
}
loadAllUsers(): void {
  this.userService.getUsers().pipe(first()).subscribe(users => {
      this.users = users;
  });
}

}
