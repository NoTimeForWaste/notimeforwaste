import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  currentRoute: string = '';
  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.currentRoute = event.urlAfterRedirects;
        }
      });
  }

  shouldDisplayFooterCompany() {
    const routesToExclude = ['/tela-inicial', '/cliente', '/cliente/login',]; // Adicione todas as rotas de cliente aqui
    const currentRoute = this.router.url;
    return !routesToExclude.some(route => currentRoute.includes(route));
  }
  
  shouldDisplayFooterClient() {
    const routesToExclude = ['/tela-inicial', '/empresa/home', '/empresa/pedidos']; // Adicione todas as rotas da empresa aqui
    const currentRoute = this.router.url;
    return !routesToExclude.some(route => currentRoute.includes(route));
  }
  
}
