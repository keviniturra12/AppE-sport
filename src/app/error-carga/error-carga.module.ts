import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ErrorCargaPageRoutingModule } from './error-carga-routing.module';
import { ErrorCargaPage } from './error-carga.page';

import { MatCardModule } from '@angular/material/card'; // Importa MatCardModule
import { MatButtonModule } from '@angular/material/button'; // Importa MatButtonModule

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ErrorCargaPageRoutingModule,
    MatCardModule, // Agrega MatCardModule
    MatButtonModule, // Agrega MatButtonModule
  ],
  declarations: [ErrorCargaPage],
})
export class ErrorCargaPageModule {}
