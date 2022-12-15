import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { IOreference } from '../oreference';
import { OreferenceService } from '../oreference.service';
import { Observable, Subject, EMPTY,combineLatest} from 'rxjs';
import { debounceTime, merge, share, map, startWith, switchMap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-oreference-list',
  templateUrl: './oreference-list.component.html',
  styleUrls: ['./oreference-list.component.css']
})
export class OreferenceListComponent implements OnInit {

  pageTitle = 'Oreference List';
  listFilter: string;
  // errorMessage: string;
  selectedId: string;
  filterForm: FormGroup;
  pageUrl = new Subject<string>();
  isLoading = true;
  showSearch = true;
  config: any;
  // balances: any = [];
   balances: IOreference[];
  constructor(private oreferenceService: OreferenceService,
    private route: ActivatedRoute, private router: Router) {

     }


  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

oreferencesQuery$= this.oreferenceService.getOreferences$.pipe(
  catchError(err=>{
    this.errorMessageSubject.next(err);
    return EMPTY;
  })
)
selectedoreference$=this.oreferenceService.selectedoreference$;
vm$=combineLatest([this.oreferencesQuery$,this.selectedoreference$]).pipe(
  map(([oreferences, oreference]:[IOreference[],IOreference])=>({
oreferences,oreferenceId:oreference? oreference.id:'0'})
  )
)

onSelected(oreferenceId:string):void{
  this.oreferenceService.selectedOreferenceChanged(oreferenceId);
  }


  /*
getOreferences(): void {
this.balances = [];
    this.oreferenceService.getOreferences()
    .subscribe(balances => this.balances = balances,
      error =>  this.errorMessage = <any>error,
      () => this.isLoading = false);
    } */
    //  error => this.errorMessage = <any>error);


    search(searchTerm: string) {
   //   this.editHero = undefined;
      if (searchTerm) {
        this.oreferenceService.searchoreferences(searchTerm)
          .subscribe(balances => this.balances = balances);
      }
    }

    toggleSearch() { this.showSearch = !this.showSearch; }

    pageChange(newPage: number) {
      this.router.navigate(['oreferences'], { queryParams: { page: newPage } });
    }

    ngOnInit() {
      this.config = {
        currentPage: 1,
        itemsPerPage: 10
    };

      this.route.queryParamMap.pipe(
        map(params => params.get('page'))
      )
      .subscribe(page => this.config.currentPage = page);
     // this.getOreferences();

    }

}
