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
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    const options = {
      headers: headers
    };

    return this.http.post(this.server + file, body, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    let errorMessage = 'Terjadi kesalahan pada server';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else if (error.status === 200 && error.statusText === 'OK') {
      // This is the case where we get a 200 response but parsing failed
      errorMessage = 'Format response tidak sesuai';
    } else {
      // Server-side error
      errorMessage = `Terjadi kesalahan: ${error.message}`;
    }
    
    return throwError(() => new Error(errorMessage));
  }
}