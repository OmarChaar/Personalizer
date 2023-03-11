import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {

  loading = false;

  constructor() { }

  startLoader() {
    this.loading = true;
  }

  stopLoader() {
    this.loading = false;
  }

}
