import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Router,
  NavigationExtras, ActivatedRoute } from '@angular/router';

import { AuthService } from '../_services/auth.service';
import { IUser } from '../user';
import { MessageService } from '../../messages/message.service';
import { first } from 'rxjs/operators';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage: string;
  message: string;
  pageTitle = 'Log In';
  users: IUser[];
  returnUrl: string;
  loading = false;
  submitted = false;
  invalidLogin = false;

  constructor(public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private messageService: MessageService) {
if (this.authService.currentUserValue) {
  this.router.navigate(['/']);
}

    }

    loginForm: FormGroup;
    username = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100)
    ]);
    password = new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]);


  get f() { return this.loginForm.controls; }

    setMessage() {
      this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
    }




  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
     return  this.message = 'Trying to log in ...';
    }

      this.loading = true;
      this.authService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
        .subscribe(() => {
          this.setMessage();
          this.router.navigate([this.returnUrl]);
        },
          error => {
            this.messageService.error(error);
            this.loading = false;
          });
    }

  setClassEmail() {
    return { 'has-danger': !this.username.pristine && !this.username.valid };
  }

  setClassPassword() {
    return { 'has-danger': !this.password.pristine && !this.password.valid };
  }




    logOut() {
      this.authService.logout();
      this.setMessage();
    }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      username: this.username,
      password: this.password
    });


    // reset login status
   // this.authService.logout();


    //  this.authService.isLoggedIn = false;

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

get userName() {return this.loginForm.get('username'); }
get Password() { return this.loginForm.get('password'); }

}

