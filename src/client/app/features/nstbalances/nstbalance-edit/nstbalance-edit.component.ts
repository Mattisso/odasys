import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, Subscription, fromEvent, merge, of, combineLatest, Subject } from 'rxjs';
import { debounceTime, switchMap, catchError, map, filter } from 'rxjs/operators';
import { MessageService } from '../../../messages/message.service';

import { INstbalance } from '../nstbalance';
import { NstbalanceService } from '../nstbalance.service';

import { NumberValidators } from '../../../shared/number.validator';
import { GenericValidator } from '../../../shared/generic-validator';

@Component({
  selector: 'app-nstbalance-edit',
  templateUrl: './nstbalance-edit.component.html',
  styleUrls: ['./nstbalance-edit.component.css']
})
export class NstbalanceEditComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChildren(FormControlName, { read: ElementRef }) formElements: ElementRef[];

  pageTitle = 'Balance Edit';
  errorMessage: string;
  nstbalanceForm: FormGroup;
  balance: INstbalance;
  _nstbalance$: any;
  private sub: Subscription;
  error$ = new Subject<string>();
  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;
  /*
      get tags(): FormArray {
        return <FormArray>this.nstbalanceForm.get('tags');
    } */


  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private balanceService: NstbalanceService,
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
  nstbalance$ = this.balanceService.selectednstbalance$
    .pipe(
      catchError(error => {
        this.error$.next(error);
        return of(null);
      })
    );

  pageTitle$ = this.nstbalance$
    .pipe(
      map((b: INstbalance) =>
        b ? `Balance Detail for : ${b.IntitulCompte}` : null)
    );
  Selectednsbalance$ = this.balanceService.selectednstbalance$;

  vm$ = combineLatest([
    this.nstbalance$,
    this.pageTitle$
  ]).pipe(
    filter(([nstbalance]) => Boolean(nstbalance)),
    map(([nstbalance, pageTitle]) =>
      ({ nstbalance, pageTitle }))
  );

  ngOnInit(): void {
    this.nstbalanceForm = this.fb.group({
      OexercComptaKey: '',
      oexercCompta: '',
      OtableauposteKey: '',
      otableauposte: '',
      OreferenceKey: '',
      oreference: '',
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
        this.getBalance(id);
      }
    );
    this.getall();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getall(): void {
    // this._nstbalance$ : any
    this.vm$.subscribe(
      _stbalance$ => this._nstbalance$ = _stbalance$
    );


  }
  getBalance(id: string): void {
    this.balanceService.getBalance(id)
      .subscribe(
        (balance: INstbalance) => this.onbalanceRetrieved(balance),
        (error: any) => this.errorMessage = <any>error
      );
  }

  ngAfterViewInit(): void {
    // Watch for the blur event from any  element on the form.
    const controlBlurs: Observable<any>[] = this.formElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    // Merge the blur event observable with the valueChanges observable
    merge(this.nstbalanceForm.valueChanges, ...controlBlurs).pipe(debounceTime(800)).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.nstbalanceForm);
    });
  }

  /* addTag(): void {
      this.tags.push(new FormControl());
  } */

  onbalanceRetrieved(balance: INstbalance): void {
    if (this.nstbalanceForm) {
      this.nstbalanceForm.reset();
    }

    this.balance = balance;
    if (this.balance.id === '0') {
      this.pageTitle = 'Add balance';
    } else {
      this.pageTitle = `Edit balance: ${this.balance.IntitulCompte}`;
    }

    // Update the data on the form
    this.nstbalanceForm.patchValue({
      OexercComptaKey: this.balance.OexercComptaKey,
      oexercCompta: this.balance.oexercCompta,
      OtableauposteKey: this.balance.OtableauposteKey,
      otableauposte: this.balance.otableauposte,
      OreferenceKey: this.balance.OreferenceKey,
      oreference: this.balance.oreference,
      IntitulCompte: this.balance.IntitulCompte,
      NumCompte: this.balance.NumCompte,
      SoldeDebit: this.balance.SoldeDebit,
      SoldeCredit: this.balance.SoldeCredit
    });
    // this.nstbalanceForm.setControl('tags', this.fb.array(this.balance.tags || []));

  }

  deleteBalance(): void {
    if (this.balance.id === '0') {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the balance: ${this.balance.IntitulCompte}?`)) {
        this.balanceService.deleteBalance(this.balance.id)
          .subscribe(
            () => this.onSaveComplete(`${this.balance.IntitulCompte} was deleted`),
            (error: any) => this.errorMessage = <any>error
          );
      }
    }
  }

  saveBalance(): void {
    if (this.nstbalanceForm.valid) {
      if (this.nstbalanceForm.dirty) {

        // const p = { ...this.balance, ...this.nstbalanceForm.value };
        const p = Object.assign({}, this.balance, this.nstbalanceForm.value);

        if (p.id === '0') {

          this.balanceService.createBalance(p)
            .subscribe(
              () => this.onSaveComplete(`${this.balance.IntitulCompte} was saved`),
              (error: any) => this.errorMessage = <any>error
            );

        } else {
          this.balanceService.updateBalance(p)
            .subscribe(
              () => this.onSaveComplete(`${this.balance.IntitulCompte} was saved`),
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
    this.nstbalanceForm.reset();
    // Navigate back to the product list
    this.router.navigate(['/nstbalances']);
  }

}
