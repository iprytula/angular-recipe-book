import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { AuthService, AuthResponseData } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  isLoginMode = true;
  isLoading = false;
  error: string = '';

  ngOnInit() {
  }

  onSubmit(f: NgForm) {
    if (!f.valid)
      return;

    this.isLoading = true;

    const { email, password } = f.value;
    let authObs: Observable<AuthResponseData>;

    if (this.isLoginMode) {
      authObs = this.authService.logIn(email, password);
    } else {
      authObs = this.authService.signUp(email, password);
    }

    authObs.subscribe(responseData => {
      this.isLoading = false;
      console.log(responseData);
    },
    errorMessage => {
      this.error = errorMessage;
      this.isLoading = false;
    })

    f.reset();
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

}
