import { Component } from '@angular/core';
import { animation } from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    animation
  ]
})
export class AppComponent {
  title = 'personalizer';
}
