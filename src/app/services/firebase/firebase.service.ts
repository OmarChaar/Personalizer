import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { SetAccount, ClearAccount } from 'src/app/state-management/account';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  collectionUID = 'JPZUS5utIvb0C60W6vcr56mGQ272';

  constructor(
    private auth: AngularFireAuth,
    private store: Store,
    private router: Router,
    private afs: AngularFirestore,

  ) { }

  checkLogin() {
    this.auth.authState.subscribe((state: any) => {
      if(state) {
        this.setLogin(state.uid);
      }
    });
  }

  setLogin(uid: any) {
    const docRef = doc(getFirestore(), "accounts", uid);
    getDoc(docRef).then((docSnap) => {
      if (docSnap.exists()) {
        this.collectionUID = docSnap.data()['id'];
        this.store.dispatch(new SetAccount(docSnap.data()));
      } else {
        console.log("No such document!");
      }
    });
  }

  login(cpf: any, apt: any): Promise<boolean> {
    console.log("login", cpf, apt);
    return new Promise<boolean>((resolve, reject) => {
      this.afs.collection(`accounts/${this.collectionUID}/clients`, ref =>
        ref.where('cpf_cnpj', '==', cpf).where('apartment', '==', apt)
      )
      .get()
      .subscribe(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log(doc.id, ' => ', doc.data());
          resolve(true); // add return statement here
        });
      }, error => {
        reject(error);
      });
    });
  }

  logout() {
    this.auth.signOut().then(() => {
      this.store.dispatch(new ClearAccount());
      this.router.navigate(['login']);
    })
  }

  set(collectionName: string, data: any) {

    const obj = this.convertToObj(data);

    for(let key in obj) {
      console.log(key, obj[key]);
      this.afs.collection(`accounts/${this.collectionUID}/${collectionName}`).doc(key).set(obj[key])
        .then(() => {
          console.log('Document updated or added successfully');
        })
        .catch((error) => {
          console.error('Error updating or adding document:', error);
        });
    }
  }

  get(collectionName: string): Observable<any[]> {
    const collectionRef = this.afs.collection(`accounts/${this.collectionUID}/${collectionName}`);
    return collectionRef.valueChanges();
  }

  convertToObj(arr: []) {
    const obj = arr.reduce((acc: any, cur: any) => {
      acc[cur.id] = cur;
      return acc;
    }, {});

    return obj;
  }
}
