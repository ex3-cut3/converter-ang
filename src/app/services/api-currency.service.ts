import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs";
import {CurrencyService} from "./currency.service";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class APICurrencyService {

  constructor(private http: HttpClient, private currencyService: CurrencyService) {
  }

  fetchListOfCurrencies() {
    return this.http.get<any>(environment.APICurrencyURL).pipe(tap((data: { rates: { [currency: string]: number } }) => {
      this.currencyService.setCurrencyList(data.rates ? data.rates : {});
      // console.log(this.currencyService.getListOfCurrencies())
    }));
  }
}
