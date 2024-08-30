import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Categoria4Page } from './categoria4.page';

const routes: Routes = [
  {
    path: '',
    component: Categoria4Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Categoria4PageRoutingModule {}
