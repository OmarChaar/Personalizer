import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonalizationComponent } from './pages/personalization/personalization.component';

const routes: Routes = [
  {
    path: 'personalization' ,component: PersonalizationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
