import { SetClient } from './../../state-management/client';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { SetAccount, ClearAccount } from 'src/app/state-management/account';
import { SessionStorageService } from '../sessionStorage/session-storage.service';
import { HttpClient } from '@angular/common/http';
import { ClearClient } from 'src/app/state-management/client';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  databaseURL = 'https://us-central1-personalizer-portal.cloudfunctions.net/api/';


  constructor(
    private store: Store,
    private router: Router,
    private sessionStorageService: SessionStorageService,
    private httpClient: HttpClient
  ) { }

  login(cpf: any, apt: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.httpClient.get(this.databaseURL+'getClient?id='+cpf+'&apartment='+apt).subscribe(async (res: any) => {

        if(res) {
          this.store.dispatch(new SetClient(res));
          this.sessionStorageService.set('clientCredentials', {id: cpf, apartment: apt});
          await this.getSection(res.clientOf);
          resolve(res);
        }
        else {
          resolve(false);
        }
      }, (err: any) => {
        resolve(false);
        console.error(err); // log the error to the console
        reject(err); // reject the promise with the error
      });
    });
  }

  getSection(id: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.httpClient.get(this.databaseURL+'getSections?id='+id).subscribe((res: any) => {
        this.store.dispatch(new SetAccount(res.sections));
        resolve(true);
      });
    })
  }

  save(client: any): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.httpClient.post(this.databaseURL+'saveClient', {
        client: client
      }).subscribe((res: any) => {
        if(res.success == true) {
          resolve(true);
        }
        else {
          resolve(false);
        }
      })
    })
  }

  logout() {
    this.store.dispatch(new ClearAccount());
    this.store.dispatch(new ClearClient());
    this.sessionStorageService.clearStorage();
    this.router.navigate(['login']);
  }

}
