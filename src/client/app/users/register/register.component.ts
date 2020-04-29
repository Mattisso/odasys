import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, Subscription, fromEvent, merge } from 'rxjs';
import { MessageService } from '../../messages/message.service';
import { UserService } from '../_services/user.service';
import { IUser, UserResolved } from '../user';
import { first, debounceTime } from 'rxjs/operators';
// import custom validator to validate that password and confirm password fields match
import { MustMatch } from '../../shared/must-match.validator';
import { GenericValidator } from '../../shared/generic-validator';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { FnParam } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  loading = false;
  user: IUser;
  submitted = false;
  errorMessage: string;
  registering = true;
  pageTitle = 'Register User ';
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  genericValidator: GenericValidator;
  private currentuser: IUser;
  private originaluser: IUser;
  /*get user(): IUser {
    return this.currentuser;
  }
  set user(value: IUser) {
    this.currentuser = value;
    this.originaluser = value ? {...value} : null;
  }*/
  passwordMessage: string;
  private sub: Subscription;
  registerForm: FormGroup;
  passwordGroup: FormGroup;
  username = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(30)
  //  Validators.pattern('[a-zA-Z0-9_-\\s]*' )
   //  Validators.pattern('/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/')

  ]);
  /*   email = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100)
    ]); */
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(3)
  ]);
  confirmPassword = new FormControl('', [
    Validators.required,
    Validators.minLength(3)

  ]);

  role = new FormControl('', [
    Validators.required
  ]);
  constructor(private userService: UserService,
   private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private messageService: MessageService) {
    this.validationMessages = {
      username: {
        required: 'user name is required'
      },
      password: {
        required: 'password  is required'
      },
      Role: {
        required: 'password  is required'
      }
    };
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: this.username,
      password: this.password,
      confirmPassword: this.confirmPassword,


      //     email: this.email,
      /* passwordGroup : this.fb.group({
        password: this.password,
        confirmPassword: this.confirmPassword,
        validator: MustMatch('passwordGroup.password', 'passwordGroup.confirmpassword')
      }) */
      role: this.role

    }, {validator: MustMatch(`${this.password}`, `${this.confirmPassword}`)
  });
    const passwordControl = this.registerForm.get('password');
    passwordControl.valueChanges.pipe(debounceTime(1000)
    ).subscribe(
      value => this.setMessage(passwordControl)
    );
    // read the user id from the route parameter
    this.sub = this.route.paramMap.subscribe(
    params => {
      const id = params.get('id');
      this.getUser(id);
    });
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
}

onUserRetrieved(user: IUser): void {
  if (this.registerForm) {
    this.registerForm.reset();
  }
   this.user = user;
  this.pageTitle = 'Register user';

  // Update the data on the form
  this.registerForm.patchValue({
    username: this.user.username,
   password: this.user.password,
    confirmPassword: this.user.confirmPassword,
 // confirmPassword: this.user.confirmPassword, // this.user.username,
    // email: this.email,
/*  passwordGroup: { password: this.user.password, confirmPassword: this.user.confirmPassword },
 */    role: this.user.role // this.user.role
  });
  // this.registerForm.setControl('tags', this.fb.array(this.user.tags || []));

}

  get f() { return this.registerForm.controls; }


  setClassUsername() {
    return { 'has-danger': !this.getuserName().pristine && !this.getuserName().pristine && !this.getuserName().valid };
  }
  /*
    setClassEmail() {
      return { 'has-danger': !this.email.pristine && !this.email.valid };
    }
  */
  setClassPassword() {
    return { 'has-danger': !this.getPassword().pristine && !this.getPassword().valid };
  }
  setClassconfirPassword() {
    return { 'has-danger': !this.getconFirmPassword().pristine && !this.getconFirmPassword().valid };
  }

  setClassgetRole() {
    return { 'has-danger': !this.getRole().pristine && !this.getRole().valid };
  }


  setMessage(c: AbstractControl): void {
    this.passwordMessage = '';
    console.log(this.validationMessages);
    if ((c.touched || c.dirty) && c.errors) {
      this.passwordMessage = Object.keys(c.errors).map(
        key => this.passwordMessage += this.validationMessages[key]).join(' ');
    }

  }
  saveUser(): void {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.valid) {
      if (this.registerForm.dirty) {
        // Copy the form values over the product object values
        const p = Object.assign({}, this.user, this.registerForm.value);
        if (p.id === '0') {
/*         this.userService.getUserByName(p.username)
            .pipe()
            .subscribe(
              data => {
                this.user = data;
                if (!data) {
 */                  this.userService.createUser(p)
                    .subscribe(
                      () => {
                        this.onSaveComplete(`${p.username} was saved`);
                      },
                      error => {
                        this.messageService.error(error);
                        // this.loading = false;
                      }

                    );

          /*   } else if (data) {

                  const dupvalue = `Username: ${p.username} was alredy taken`;

                  this.messageService.addMessage(dupvalue);

                }

              }
            ); */

          /*  if (p.id == null) {
             this.userService.createUser(p)
         .subscribe(
           () => {
             this.onSaveComplete(`${p.username} was saved`);
            console.log(p);
         },
         error => {
             this.messageService.error(error);
             this.loading = false;
         }

         );


           }  */
        } else {
         this.userService.updateUser(p)
          .subscribe(
            () => {
              this.onSaveComplete(`${p.username} was saved`);
            },
            error => {
              this.messageService.error(error);
              // this.loading = false;
            }

          );

        }


      } else {
        this.onSaveComplete();
      }


    } else {

      this.errorMessage = 'please correct the validation errors.';
    }

    //   alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value));
    // this.errorMessage='please correct the validation errors.';
  }



  getUser(id: string): void {
    this.userService.getUser(id)
        .subscribe(
            (user: IUser) => this.onUserRetrieved(user),
            (error: any) => this.errorMessage = <any>error
        );
}

ngAfterViewInit(): void {
  // Watch for the blur event from any input element on the form.
  const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

  // Merge the blur event observable with the valueChanges observable
  merge(this.registerForm.valueChanges, ...controlBlurs).pipe(debounceTime(800)).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.registerForm);
  });
}

  onSaveComplete(message?: string): void {
    if (message) {
      this.messageService.addMessage(message);
    }
    // Reset the form to clear the flags
    this.registerForm.reset();
    // Navigate back to the product list
    this.router.navigate(['/login']);
  }

  getuserName() { return this.registerForm.get('username'); }
  getPassword() { return this.registerForm.get('passwordGroup.password'); }
  getconFirmPassword() { return this.registerForm.get('passwordGroup.confirmPassword'); }
  getRole() { return this.registerForm.get('role'); }


}
