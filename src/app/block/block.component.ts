import { Component, Input } from '@angular/core';
import { CurrencyService } from '../services/currency.service';
import { Currency, CurrencySetter } from '../models/CurrencyModels';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.css'],
})
export class BlockComponent {
  constructor(private currencyService: CurrencyService) {}

  @Input() currency: Currency = {} as Currency;
  @Input() onCurrencyChange: CurrencySetter = ()=>{};
  defaultCurrencies = this.currencyService.defaultCurrencies;

  handleValueChange($event: Event) {
    const enteredValue = +($event.target as HTMLInputElement).value;
    this.onCurrencyChange({
      value: enteredValue,
      currency: this.currency.currency,
    });
  }

  handleCurrencyStrChange(currencyStr: string) {
    if (currencyStr === this.currency.currency) return;
    this.onCurrencyChange({
      currency: currencyStr,
      value: this.currency.value,
    });
  }
}
