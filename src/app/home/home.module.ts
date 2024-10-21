import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';
import { PokemonComponent } from '../pokemon/pokemon.component'; // Asegúrate de importar el componente

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, PokemonComponent] // Asegúrate de declarar aquí el componente PokemonComponent
})
export class HomePageModule {}
