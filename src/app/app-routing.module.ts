import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule)
  },
  {
    path: 'categoria1',
    loadChildren: () => import('./categoria1/categoria1.module').then(m => m.Categoria1PageModule)
  },
  {
    path: 'categoria2',
    loadChildren: () => import('./categoria2/categoria2.module').then(m => m.Categoria2PageModule)
  },
  {
    path: 'categoria3',
    loadChildren: () => import('./categoria3/categoria3.module').then(m => m.Categoria3PageModule)
  },
  {
    path: 'categoria4',
    loadChildren: () => import('./categoria4/categoria4.module').then(m => m.Categoria4PageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
