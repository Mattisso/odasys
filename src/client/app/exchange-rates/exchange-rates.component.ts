import { Component, OnInit } from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { shareReplay, map } from 'rxjs/operators';
import {Irate, IOexccompta} from './rates';

@Component({
  selector: 'app-exchange-rates',
  templateUrl: './exchange-rates.component.html',
  styleUrls: ['./exchange-rates.component.css']
})
 export class ExchangeRatesComponent implements OnInit {
  getoexerccomptas: IOexccompta[];
    rates: any[];
  loading = true;
  error: any;
  myqyer = gql`
  {
    getoexerccomptas {
      oExercComptaId
      Cloture
    }
  }`;
  key = 'getoexerccomptas';

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.apollo
    .watchQuery({
      query: this.myqyer
    })
    .valueChanges.subscribe(result => {
      this.getoexerccomptas = result.data && result.data[this.key];
      this.loading = result.loading;
      this.error = result.errors;
    });

   }

}
