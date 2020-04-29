import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, Subscription, fromEvent, merge } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { MessageService } from '../../../messages/message.service';

import { INttcomptebalancedetail } from '../nttcomptebalancedetail';
import { NttcomptebalancedetailService } from '../nttcomptebalancedetail.service';

import { NumberValidators } from '../../../shared/number.validator';
import { GenericValidator } from '../../../shared/generic-validator';
@Component({
  selector: 'app-nttcomptebalancedetail-edit',
  templateUrl: './nttcomptebalancedetail-edit.component.html',
  styleUrls: ['./nttcomptebalancedetail-edit.component.css']
})
export class NttcomptebalancedetailEditComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  pageTitle = 'Balance Detail Edit';
  errorMessage: string;
  nttcomptebalancedetailForm: FormGroup;
  balancedetail: INttcomptebalancedetail;
  private sub: Subscription;
  error: any;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;
  /*
      get tags(): FormArray {
        return <FormArray>this.nttcomptebalancedetailForm.get('tags');
    } */


  constructor(private fb: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private nttcomptebalancedetailservice: NttcomptebalancedetailService,
      private messageService: MessageService,
  ) {

      // Defines all of the validation messages for the form.
      // These could instead be retrieved from a file or database.
      this.validationMessages = {
          IntitulCompte: {
              required: 'Intitule Compte name is required.',
              minlength: 'Intitule Compte name must be at least three characters.',
              maxlength: 'Intitule Compte name cannot exceed 50 characters.'
          },
          NumCompte: {
              required: 'Compte Number is required.'
          }/* ,
        SoldeDebit: {
          required: 'Rate the Compte between 1 (lowest) and 5 (highest).'
        } */
      };

      // Define an instance of the validator for use with this form,
      // passing in this form's set of validation messages.
      this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
      this.nttcomptebalancedetailForm = this.fb.group({
          IntitulCompte: ['', [Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50)]],
          NumCompte: ['', Validators.required],
          //  SoldeDebit: ['', Validators.required],
          //   tags: this.fb.array([]),
          SoldeDebit: '',
          SoldeCredit: ''
      });

      // Read the product Id from the route parameter
     this.sub = this.route.paramMap.subscribe(
        params => {
        const id = params.get('id');
        this.getcompteDetail(id);
        }
          );

  }

  ngOnDestroy(): void {
      this.sub.unsubscribe();
  }


  getcompteDetail(id: string): void {
      this.nttcomptebalancedetailservice.getcompteDetail(id)
          .subscribe(
              (balancedetail: INttcomptebalancedetail) => this.onbalanceRetrieved(balancedetail),
              (error: any) => this.errorMessage = <any>error
          );
  }

  ngAfterViewInit(): void {
      // Watch for the blur event from any input element on the form.
      const controlBlurs: Observable<any>[] = this.formInputElements
          .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

      // Merge the blur event observable with the valueChanges observable
      merge(this.nttcomptebalancedetailForm.valueChanges, ...controlBlurs).pipe(debounceTime(800)).subscribe(value => {
          this.displayMessage = this.genericValidator.processMessages(this.nttcomptebalancedetailForm);
      });
  }

  /* addTag(): void {
      this.tags.push(new FormControl());
  } */

  onbalanceRetrieved(balancedetail: INttcomptebalancedetail): void {
         if (this.nttcomptebalancedetailForm) {
          this.nttcomptebalancedetailForm.reset();
      }

      this.balancedetail = balancedetail;
      if (this.balancedetail.id === '0' ) {
          this.pageTitle = 'Add balancedetail';
      } else {
          this.pageTitle = `Edit balancedetail: ${this.balancedetail.IntitulCompte}`;
      }

      // Update the data on the form
      this.nttcomptebalancedetailForm.patchValue({
          IntitulCompte: this.balancedetail.IntitulCompte,
          NumCompte: this.balancedetail.NumCompte,
          SoldeDebit: this.balancedetail.SoldeDebit,
          SoldeCredit: this.balancedetail.SoldeCredit
      });
      // this.nttcomptebalancedetailForm.setControl('tags', this.fb.array(this.balancedetail.tags || []));

  }

  deleteBalance(): void {
      if  (this.balancedetail.id === '0')  {
          // Don't delete, it was never saved.
          this.onSaveComplete();
      } else {
          if (confirm(`Really delete the balancedetail: ${this.balancedetail.IntitulCompte}?`)) {
              this.nttcomptebalancedetailservice.deleteBalancedetail(this.balancedetail.id)
                  .subscribe(
                      () => this.onSaveComplete(`${this.balancedetail.IntitulCompte} was deleted`),
                      (error: any) => this.errorMessage = <any>error
                  );
          }
      }
  }

  saveBalance(): void {
          if (this.nttcomptebalancedetailForm.valid) {
        if (this.nttcomptebalancedetailForm.dirty) {

        //    const p = { ...this.balancedetail, ...this.nttcomptebalancedetailForm.value };
            const p = Object.assign({}, this.balancedetail, this.nttcomptebalancedetailForm.value);

            if (p.id === '0') {

                this.nttcomptebalancedetailservice.createBalancedetail(p)
                    .subscribe(
                        () => this.onSaveComplete(`${this.balancedetail.IntitulCompte} was saved`),
                        (error: any) => this.errorMessage = <any>error
                    );

            } else {
                this.nttcomptebalancedetailservice.updateBalancedetail(p)
                    .subscribe(
                        () => this.onSaveComplete(`${this.balancedetail.IntitulCompte} was saved`),
                        (error: any) => this.errorMessage = <any>error
                    );

            }

        } else {
            this.onSaveComplete();
        }

    } else {

        this.errorMessage = 'please correct the validation errors.';
    }

  }

  onSaveComplete(message?: string): void {
      if (message) {
          this.messageService.addMessage(message);
      }
      // Reset the form to clear the flags
      this.nttcomptebalancedetailForm.reset();
      // Navigate back to the product list
      this.router.navigate(['/nttcomptebalancedetails']);
  }

  showgetDetailBalanceUrl() {
    this.nttcomptebalancedetailservice.getDetailBalanceUrl()
      .subscribe(
        (data: INttcomptebalancedetail) => this.balancedetail = { ...data }, // success path
        error => this.error = error // error path
      );
  }
  showgetBalanceDetailResponse() {
    this.nttcomptebalancedetailservice.getBalanceDetailResponse()
      // resp is of type `HttpResponse<Config>`
      .subscribe(resp => {
        // display its headers

        // access the body directly, which is typed as `Config`.
        this.balancedetail = { ... resp.body };
      });
  }


}
