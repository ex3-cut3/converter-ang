import {Component, Input, OnInit} from '@angular/core';
import {CurrencyService} from "../services/currency.service";

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.css']
})
export class BlockComponent implements OnInit {
  constructor(private currencyService: CurrencyService) {
  }

  @Input() value = 0;
  @Input() currency = '';
  @Input() onChangeValue!: (value: number) => void;
  @Input() onCurrencyChange!: (newCurrency: string) => void;

  defaultCurrencies = this.currencyService.defaultCurrencies;

  ngOnInit(): void {
  }

  handleValueChange($event: Event) {
    this.onChangeValue(+($event.target as HTMLInputElement).value)
  }
}
