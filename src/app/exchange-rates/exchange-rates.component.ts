import { Component, OnInit } from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { shareReplay, map } from 'rxjs/operators';
import {Irate} from './rates';

@Component({
  selector: 'app-exchange-rates',
  templateUrl: './exchange-rates.component.html',
  styleUrls: ['./exchange-rates.component.css']
})
 export class ExchangeRatesComponent implements OnInit {
  rates: any[];
  loading = true;
  error: any;
  myqyer = gql`
  {
    rates(currency: "USD") {
      currency
      rate
    }
  }`;
  key = 'rates';

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.apollo
    .watchQuery({
      query: this.myqyer
    })
    .valueChanges.subscribe(result => {
      this.rates = result.data && result.data[this.key];
      this.loading = result.loading;
      this.error = result.errors;
    });

   }

}
