import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsoleComponent } from './console/console.component';
import { FormComponent } from './form/form.component';
import { PredictComponent } from './predict/predict.component';

const routes: Routes = [
  { path: '', redirectTo: 'console', pathMatch: 'full' },
  { path: 'console', component: ConsoleComponent },
  { path: 'fields', component: FormComponent },
  { path: 'result', component: PredictComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
