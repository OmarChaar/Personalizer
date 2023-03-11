import { SessionStorageService } from './services/sessionStorage/session-storage.service';
import { Component } from '@angular/core';
import { animation } from './animations';
import { FirebaseService } from './services/firebase/firebase.service';
import { ConstantsService } from './services/constants/constants.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    animation
  ]
})
export class AppComponent {
  title = 'Personalizer Site';

  loading = true;

  constructor(
    private router: Router,
    private firebaseService: FirebaseService,
    private sessionStorageService: SessionStorageService,
    public constantsService: ConstantsService
  ) {}


  async ngOnInit() {
    const clientCredentials = this.sessionStorageService.get('clientCredentials') || undefined;
    if(clientCredentials) {
      await this.firebaseService.login(clientCredentials.id, clientCredentials.apartment);
      this.loading = false;
      this.router.navigate(['personalization']);
    }
    else {
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    }

  }
}
