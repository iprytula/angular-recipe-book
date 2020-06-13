import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  onSubmit(f: NgForm) {
    if (!this.isLoginMode) {
      this.authService.signUp(f.value.email, f.value.password)
      .subscribe(respond => {
        console.log(respond);
      })
    }

    f.reset();
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

}
