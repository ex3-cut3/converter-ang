import { Component, Input, OnInit } from '@angular/core';
import { CurrencyService } from '../services/currency.service';
import { Currency } from '../models/CurrencyModels';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.css'],
})
export class BlockComponent {
  constructor(private currencyService: CurrencyService) {}

  @Input() currency: Currency = {} as Currency;
  @Input() onCurrencyChange!: (newCurrency: Currency) => void;

  defaultCurrencies = this.currencyService.defaultCurrencies;

  handleValueChange($event: Event) {
    this.onCurrencyChange({
      value: +($event.target as HTMLInputElement).value,
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
