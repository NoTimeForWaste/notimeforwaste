import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'tela-inicial',
    pathMatch: 'full'
  },

  //Rotas ---> Gerais 
  {
    path: 'tela-inicial',
    loadChildren: () => import('./pages/tela-inicial/tela-inicial.module').then( m => m.TelaInicialPageModule)
  },


  //Rotas ---> Empresa
  {
    path: 'empresa/login',
    loadChildren: () => import('./pages/empresa/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'empresa/cadastro',
    loadChildren: () => import('./pages/empresa/cadastro/cadastro.module').then( m => m.CadastroPageModule)
  },
  {
    path: 'empresa/home',
    loadChildren: () => import('./pages/empresa/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'empresa/pedidos',
    loadChildren: () => import('./pages/empresa/pedido/pedido.module').then( m => m.PedidoPageModule)
  },
  {
    path: 'empresa/detalhes-pedido/:idPedido',
    loadChildren: () => import('./pages/empresa/pedido/detalhes-pedido/detalhes-pedido.module').then( m => m.DetalhesPedidoPageModule)
  },
  {
    path: 'empresa/pacotes',
    loadChildren: () => import('./pages/empresa/pacote/pacote.module').then( m => m.PacotePageModule)
  },
  {
    path: 'empresa/novo-pacote',
    loadChildren: () => import('./pages/empresa/pacote/novo-pacote/novo-pacote.module').then( m => m.NovoPacotePageModule)
  },
  {
    path: 'empresa/editar-pacote/:idPacote',
    loadChildren: () => import('./pages/empresa/pacote/novo-pacote/novo-pacote.module').then( m => m.NovoPacotePageModule)
  },
  {
    path: 'empresa/perfil',
    loadChildren: () => import('./pages/empresa/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'empresa/editar-perfil',
    loadChildren: () => import('./pages/empresa/perfil/editar-conta/editar-conta.module').then( m => m.EditarContaPageModule)
  },
  {
    path: 'empresa/editar-endereco',
    loadChildren: () => import('./pages/empresa/perfil/editar-endereco/editar-endereco.module').then( m => m.EditarEnderecoPageModule)
  },


//Rotas ---> Cliente

  {
    path: 'cliente/login',
    loadChildren: () => import('./pages/cliente/login-cliente/login-cliente.module').then( m => m.LoginClientePageModule)
  },
  {
    path: 'cliente/home',
    loadChildren: () => import('./pages/cliente/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'cliente/detalhes-pacote/:idPacote',
    loadChildren: () => import('./pages/cliente/home/detalhes-pacote/detalhes-pacote.module').then( m => m.DetalhesPacotePageModule)
  },
  {
    path: 'cliente/pedidos',
    loadChildren: () => import('./pages/cliente/pedido/pedido.module').then( m => m.PedidoPageModule)
  },
  {
    path: 'cliente/novo-pedido',
    loadChildren: () => import('./pages/cliente/pedido/novo-pedido/novo-pedido.module').then( m => m.NovoPedidoPageModule)
  },
  {
    path: 'cliente/detalhes-pedido/:idPedido',
    loadChildren: () => import('./pages/cliente/pedido/detalhes-pedido/detalhes-pedido.module').then( m => m.DetalhesPedidoPageModule)
  },
  {
    path: 'cliente/perfil',
    loadChildren: () => import('./pages/cliente/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'cliente/endereco',
    loadChildren: () => import('./pages/cliente/perfil/endereco/endereco.module').then( m => m.EnderecoPageModule)
  },
  {
    path: 'cliente/novo-endereco',
    loadChildren: () => import('./pages/cliente/perfil/endereco/novo-endereco/novo-endereco.module').then( m => m.NovoEnderecoPageModule)
  },
  {
    path: 'cliente/editar-endereco/:idEndereco',
    loadChildren: () => import('./pages/cliente/perfil/endereco/novo-endereco/novo-endereco.module').then( m => m.NovoEnderecoPageModule)
  },
  {
    path: 'cliente/meus-dados',
    loadChildren: () => import('./pages/cliente/meus-dados/meus-dados.module').then( m => m.MeusDadosPageModule)
  },
  {
    path: 'cliente/cadastro',
    loadChildren: () => import('./pages/cliente/cadastro-cliente/cadastro-cliente.module').then( m => m.CadastroClientePageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
