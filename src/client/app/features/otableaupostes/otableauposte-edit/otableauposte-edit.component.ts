import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, Subscription, fromEvent, merge } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { MessageService } from '../../../messages/message.service';

import { IOtableauposte } from '../otableauposte';
import { OtableauposteService } from '../otableauposte.service';

import { GenericValidator } from '../../../shared/generic-validator';
// import { validationData } from '../../../../../server/config/validationFile';

@Component({
  selector: 'app-otableauposte-edit',
  templateUrl: './otableauposte-edit.component.html',
  styleUrls: ['./otableauposte-edit.component.css']
})
export class OtableauposteEditComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChildren(FormControlName, { read: ElementRef }) formElements: ElementRef[];

  pageTitle = 'Otableaupost Edit';
  errorMessage: string;
  otableauposteForm: FormGroup;
  balance: IOtableauposte;
  private sub: Subscription;
  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;
  /*
      get tags(): FormArray {
        return <FormArray>this.otableauposteForm.get('tags');
    } */


  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private otableauposteService: OtableauposteService,
    private messageService: MessageService,
  ) {

    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      TableauName: {
        required: 'TableauName  is required.',
        minlength: 'TableauNamee  must be at least two characters.',
        maxlength: 'TableauName   cannot exceed 3 characters.'
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
    this.otableauposteForm = this.fb.group({
      TableauName: '',
      Description: ''

    });

    // Read the product Id from the route parameter
    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');
        this.getOtableauposte(id);
      }
    );

  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }


  getOtableauposte(id: string): void {
    this.otableauposteService.getOtableauposte(id)
      .subscribe(
        (balance: IOtableauposte) => this.onbalanceRetrieved(balance),
        (error: any) => this.errorMessage = <any>error
      );
  }

  ngAfterViewInit(): void {
    // Watch for the blur event from any  element on the form.
    const controlBlurs: Observable<any>[] = this.formElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    // Merge the blur event observable with the valueChanges observable
    merge(this.otableauposteForm.valueChanges, ...controlBlurs).pipe(debounceTime(800)).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.otableauposteForm);
    });
  }

  /* addTag(): void {
      this.tags.push(new FormControl());
  } */

  onbalanceRetrieved(balance: IOtableauposte): void {
    if (this.otableauposteForm) {
      this.otableauposteForm.reset();
    }

    this.balance = balance;
    if (this.balance.id === '0') {
      this.pageTitle = 'Add balance';
    } else {
      this.pageTitle = `Edit balance: ${this.balance.TableauName}`;
    }

    // Update the data on the form
    this.otableauposteForm.patchValue({
      TableauName: this.balance.TableauName,
      Description: this.balance.tableauLongName
    });
    // this.otableauposteForm.setControl('tags', this.fb.array(this.balance.tags || []));

  }

  deleteOtableauposte(): void {
    // const p = Object.assign({}, this.balance, this.otableauposteForm.value);
    if (this.balance.id === '0') {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the balance: ${this.balance.TableauName}?`)) {
        this.otableauposteService.deleteOtableauposte(this.balance)
          .subscribe(
            () => this.onSaveComplete(`${this.balance.TableauName} was deleted`),
            (error: any) => this.errorMessage = <any>error
          );
      }
    }
  }

  saveOtableauposte(): void {
    if (this.otableauposteForm.valid) {
      if (this.otableauposteForm.dirty) {

        const p = { ...this.balance, ...this.otableauposteForm.value };
        // const p = Object.assign({}, this.balance, this.otableauposteForm.value);

        if (p.id === '0') {

          this.otableauposteService.createOtableauposte(p)
            .subscribe(
              () => this.onSaveComplete(`${this.balance.TableauName} was saved`),
              (error: any) => this.errorMessage = <any>error
            );

        } else {
          this.otableauposteService.updateOtableauposte(p)
            .subscribe(
              () => this.onSaveComplete(`${this.balance.TableauName} was saved`),
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
    this.otableauposteForm.reset();
    // Navigate back to the product list
    this.router.navigate(['/otableaupostes']);
  }

}
