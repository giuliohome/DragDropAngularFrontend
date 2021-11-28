import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DropfileComponent } from './dropfile/dropfile.component';

const routes: Routes = [
  { path: 'dropfile', component: DropfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
