import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';

import { User } from '../models/user.model';
import { Router } from '@angular/router';

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
    private http: HttpClient,
    private router: Router
  ) { }

  private _apiKey = 'AIzaSyCuWJvEJ6Q1d5N8h8S9XQsoo1WgdLiE6ww';

  user: User = null;
  userSubj = new BehaviorSubject<User>(null);

  signUp(email, password) {
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this._apiKey}`,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(this.handleError), tap(resData => {
      this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
    }));
  }

  logIn(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this._apiKey}`,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(this.handleError), tap(resData => {
      this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
    }));
  }

  logOut() {
    this.user = null;
    this.userSubj.next(this.user);
    this.router.navigate(['/auth']);
  }

  autoLogIn(): boolean {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) return false;

    const newUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

    if (newUser.token !== null) {
      this.user = newUser;
      this.userSubj.next(this.user);
      return true;
    }
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

  private handleAuthentication(email: string, id: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const newUser = new User(email, id, token, expirationDate);

    if (newUser !== null) {
      this.user = newUser;
      this.userSubj.next(this.user);
    }

    localStorage.setItem('userData', JSON.stringify(this.user));
  }

}
