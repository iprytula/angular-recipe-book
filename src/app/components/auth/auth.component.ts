import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';

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
    if (this.isLoginMode) {

    } else {
      this.authService.signUp(email, password)
      .subscribe(responseData => {
        console.log(responseData);

        this.isLoading = false;
      },
      errorMessage => {
        console.log(errorMessage);

        this.isLoading = false;
      })
    }

    f.reset();
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

}
