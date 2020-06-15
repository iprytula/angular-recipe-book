import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export interface AuthResponseData {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  kind: string,
  registered?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  private apiKey = 'AIzaSyCuWJvEJ6Q1d5N8h8S9XQsoo1WgdLiE6ww'

  signUp(email, password) {
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(errorRes => catchError(this.handleError)))
  }

  logIn(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(this.handleError));
  }

  private handleError(errorRes: HttpErrorResponse) {
    {
      let errorMessage = 'An unknown error occured!';

      if (!errorRes.error || !errorRes.error.error) {
        return throwError(errorMessage);
      }

      errorMessage = errorRes.error.error.message;

      switch (errorRes.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage = 'This email already exists';
        case 'EMAIL_NOT_FOUND':
          errorMessage = 'There is no user with entered email';
        case 'INVALID_PASSWORD':
          errorMessage = 'This password is not correct';
      }

      return throwError(errorMessage);
    }
  }

}
