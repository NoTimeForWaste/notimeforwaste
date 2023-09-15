import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'tela-inicial',
    pathMatch: 'full'
  },
  {
    path: 'tela-inicial',
    loadChildren: () => import('./pages/tela-inicial/tela-inicial.module').then( m => m.TelaInicialPageModule)
  },
  {
    path: 'empresa/home',
    loadChildren: () => import('./pages/empresa/home/home.module').then( m => m.HomePageModule)
  },
    {
    path: 'clente/login',
    loadChildren: () => import('./pages/cliente/login-cliente/login-cliente.module').then( m => m.LoginClientePageModule)
  },
  {
    path: 'empresa/pedidos',
    loadChildren: () => import('./pages/empresa/home/pedido/pedido.module').then( m => m.PedidoPageModule)
  },
  {
    path: 'empresa/login',
    loadChildren: () => import('./pages/empresa/login/login.module').then( m => m.LoginPageModule)
  },  {
    path: 'meus-dados',
    loadChildren: () => import('./pages/cliente/meus-dados/meus-dados.module').then( m => m.MeusDadosPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
