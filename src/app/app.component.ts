import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.authService.autoLogIn()) {
      if (this.location.path() === '/auth') {
        this.router.navigate(['/']);
      }
    }
  }

}
