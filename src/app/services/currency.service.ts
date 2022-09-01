import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
import { Currency, CurrencySetter } from '../models/CurrencyModels';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor() {
  }

  public readonly defaultCurrencies = [ 'UAH', 'USD', 'EUR', 'GBP' ];
  public firstCurrency: Currency = {value: 0, currency: 'UAH'};
  public secondCurrency: Currency = {value: 1, currency: 'USD'};
  private listOfCurrency: { [currency: string]: number } = {};

  secondCurrencyUpdatedSub = new Subject<Currency>();
  firstCurrencyUpdatedSub = new Subject<Currency>();

  setCurrencyList(listOfCurrency: { [curr: string]: number }) {
    this.listOfCurrency = listOfCurrency;
  }

  setFirstCurrency(currency: Currency) {
    this.firstCurrency = currency;
     this.firstCurrencyUpdatedSub.next(currency);
  }

  setSecondCurrency(currency: Currency) {
    this.secondCurrency = currency;
    this.secondCurrencyUpdatedSub.next(currency);
  }

  getListOfCurrencies() {
    return this.listOfCurrency;
  }

  handleValueChange(setterForChangedValue: CurrencySetter, setterToRecalculateValue: CurrencySetter, currencyToRecalculate: Currency, changedCurrency: Currency) {
    const priceChange = changedCurrency.value / this.listOfCurrency[changedCurrency.currency];
    setterToRecalculateValue.call(this, {...currencyToRecalculate, value: priceChange * this.listOfCurrency[currencyToRecalculate.currency]});
    setterForChangedValue.call(this, {...changedCurrency,value: changedCurrency.value});
  }

  handleSecondCurrencyChange = this.handleValueChange.bind(this, this.setSecondCurrency, this.setFirstCurrency);
  handleFirstCurrencyChange = this.handleValueChange.bind(this, this.setFirstCurrency, this.setSecondCurrency);
}
