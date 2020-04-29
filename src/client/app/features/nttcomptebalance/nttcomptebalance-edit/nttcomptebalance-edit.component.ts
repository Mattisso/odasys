import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, Subscription, fromEvent, merge } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { MessageService } from '../../../messages/message.service';

import { INttcomptebalance } from '../nttcomptebalance';
import { NttcomptebalanceService } from '../nttcomptebalance.service';

import { NumberValidators } from '../../../shared/number.validator';
import { GenericValidator } from '../../../shared/generic-validator';

@Component({
  selector: 'app-nttcomptebalance-edit',
  templateUrl: './nttcomptebalance-edit.component.html',
  styleUrls: ['./nttcomptebalance-edit.component.css']
})
export class NttcomptebalanceEditComponent implements OnInit, AfterViewInit, OnDestroy  {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  pageTitle = 'Balance Sheet Edit';
  errorMessage: string;
  nttcomptebalanceForm: FormGroup;
  balance: INttcomptebalance;
  private sub: Subscription;
  error: any;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;
  /*
      get tags(): FormArray {
        return <FormArray>this.nttcomptebalanceForm.get('tags');
    } */


  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private nttcomptebalanceservice: NttcomptebalanceService,
    private messageService: MessageService,
  ) {

    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      OexercComptaKey: {
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
    this.nttcomptebalanceForm = this.fb.group({
      OexercComptaKey: ['', [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)]],
      OtableauposteKey: ['', Validators.required],
      OreferenceKey: ['', Validators.required],
      //  SoldeDebit: ['', Validators.required],
      //   tags: this.fb.array([]),
      totalSoldeDebit: '',
      totalSoldeCredit: ''
    });

    // Read the product Id from the route parameter
    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');
        this.getBalance(id);
      }
    );

  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }


  getBalance(id: string): void {
    this.nttcomptebalanceservice.getcomptebalance(id)
      .subscribe(
        (balance: INttcomptebalance) => this.onbalanceRetrieved(balance),
        (error: any) => this.errorMessage = <any>error
      );
  }

  ngAfterViewInit(): void {
    // Watch for the blur event from any input element on the form.
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    // Merge the blur event observable with the valueChanges observable
    merge(this.nttcomptebalanceForm.valueChanges, ...controlBlurs).pipe(debounceTime(800)).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.nttcomptebalanceForm);
    });
  }

  /* addTag(): void {
      this.tags.push(new FormControl());
  } */

  onbalanceRetrieved(balance: INttcomptebalance): void {
    if (this.nttcomptebalanceForm) {
      this.nttcomptebalanceForm.reset();
    }

    this.balance = balance;
    if (this.balance.id === '0') {
      this.pageTitle = 'Add balance';
    } else {
      this.pageTitle = `Edit balance: ${this.balance.OexercComptaKey}`;
    }

    // Update the data on the form
    this.nttcomptebalanceForm.patchValue({
      OexercComptaKey: this.balance.OexercComptaKey,
      NumCompte: this.balance.OreferenceKey,
      SoldeDebit: this.balance.totalSoldeDebit,
      SoldeCredit: this.balance.totalSoldeCredit
    });
    // this.nttcomptebalanceForm.setControl('tags', this.fb.array(this.balance.tags || []));

  }

  deleteBalance(): void {
    if (this.balance.id === '0') {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the balance: ${this.balance.OexercComptaKey}?`)) {
        this.nttcomptebalanceservice.deleteBalance(this.balance.id)
          .subscribe(
            () => this.onSaveComplete(`${this.balance.OexercComptaKey} was deleted`),
            (error: any) => this.errorMessage = <any>error
          );
      }
    }
  }

  saveBalance(): void {
    if (this.nttcomptebalanceForm.valid) {
      if (this.nttcomptebalanceForm.dirty) {
        //    const p = { ...this.balance, ...this.nttcomptebalanceForm.value };
        const p = Object.assign({}, this.balance, this.nttcomptebalanceForm.value);

        if (p.id === '0') {

          this.nttcomptebalanceservice.createBalance(p)
            .subscribe(
              () => this.onSaveComplete(`${this.balance.OexercComptaKey} was saved`),
              (error: any) => this.errorMessage = <any>error
            );

        } else {
          this.nttcomptebalanceservice.updateBalance(p)
            .subscribe(
              () => this.onSaveComplete(`${this.balance.OexercComptaKey} was saved`),
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
    this.nttcomptebalanceForm.reset();
    // Navigate back to the product list
    this.router.navigate(['/nttcomptebalances']);
  }

  showConfig(id: string) {
    this.nttcomptebalanceservice.getDetailBalanceUrl(id)
      .subscribe(
        (data: INttcomptebalance) => this.balance = { ...data }, // success path
        error => this.error = error // error path
      );
  }
  showConfigResponse() {
    this.nttcomptebalanceservice.getCompteBalanceResponse()
      // resp is of type `HttpResponse<Config>`
      .subscribe(resp => {
        // display its headers

        // access the body directly, which is typed as `Config`.
        this.balance = { ...resp.body };
      });
  }

}
