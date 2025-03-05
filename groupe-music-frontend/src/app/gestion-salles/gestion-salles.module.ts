import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionSallesRoutingModule } from './gestion-salles-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {SalleServiceService} from './services/salle-service.service';


@NgModule({
  declarations: [],
  imports: [

    CommonModule,
    GestionSallesRoutingModule
  ],
  providers:[
  ]
})
export class GestionSallesModule { }
