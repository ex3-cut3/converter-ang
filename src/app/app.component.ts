import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { APICurrencyService } from "./services/api-currency.service";
import { CurrencyService } from "./services/currency.service";
import { Subscription } from "rxjs";
import { Currency } from './models/CurrencyModels';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, OnDestroy {

  public firstCurrency: Currency = {value: 1, currency: 'USD'};
  public secondCurrency: Currency = {value: 0, currency: 'UAH'};
  public listOfCurrency = this.currencyService.getListOfCurrencies();

  private firstCurrSub!: Subscription;
  private secondCurrSub!: Subscription;

  constructor(private APICurrency: APICurrencyService, public currencyService: CurrencyService) {
  }

  ngOnDestroy(): void {
    this.firstCurrSub.unsubscribe();
    this.secondCurrSub.unsubscribe();
  }

  ngOnInit(): void {
    this.APICurrency.fetchListOfCurrencies().subscribe((list: { rates: { [currency: string]: number } }) => {
      this.listOfCurrency = list.rates;

      this.currencyService.handleSecondCurrencyChange(
        this.secondCurrency,
        this.firstCurrency,
      );
    });

    this.firstCurrSub = this.currencyService.firstCurrencyUpdatedSub.subscribe((newCurrency: Currency) => {
      this.firstCurrency = newCurrency;
    })
    this.secondCurrSub = this.currencyService.secondCurrencyUpdatedSub.subscribe((newCurrency: Currency) => {
      this.secondCurrency = newCurrency;
    })
  }

}
