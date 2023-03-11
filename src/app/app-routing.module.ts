import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountGuard } from './classes/AccountGuard';
import { LoginComponent } from './pages/login/login.component';
import { PersonalizationComponent } from './pages/personalization/personalization.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'personalization',
    loadChildren: () => import('../app/pages/personalization/personalization.module').then(m => m.PersonalizationModule),
    data: { animation: 'isPersonalization' },
    canActivate: [AccountGuard],
  },
  {
    path: 'login',
    loadChildren: () => import('../app/pages/login/login.module').then(m => m.LoginModule),
    data: { animation: 'isLogin' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
