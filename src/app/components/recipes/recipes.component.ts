import { Component, OnInit } from '@angular/core';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {
  constructor(
    private dataStorageService: DataStorageService
  ) { }

  showSpinner = false;
  subscribtion: Subscription;

  ngOnInit() {
    this.subscribtion = this.dataStorageService.inUseSubj.subscribe(isUsed => {
      this.showSpinner = isUsed;
    });
  }

}
