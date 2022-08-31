import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {APICurrencyService} from "./services/api-currency.service";
import {CurrencyService} from "./services/currency.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, OnDestroy {

  public firstValue = 0;
  public secondValue = 1;
  public firstCurrency = 'UAH';
  public secondCurrency = 'USD';
  public listOfCurrency = this.currencyService.getListOfCurrencies();

  private s1!: Subscription;
  private s2!: Subscription;
  private s3!: Subscription;
  private s4!: Subscription;

  constructor(private APICurrency: APICurrencyService, public currencyService: CurrencyService) {
  }

  ngOnDestroy(): void {
    this.s1.unsubscribe();
    this.s2.unsubscribe();
    this.s3.unsubscribe();
    this.s4.unsubscribe();
  }

  ngOnInit(): void {
    this.APICurrency.fetchListOfCurrencies().subscribe((list: { rates: { [currency: string]: number } })=>{
      this.listOfCurrency = list.rates;
      this.handleSecondValueChange(this.secondValue);
    });

    this.s1 = this.currencyService.firstValueUpdatedSub.subscribe((newValue: number) => {
      this.firstValue = newValue;
    })
    this.s2 = this.currencyService.secondValueUpdatedSub.subscribe((newValue: number) => {
      this.secondValue = newValue;
    })
    this.s3 = this.currencyService.firstCurrencyUpdatedSub.subscribe((newCurrency: string) => {
      this.firstCurrency = newCurrency;
      this.handleFirstValueChange(this.firstValue);
    })
    this.s4 = this.currencyService.secondCurrencyUpdatedSub.subscribe((newCurrency: string) => {
      this.secondCurrency = newCurrency;
      this.handleSecondValueChange(this.secondValue);
    })

  }

  handleFirstValueChange = (value: number) => {
    const service = this.currencyService;
    const priceChange = value / this.listOfCurrency[this.firstCurrency];
    service.setSecondValue(priceChange * this.listOfCurrency[this.secondCurrency]);
    service.setFirstValue(value);
  }

  handleSecondValueChange = (value: number) => {
    const service = this.currencyService;
    console.log(this.listOfCurrency)
    const priceChange = value / this.listOfCurrency[this.secondCurrency];
    service.setFirstValue(priceChange * this.listOfCurrency[this.firstCurrency]);
    service.setSecondValue(value);
  }

  handleFirstCurrencyChange = (currency: string) => {
    this.currencyService.setFirstCurrency(currency);
  }

  handleSecondCurrencyChange = (currency: string) => {
    this.currencyService.setSecondCurrency(currency);
  }
}
