import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { NgxsModule } from '@ngxs/store';
import { AccountState } from './state-management/account';
import { ClientState } from './state-management/client';


const firebaseConfig = {
  apiKey: "AIzaSyCjgpOVFtCf1UiI6mPfnY075OD0zKreNLo",
  authDomain: "personalizer-portal.firebaseapp.com",
  projectId: "personalizer-portal",
  storageBucket: "personalizer-portal.appspot.com",
  messagingSenderId: "224907400372",
  appId: "1:224907400372:web:978ffebce36a3df80673e1",
  measurementId: "G-ZPXML1GV21"
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    NgxsModule.forRoot([AccountState, ClientState])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
