import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './common/guard/auth.guard';
import { publicGuard } from './common/guard/public.guard';

const routes: Routes = [
  {
    path: 'home',
    canActivate: [authGuard],
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    canActivate: [publicGuard],
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule),
  },
  {
    path: 'register',
    canActivate: [publicGuard],
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule),
  },
  {
    path: 'forgot-password',
    canActivate: [publicGuard],
    loadChildren: () => import('./forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule),
  },
  {
    path: 'categoria1',
    canActivate: [authGuard],
    loadChildren: () => import('./categoria1/categoria1.module').then(m => m.Categoria1PageModule),
  },
  {
    path: 'categoria2',
    canActivate: [authGuard],
    loadChildren: () => import('./categoria2/categoria2.module').then(m => m.Categoria2PageModule),
  },
  {
    path: 'categoria3',
    canActivate: [authGuard],
    loadChildren: () => import('./categoria3/categoria3.module').then(m => m.Categoria3PageModule),
  },
  {
    path: 'categoria4',
    canActivate: [authGuard],
    loadChildren: () => import('./categoria4/categoria4.module').then(m => m.Categoria4PageModule),
  },
  {
    path: 'profile',
    canActivate: [authGuard],
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  
  {
    path: '**',
    loadChildren: () => import('./error-carga/error-carga.module').then(m => m.ErrorCargaPageModule),
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
