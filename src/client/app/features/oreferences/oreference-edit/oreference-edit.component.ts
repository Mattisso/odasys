import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, Subscription, fromEvent, merge } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { MessageService } from '../../../messages/message.service';

import { IOreference } from '../oreference';
import { OreferenceService } from '../oreference.service';

import { GenericValidator } from '../../../shared/generic-validator';
// import { validationData } from '../../../../../server/config/validationFile';
@Component({
  selector: 'app-oreference-edit',
  templateUrl: './oreference-edit.component.html',
  styleUrls: ['./oreference-edit.component.css']
})
export class OreferenceEditComponent implements OnInit, AfterViewInit, OnDestroy  {

  @ViewChildren(FormControlName, { read: ElementRef }) formElements: ElementRef[];

  pageTitle = 'Oreference Edit';
  errorMessage: string;
  oreferenceForm: FormGroup;
  balance: IOreference;
  private sub: Subscription;
  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;
  /*
      get tags(): FormArray {
        return <FormArray>this.oreferenceForm.get('tags');
    } */


  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private oreferenceService: OreferenceService,
    private messageService: MessageService,
  ) {

    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      RefCode: {
        required: 'Reference Code  is required.',
        minlength: 'Reference Code  must be at least two characters.',
        maxlength: 'Reference Code   cannot exceed 3 characters.'
      },
      Description: {
        required: 'Description is required.'
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
    this.oreferenceForm = this.fb.group({
      RefCode: '',
      Description: ''

    });

    // Read the product Id from the route parameter
    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');
        this.getOreference(id);
      }
    );

  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }


  getOreference(id: string): void {
    this.oreferenceService.getOreference(id)
      .subscribe(
        (balance: IOreference) => this.onbalanceRetrieved(balance),
        (error: any) => this.errorMessage = <any>error
      );
  }

  ngAfterViewInit(): void {
    // Watch for the blur event from any  element on the form.
    const controlBlurs: Observable<any>[] = this.formElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    // Merge the blur event observable with the valueChanges observable
    merge(this.oreferenceForm.valueChanges, ...controlBlurs).pipe(debounceTime(800)).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.oreferenceForm);
    });
  }

  /* addTag(): void {
      this.tags.push(new FormControl());
  } */

  onbalanceRetrieved(balance: IOreference): void {
    if (this.oreferenceForm) {
      this.oreferenceForm.reset();
    }

    this.balance = balance;
    if (this.balance.id === '0') {
      this.pageTitle = 'Add Refence Code';
    } else {
      this.pageTitle = `Edit Refence Code : ${this.balance.RefCode}`;
    }

    // Update the data on the form
    this.oreferenceForm.patchValue({
      RefCode: this.balance.RefCode,
      Description: this.balance.Description
    });
    // this.oreferenceForm.setControl('tags', this.fb.array(this.balance.tags || []));

  }

  deleteOreference(): void {
    // const p = Object.assign({}, this.balance, this.oreferenceForm.value);
    if (this.balance.id === '0') {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the balance: ${this.balance.RefCode}?`)) {
        this.oreferenceService.deleteOreference(this.balance)
          .subscribe(
            () => this.onSaveComplete(`${this.balance.RefCode} was deleted`),
            (error: any) => this.errorMessage = <any>error
          );
      }
    }
  }

  saveOreference(): void {
    if (this.oreferenceForm.valid) {
      if (this.oreferenceForm.dirty) {

        const p = { ...this.balance, ...this.oreferenceForm.value };
        // const p = Object.assign({}, this.balance, this.oreferenceForm.value);

        if (p.id === '0') {

          this.oreferenceService.createOreference(p)
            .subscribe(
              () => this.onSaveComplete(`${this.balance.RefCode} was saved`),
              (error: any) => this.errorMessage = <any>error
            );

        } else {
          this.oreferenceService.updateOreference(p)
            .subscribe(
              () => this.onSaveComplete(`${this.balance.RefCode} was saved`),
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
    this.oreferenceForm.reset();
    // Navigate back to the product list
    this.router.navigate(['/oreferences']);
  }

}
