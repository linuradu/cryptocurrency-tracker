import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
    // 'Access-Control-Allow-Origin': '*'
    // 'Access-Control-Allow-Headers': 'origin, x-requested-with, content-type, x-custom-header-here',
    // 'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE, PUT'
  })
};


@Injectable({
  providedIn: 'root'
})
export class CryptoCurrencyService {

  private cryptoCurrenciesPublicUrl = 'https://bittrex.com/api/v1.1/public';

  constructor(private http: HttpClient) {
  }

  getMarkets(): Observable<any> {
    return this.http.get<any[]>(this.cryptoCurrenciesPublicUrl + '/getmarkets', httpOptions)
      .pipe(
        catchError(this.handleError('', []))
      );
  }

  getMarketSummaries(): Observable<any> {
    return this.http.get<any[]>(this.cryptoCurrenciesPublicUrl + '/getmarketsummaries', httpOptions)
      .pipe(
        catchError(this.handleError('', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
