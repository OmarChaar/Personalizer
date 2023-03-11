import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { AccountState } from './state-management/account';
import { ClientState } from './state-management/client';
import { AccountGuard } from './classes/AccountGuard';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxsModule.forRoot([AccountState, ClientState])
  ],
  providers: [
    AccountGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
