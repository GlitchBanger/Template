import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { PredictComponent } from './predict/predict.component';

const routes: Routes = [
  { path: '', redirectTo: 'fields', pathMatch: 'full' },
  { path: 'fields', component: FormComponent },
  { path: 'result', component: PredictComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
