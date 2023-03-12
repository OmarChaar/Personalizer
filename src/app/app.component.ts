import { SessionStorageService } from './services/sessionStorage/session-storage.service';
import { Component, Renderer2 } from '@angular/core';
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
    public constantsService: ConstantsService,
    private renderer: Renderer2
  ) {}


  async ngOnInit() {

    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    console.log("isDarkMode", isDarkMode);
    const faviconPath = isDarkMode ? '/assets/favicon-dark.ico' : '/assets/favicon-light.ico';
    const favicon = this.renderer.createElement('link');
    favicon.setAttribute('rel', 'icon');
    favicon.setAttribute('type', 'image/x-icon');
    favicon.setAttribute('href', faviconPath);
    this.renderer.appendChild(document.head, favicon);


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
