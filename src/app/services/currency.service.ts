import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor() {
  }

  public readonly defaultCurrencies = ['UAH', 'USD', 'EUR', 'GBP'];
  public firstCurrency = 'UAH';
  public secondCurrency = 'USD';
  public firstValue = 0;
  public secondValue = 1;
  private listOfCurrency: { [currency: string]: number } = {};

  firstCurrencyUpdatedSub = new Subject<string>();
  secondCurrencyUpdatedSub = new Subject<string>();
  secondValueUpdatedSub = new Subject<number>();
  firstValueUpdatedSub = new Subject<number>();

  setCurrencyList(listOfCurrency: { [p: string]: number }) {
    this.listOfCurrency = listOfCurrency;
  }

  setFirstValue(val: number){
    this.firstValue = val;
    this.firstValueUpdatedSub.next(val);
  }

  setSecondValue(val: number){
    this.secondValue = val;
    this.secondValueUpdatedSub.next(val);
  }

  setFirstCurrency(currency: string){
    this.firstCurrency = currency;
    this.firstCurrencyUpdatedSub.next(currency);
  }

  setSecondCurrency(currency: string){
    this.secondCurrency = currency;
    this.secondCurrencyUpdatedSub.next(currency);
  }

  getListOfCurrencies(){
    return this.listOfCurrency;
  }
}
