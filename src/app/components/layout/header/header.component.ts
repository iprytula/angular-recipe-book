import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { DataStorageService } from 'src/app/services/data-storage.service';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService,
    private router: Router
  ) { }

  private userSub: Subscription;
  isAuthenticated = false;
  private currentRoute: string = null;

  ngOnInit(): void {
    this.userSub = this.authService.userSubj.subscribe((user: User) => {
      this.isAuthenticated = user && user.token ? true : false;
    });
  }

  onSaveData() {
    this.dataStorageService.storeRecipes().subscribe();
    this.dataStorageService.storeShoppingList().subscribe();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
    this.dataStorageService.fetchShoppingList().subscribe(respond => {
      console.log(respond);
    });
  }

  onLogOut() {
    this.authService.logOut();
    this.router.navigate(['/auth']);
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
