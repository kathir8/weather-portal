import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private API_BASE_PATH: string = 'https://api.openweathermap.org/data/2.5'
  private API_KEY: string = 'ea1bff305d2157da486a32f5fc7d3b42'

  constructor(private http: HttpClient) { }

  /* ------------------------------- GET REQUEST ------------------------------ */

  getCall(url: string) {
    return this.http
      .get(this.API_BASE_PATH + url + this.API_KEY)
      .pipe(retry(1), catchError(error => this.handleError(error)));
  }


  /* ------------------------------ ERROR HANDLER ----------------------------- */
  private handleError(error: HttpErrorResponse) {

    let errorMessage = {
      "status": false,
      "status_code": error.status,
      "message": error.error
    };

    return throwError(() => {
      return errorMessage;
    });
  }
}
