import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListSallesComponent} from './components/list-salles/list-salles.component';
import {EditSalleComponent} from './components/edit-salle/edit-salle.component';

const routes: Routes = [


  {path: ':id', component: EditSalleComponent},
  {path:'', component: ListSallesComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionSallesRoutingModule { }
