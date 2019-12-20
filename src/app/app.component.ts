import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showFeature = 'recipes';

  onNavigate(feature: string) {
    this.showFeature = feature;
  }
}
