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
  },
  {
    path: 'empresa/cadastro',
    loadChildren: () => import('./pages/empresa/cadastro/cadastro.module').then( m => m.CadastroPageModule)
  },  {
    path: 'pacote',
    loadChildren: () => import('./pages/empresa/pacote/pacote.module').then( m => m.PacotePageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/empresa/perfil/perfil.module').then( m => m.PerfilPageModule)
  },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
