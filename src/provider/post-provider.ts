import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostProvider {
  server: string = 'http://127.0.0.1/api1/';

  constructor(private http: HttpClient) {}

  postData(body: any, file: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const options = {
      headers: headers
    };

    return this.http.post(this.server + file, JSON.stringify(body), options)
      .pipe(
        map((response: any) => {
          if (typeof response === 'string') {
            try {
              return JSON.parse(response);
            } catch (e) {
              throw new Error('Invalid JSON response from server');
            }
          }
          return response;
        }),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Terjadi kesalahan pada server';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    
    return throwError(() => new Error(errorMessage));
  }
}