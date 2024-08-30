import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Categoria4PageRoutingModule } from './categoria4-routing.module';

import { Categoria4Page } from './categoria4.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Categoria4PageRoutingModule
  ],
  declarations: [Categoria4Page]
})
export class Categoria4PageModule {}
